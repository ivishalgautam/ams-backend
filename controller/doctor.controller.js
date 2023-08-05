const { pool } = require("../config/db");

async function getDoctors(req, res) {
  try {
    const doctors = await pool.query(`SELECT * FROM doctors`);
    res.json(doctors.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDoctorById(req, res) {
  const doctorId = parseInt(req.params.doctorId);
  try {
    const doctor = await pool.query(`SELECT * FROM doctors WHERE id = $1`, [
      doctorId,
    ]);
    if (doctor.rowCount === 0)
      return res.status(404).json({ error: "Doctor not found!" });
    res.json(doctor.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDoctorById(req, res) {
  const doctorId = parseInt(req.params.doctorId);
  try {
    const doctor = await pool.query(`DELETE FROM doctors WHERE id = $1`, [
      doctorId,
    ]);
    if (doctor.rowCount === 0)
      return res.status(404).json({ error: "Doctor not found!" });
    res.json({ message: "doctor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDoctorById(req, res) {
  const doctorId = parseInt(req.params.doctorId);
  const { ...doctorData } = req.body;

  const updateColumns = Object.keys(doctorData)
    .map((column, key) => `${column} = $${key + 1}`)
    .join(", ");
  const updateValues = Object.values(doctorData);
  console.log(updateColumns);
  console.log(updateValues);
  try {
    const doctor = await pool.query(
      `UPDATE doctors SET ${updateColumns} WHERE id = $${
        updateValues.length + 1
      } RETURNING *`,
      [...updateValues, doctorId]
    );
    if (doctor.rowCount === 0)
      return res.status(404).json({ error: "Doctor not found!" });
    res.json(doctor.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createDoctor(req, res) {
  const {
    fullname,
    email,
    phone,
    username,
    password,
    qualification,
    institution,
    address,
    location,
    fees,
    about,
    schedule_days,
    department_id,
    hospital_id,
  } = req.body;
  // console.log(req.body);
  console.log(department_id, hospital_id);
  try {
    const doctor = await pool.query(
      `INSERT INTO doctors (fullname,email,phone,username,password,qualification,institution,address,location,fees,about,schedule_days,department_id,hospital_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [
        fullname,
        email,
        phone,
        username,
        password,
        qualification,
        institution,
        address,
        location,
        fees,
        about,
        schedule_days,
        parseInt(department_id),
        parseInt(hospital_id),
      ]
    );
    res.json(doctor.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getDoctors,
  getDoctorById,
  deleteDoctorById,
  updateDoctorById,
  createDoctor,
};
