const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

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
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;



