const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    numberOfSeats: {
      type: DataTypes.INTEGER,
    },
    bookedSeats: {
      type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.STRING,
    },
    time: {
        type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },{ timestamps: false });
  SequelizeSlugify.slugifyModel(Class, {
    source: ["name"],
  });
  return Class;
};