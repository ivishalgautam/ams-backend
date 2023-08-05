const {
  createSector,
  createMultipleSector,
  getSectors,
  getSectorById,
} = require("../controller/sector.controller");

const router = require("express").Router();

// POST
router.post("/", createSector);
router.post("/insert-many", createMultipleSector);

// GET
router.get("/", getSectors);
router.get("/:sectorId", getSectorById);

module.exports = router;
