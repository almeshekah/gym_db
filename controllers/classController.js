const { Class  , Gym} = require("../db/models");

exports.fetchClass  = async (productId, next) => {
  try {
    const classFound = await Class.findByPk(classId);
    if (classFound) return classFound;
    else next({ message: "Class does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.classList = async (req, res, next) => {
  
  try {
    const classes = await Class.findAll();
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};



exports.classDetail = async (req, res, next) => {
  res.status(200).json(req.class);
};

exports.classUpdate = async (req, res, next) => {
  if(req.file){
    req.body.image=`http://${req.get("host")}/media/${req.file.filename}`;
  }
  await req.class.update(req.body);
  res.json(req.class);
};

exports.classDelete = async (req, res, next) => {
  await req.class.destroy();
  res.status(204).end();
};