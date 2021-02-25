const { Gym,Class  } = require("../db/models");

exports.fetchGym  = async (gymId, next) => {
  try {
    const gymFound = await Gym.findByPk(gymId);
    if (gymFound) return gymFound;
    else next({ message: "Gym does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.gymList = async (req, res, next) => {
  try {
    const gyms = await Gym.findAll({
      attributes: req.body,
      include: {
        model: Class,
        as: "classes",
        attributes: ["id"],
      },
      });
    res.status(200).json(gyms);
  } catch (error) {
    next(error);
  }
};

exports.gymCreate = async (req, res, next) => {
  try {
    const foundGym = await Gym.findOne();
    if (foundGym) {
      const err = new Error("You already have a gym");
      err.status = 400;
      next(err);
    }
    
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newGym = await Gym.create(req.body);
    res.status(201).json(newGym);
  } catch (error) {
    next(error);
  }
};

exports.gymDetail = async (req, res, next) => {
  res.status(200).json(req.gym);
};

exports.classCreate = async (req, res, next) => {
  
  try {
    
    req.body.gymId = req.gym.id;
    
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      
    }
    
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
};