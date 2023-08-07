const { pool } = require("../config/db");

async function createHospital(req, res) {
  const {
    name,
    address,
    description,
    telephone,
    email,
    speciality,
    departments,
  } = req.body;
  console.log(departments);
  try {
    const hospital = await pool.query(
      `INSERT INTO hospitals (name, address, description, telephone, email, speciality, departments) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, address, description, telephone, email, speciality, departments]
    );
    res.json(hospital.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getHospitals(req, res) {
  try {
    const hospitals = await pool.query(`SELECT * FROM hospitals;`);
    res.json(hospitals.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getHospitalById(req, res) {
  const hospitalId = parseInt(req.params.hospitalId);
  try {
    const hospital = await pool.query(`SELECT * FROM hospitals WHERE id=$1;`, [
      hospitalId,
    ]);
    if (hospital.rowCount === 0)
      return res.status(404).json({ error: "Hospital not found!" });
    res.json(hospital.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateHospitalById(req, res) {
  const hospitalId = parseInt(req.params.hospitalId);
  const { ...data } = req.body;
  const updateColumns = Object.keys(data)
    .map((item, key) => `${item} = $${key + 1}`)
    .join(", ");
  const updateValues = Object.values(data).map((item) => item);
  // console.log(updateColumns, updateValues);
  try {
    const hospital = await pool.query(
      `UPDATE hospitals SET ${updateColumns}, updated_at=${
        updateValues.length + 1
      } WHERE id=$${updateValues.length + 2} RETURNING *;`,
      [...updateValues, new Date(), hospitalId]
    );
    if (hospital.rowCount === 0)
      return res.status(404).json({ error: "Hospital not found!" });
    res.json(hospital.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteHospitalById(req, res) {
  const hospitalId = parseInt(req.params.hospitalId);
  try {
    const hospital = await pool.query(`DELETE FROM hospitals WHERE id=$1;`, [
      hospitalId,
    ]);
    if (hospital.rowCount === 0)
      return res.status(404).json({ error: "Hospital not found!" });
    res.json({ message: "Hospital deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospitalById,
  deleteHospitalById,
};
