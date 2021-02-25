const express = require("express");
const controller = require("../controllers/classController");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("classId", async (req, res, next, classId) => {
  const classFound = await controller.fetchClass(classId, next);
  if (classFound) {
    req.class = classFound;
    next();
  } else {
    const error = new Error("class Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", controller.classList);

router.get("/:classId", controller.classDetail);
router.put("/:classId", upload.single("image") ,controller.classUpdate);
router.delete("/:classId", controller.classDelete);

module.exports = router;