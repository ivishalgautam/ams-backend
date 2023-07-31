const { pool } = require("../config/db");

async function createDepart(req, res) {
  const { name, description, hospital_id } = req.body;
  try {
    const depart = await pool.query(
      `INSERT INTO departments (name, description, hospital_id) VALUES ($1, $2, $3) RETURNING *`,
      [name, description, hospital_id]
    );

    res.json(depart.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDepartById(req, res) {
  const departId = parseInt(req.params.departId);
  try {
    const depart = await pool.query(`DELETE FROM departments WHERE id = $1`, [
      departId,
    ]);
    if (depart.rowCount === 0)
      return res.status(404).json({ error: "Department not found!" });
    res.json({ message: "department deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDepartById(req, res) {
  const departId = parseInt(req.params.departId);
  const { ...data } = req.body;

  const updateColumns = Object.keys(data)
    .map((item, key) => `${item} = $${key + 1}`)
    .join(", ");
  const updateValues = Object.values(data).map((item) => item);

  try {
    const depart = await pool.query(
      `UPDATE departments SET ${updateColumns} WHERE id = $${
        updateValues.length + 1
      } RETURNING *`,
      [...updateValues, departId]
    );
    if (depart.rowCount === 0)
      return res.status(404).json({ error: "Department not found!" });
    res.json(depart.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDeparts(req, res) {
  try {
    const depart = await pool.query(`SELECT * FROM departments`);
    if (depart.rowCount === 0)
      return res.json({ message: "No departments found!" });
    res.json(depart.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDepartById(req, res) {
  const departId = parseInt(req.params.departId);
  try {
    const depart = await pool.query(`SELECT * FROM departments WHERE id = $1`, [
      departId,
    ]);
    if (depart.rowCount === 0)
      return res.status(404).json({ error: "Department not found!" });
    res.json(depart.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createDepart,
  deleteDepartById,
  updateDepartById,
  getDeparts,
  getDepartById,
};
