const { pool } = require("../config/db");

async function createSector(req, res) {
  const { name } = req.body;
  try {
    const sector = await pool.query(
      `INSERT INTO sectors (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.json(sector.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createMultipleSector(req, res) {
  const { data } = req.body;
  console.log(data);
  try {
    let rows = [];
    for (const record of data) {
      const sector = await pool.query(
        `INSERT INTO sectors (name) VALUES ($1) RETURNING *`,
        [record.name]
      );
      rows.push(sector.rows[0]);
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSectors(req, res) {
  try {
    const sectors = await pool.query(
      `SELECT DISTINCT ON (name) * FROM sectors ORDER BY name`
    );
    res.json(sectors.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSectorById(req, res) {
  const sectorId = parseInt(req.params.sectorId);
  try {
    const sector = await pool.query(`SELECT * FROM sectors WHERE id = $1`, [
      sectorId,
    ]);
    res.json(sector.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createSector,
  createMultipleSector,
  getSectors,
  getSectorById,
};
