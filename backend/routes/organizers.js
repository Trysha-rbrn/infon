const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');

/**
 * GET /api/organizers
 * Returns all organizers. No auth required.
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, short_name, description, website, color, icon, logo_initials, created_at FROM organizers ORDER BY name ASC'
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('Get organizers error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/organizers/:id
 * Returns single organizer with their events. No auth required.
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const orgResult = await pool.query(
      'SELECT * FROM organizers WHERE id = $1',
      [id]
    );

    if (orgResult.rows.length === 0) {
      return res.status(404).json({ error: 'Organizer not found' });
    }

    const eventsResult = await pool.query(
      'SELECT id, title, date, end_date, type, tags FROM events WHERE organizer_id = $1 AND is_active = true ORDER BY date ASC',
      [id]
    );

    return res.json({
      ...orgResult.rows[0],
      events: eventsResult.rows,
    });
  } catch (err) {
    console.error('Get organizer error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/organizers
 * Auth required (admin only)
 */
router.post('/', authenticate, requireRole('admin'), async (req, res) => {
  const { name, shortName, description, website, color, icon, logoInitials } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO organizers (name, short_name, description, website, color, icon, logo_initials)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, shortName || null, description || null, website || null, color || null, icon || null, logoInitials || null]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create organizer error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/organizers/:id
 * Auth required (admin only)
 */
router.put('/:id', authenticate, requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { name, shortName, description, website, color, icon, logoInitials } = req.body;

  try {
    const result = await pool.query(
      `UPDATE organizers
       SET
         name = COALESCE($1, name),
         short_name = COALESCE($2, short_name),
         description = COALESCE($3, description),
         website = COALESCE($4, website),
         color = COALESCE($5, color),
         icon = COALESCE($6, icon),
         logo_initials = COALESCE($7, logo_initials)
       WHERE id = $8
       RETURNING *`,
      [name || null, shortName || null, description || null, website || null, color || null, icon || null, logoInitials || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Organizer not found' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Update organizer error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
