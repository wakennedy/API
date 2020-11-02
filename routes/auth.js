const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //validate data before we create user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check for uniqueness
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already Exists");

  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    //save
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    //catch error
    res.status(400).send(err);
  }
});

module.exports = router;
