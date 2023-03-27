var express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../model/users/Users.schema');
const router = express.Router();

//get all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ err: 'No users found' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await Users.create({
      name: req.body.name,
      number: req.body.number,
      password: req.body.password,
      role: req.body.role,
    });
    res.status(200);
  } catch (error) {
    res
      .status(400)
      .json({ err: 'Number already  in use', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const user = await Users.findOne({
    number: req.body.number,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        number: req.body.number,
        name: user.name,
        id: user._id,
      },
      process.env.SECRET,
    );

    return res.status(200).json({
      token: token,
      name: user.name,
      id: user._id,
      role: user.role,
    });
  } else {
    return res.status(400).json({ error: 'Number or password incorrect' });
  }
});

router.get('/logout', () => {});
module.exports = router;
