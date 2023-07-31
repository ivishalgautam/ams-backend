const router = require("express").Router();
const {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospitalById,
  deleteHospitalById,
} = require("../controller/hospital.controller");

// GET
router.get("/", getHospitals);
router.get("/:hospitalId", getHospitalById);

// POST
router.post("/", createHospital);

// PUT
router.put("/:hospitalId", updateHospitalById);

// DELETE
router.delete("/:hospitalId", deleteHospitalById);

module.exports = router;
