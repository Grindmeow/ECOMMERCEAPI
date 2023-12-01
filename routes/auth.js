const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
//Register

router.post("/register", async (req, res) => {

  try {
    const hash = bcrypt.hashSync(req.body.password, 12);


    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }

});

// LOGIN

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const isPass = bcrypt.compareSync(password, user.password);
      const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
      },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );


      if (isPass) return res.status(201).json({
        username,
        email: user.email,
        isAdmin: user.isAdmin,

      });
      return res.status(401).json('invalid credential');
    } else {
      return res.status(401).json('invalid credential');
    }
  } catch (err) {
    res.status(500).json(err);
  }


});


module.exports = router;



