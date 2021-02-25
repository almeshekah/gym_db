const express = require("express");
const controller = require("../controllers/gymController");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("gymId", async (req, res, next, gymId) => {
  const gymFound = await controller.fetchGym(gymId, next);
  if (gymFound) {
    req.gym = gymFound;
    next();
  } else {
    const error = new Error("Gym Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", controller.gymList);
router.post("/", upload.single("image") ,controller.gymCreate);
router.get("/:gymId", controller.gymDetail);
router.post(
    "/:gymId/class",
    upload.single("image"),
    controller.classCreate
  );
  
  module.exports = router;


module.exports = router;


