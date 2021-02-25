const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const gymRoutes = require("./routes/gym");
const classRoutes = require("./routes/class");
const db = require("./db/models");
// Passport Setup
app.use(express.json());
const path = require("path");
const passport = require("passport");
app.use(passport.initialize());
const { localStrategy } = require("./middleware/passport");
passport.use(localStrategy);

const userRoutes = require("./routes/users");
app.use(userRoutes);
app.use("/gym", gymRoutes);
app.use("/class", classRoutes);

app.use("/media"  , express.static(path.join(__dirname , "media")));





app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
});

app.use((req, res, next) => {
    next({
      status: 404,
      message: "Path Not Found",
    });
});
  
app.use((err, req, res, next) => {
    res
      .status(err.status ? err.status : 500)
      .json({ message: err.message ? err.message : "Internal Server Error " });
});
  
//db.sequelize.sync();
db.sequelize.sync({ alter: true });
//db.sequelize.sync({ force: true });

