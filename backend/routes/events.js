const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');

/**
 * GET /api/events
 * Query params: organizerId, type, dateFrom, dateTo
 * No auth required.
 */
router.get('/', async (req, res) => {
  const { organizerId, type, dateFrom, dateTo } = req.query;

  let query = `
    SELECT
      e.id,
      e.title,
      e.description,
      e.date,
      e.end_date,
      e.location,
      e.type,
      e.tags,
      e.is_active,
      e.created_at,
      e.created_by,
      o.id AS organizer_id,
      o.name AS organizer_name,
      o.short_name AS organizer_short_name,
      o.color AS organizer_color,
      o.icon AS organizer_icon,
      o.logo_initials AS organizer_logo_initials
    FROM events e
    LEFT JOIN organizers o ON e.organizer_id = o.id
    WHERE e.is_active = true
  `;

  const params = [];
  let paramIndex = 1;

  if (organizerId) {
    query += ` AND e.organizer_id = $${paramIndex++}`;
    params.push(parseInt(organizerId));
  }

  if (type) {
    query += ` AND e.type = $${paramIndex++}`;
    params.push(type);
  }

  if (dateFrom) {
    query += ` AND e.date >= $${paramIndex++}`;
    params.push(new Date(dateFrom));
  }

  if (dateTo) {
    query += ` AND e.date <= $${paramIndex++}`;
    params.push(new Date(dateTo));
  }

  query += ' ORDER BY e.date ASC';

  try {
    const result = await pool.query(query, params);

    const events = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      date: row.date,
      endDate: row.end_date,
      location: row.location,
      type: row.type,
      tags: row.tags || [],
      isActive: row.is_active,
      createdAt: row.created_at,
      createdBy: row.created_by,
      organizer: row.organizer_id
        ? {
            id: row.organizer_id,
            name: row.organizer_name,
            shortName: row.organizer_short_name,
            color: row.organizer_color,
            icon: row.organizer_icon,
            logoInitials: row.organizer_logo_initials,
          }
        : null,
    }));

    return res.json(events);
  } catch (err) {
    console.error('Get events error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/events/:id
 * No auth required.
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT
        e.id, e.title, e.description, e.date, e.end_date, e.location,
        e.type, e.tags, e.is_active, e.created_at, e.created_by,
        o.id AS organizer_id, o.name AS organizer_name,
        o.short_name AS organizer_short_name, o.color AS organizer_color,
        o.icon AS organizer_icon, o.logo_initials AS organizer_logo_initials,
        o.description AS organizer_description, o.website AS organizer_website
      FROM events e
      LEFT JOIN organizers o ON e.organizer_id = o.id
      WHERE e.id = $1 AND e.is_active = true`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const row = result.rows[0];
    const event = {
      id: row.id,
      title: row.title,
      description: row.description,
      date: row.date,
      endDate: row.end_date,
      location: row.location,
      type: row.type,
      tags: row.tags || [],
      isActive: row.is_active,
      createdAt: row.created_at,
      createdBy: row.created_by,
      organizer: row.organizer_id
        ? {
            id: row.organizer_id,
            name: row.organizer_name,
            shortName: row.organizer_short_name,
            color: row.organizer_color,
            icon: row.organizer_icon,
            logoInitials: row.organizer_logo_initials,
            description: row.organizer_description,
            website: row.organizer_website,
          }
        : null,
    };

    return res.json(event);
  } catch (err) {
    console.error('Get event error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/events
 * Auth required (admin or profesor)
 */
router.post('/', authenticate, requireRole('admin', 'profesor'), async (req, res) => {
  const { title, description, date, endDate, location, organizerId, type, tags } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, date, end_date, location, organizer_id, type, tags, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        title,
        description || null,
        new Date(date),
        endDate ? new Date(endDate) : null,
        location || null,
        organizerId ? parseInt(organizerId) : null,
        type || null,
        tags || null,
        req.user.id,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create event error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/events/:id
 * Auth required (admin only, or profesor who created it)
 */
router.put('/:id', authenticate, requireRole('admin', 'profesor'), async (req, res) => {
  const { id } = req.params;
  const { title, description, date, endDate, location, organizerId, type, tags } = req.body;

  try {
    // Check event exists
    const existing = await pool.query('SELECT * FROM events WHERE id = $1 AND is_active = true', [id]);

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = existing.rows[0];

    // Profesor can only edit their own events
    if (req.user.role === 'profesor' && event.created_by !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: You can only edit your own events' });
    }

    const result = await pool.query(
      `UPDATE events
       SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         date = COALESCE($3, date),
         end_date = COALESCE($4, end_date),
         location = COALESCE($5, location),
         organizer_id = COALESCE($6, organizer_id),
         type = COALESCE($7, type),
         tags = COALESCE($8, tags)
       WHERE id = $9
       RETURNING *`,
      [
        title || null,
        description || null,
        date ? new Date(date) : null,
        endDate ? new Date(endDate) : null,
        location || null,
        organizerId ? parseInt(organizerId) : null,
        type || null,
        tags || null,
        id,
      ]
    );

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Update event error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/events/:id
 * Auth required (admin only) — soft delete
 */
router.delete('/:id', authenticate, requireRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE events SET is_active = false WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.json({ message: 'Event deleted successfully', id: result.rows[0].id });
  } catch (err) {
    console.error('Delete event error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
