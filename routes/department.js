const router = require("express").Router();

const {
  createDepart,
  deleteDepartById,
  updateDepartById,
  getDeparts,
  getDepartById,
} = require("../controller/department.controller");

// GET
router.get("/", getDeparts);
router.get("/:departId", getDepartById);

// POST
router.post("/", createDepart);

// DELETE
router.delete("/:departId", deleteDepartById);

// PUT
router.put("/:departId", updateDepartById);

module.exports = router;
