const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
} = require("../controller/doctor.controller");

const router = require("express").Router();

// POST
router.post("/", createDoctor);

// GET
router.get("/", getDoctors);
router.get("/:doctorId", getDoctorById);

// PUT
router.put("/:doctorId", updateDoctorById);

// DELETE
router.delete("/:doctorId", deleteDoctorById);

module.exports = router;
