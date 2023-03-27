const express = require('express');
const router = express.Router();

const RestaurantProducts = require('../model/restaurant/RestaurantProducts.Schema');
const RestaurantCredit = require('../model/restaurant/RestaurantCredit.Schema');
const RestaurantBus = require('../model/restaurant/RestaurantBus.Schema');
const RestaurantTopup = require('../model/restaurant/RestaurantTopup.Schema');
const RestaurantReceived = require('../model/restaurant/RestaurantReceived.Schema');

//Get all
router.get('/products/', async (req, res) => {
  try {
    const product = await RestaurantProducts.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//post
router.post('/products/', async (req, res) => {
  const allProducts = await RestaurantProducts.find();
  const lastCode = allProducts[allProducts.length - 1];
  const newCode = lastCode.code + 1;

  const product = new RestaurantProducts({
    code: newCode,
    price: req.body.price,
    name: req.body.name,
    ostock: req.body.ostock,
    received: req.body.received,
    damage: req.body.damage,
    cstock: req.body.cstock,
    section: req.body.section,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get single
router.get('/products/:id', getproduct, (req, res) => {
  res.json(res.product);
});

//delete
router.delete('/products/:id', getproduct, async (req, res) => {
  try {
    await res.product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// patch
router.patch('/products/:id', getproduct, async (req, res) => {
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.ostock != null) {
    res.product.ostock = req.body.ostock;
  }
  if (req.body.received != null) {
    res.product.received = req.body.received;
  }
  if (req.body.damage != null) {
    res.product.damage = req.body.damage;
  }
  if (req.body.cstock != null) {
    res.product.cstock = req.body.cstock;
  }
  if (req.body.section != null) {
    res.product.section = req.body.section;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get id using middleware
async function getproduct(req, res, next) {
  let product;
  try {
    product = await RestaurantProducts.findById(req.params.id);
    if (product === null) {
      return res.status(404).json({ message: 'Can not find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

///////////////////////////////////////////// Products routes end ///////////////////////////////

///////////////////////////////////////////// Credit routes ///////////////////////////////

//Get all
router.get('/credit/', async (req, res) => {
  try {
    const credit = await RestaurantCredit.find();
    res.json(credit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//post
router.post('/credit/', async (req, res) => {
  const credit = new RestaurantCredit({
    description: req.body.description,
    amount: req.body.amount,
  });
  try {
    const newCredit = await credit.save();
    res.status(201).json(newCredit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get single
router.get('/credit/:id', getCredit, (req, res) => {
  res.json(res.credit);
});

//delete
router.delete('/credit/:id', getCredit, async (req, res) => {
  try {
    await res.credit.deleteOne();
    res.json({ message: 'Credit deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// patch
router.patch('/credit/:id', getCredit, async (req, res) => {
  if (req.body.description != null) {
    res.credit.description = req.body.description;
  }

  if (req.body.amount != null) {
    res.credit.amount = req.body.amount;
  }

  try {
    const updatedCredit = await res.credit.save();
    res.json(updatedCredit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get id using middleware
async function getCredit(req, res, next) {
  let credit;
  try {
    credit = await RestaurantCredit.findById(req.params.id);
    if (credit === null) {
      return res.status(404).json({ message: 'Can not find credit' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.credit = credit;
  next();
}

///////////////////////////////////////////// Credit routes end ///////////////////////////////

///////////////////////////////////////////// Bus routes  ///////////////////////////////

//Get all
router.get('/bus/', async (req, res) => {
  try {
    const bus = await RestaurantBus.find();
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//post
router.post('/bus/', async (req, res) => {
  const bus = new RestaurantBus({
    busName: req.body.busName,
    name: req.body.name,
    status: req.body.status,
    amount: req.body.amount,
  });
  try {
    const newBus = await bus.save();
    res.status(201).json(newBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get single
router.get('/bus/:id', getBus, (req, res) => {
  res.json(res.bus);
});

//delete
router.delete('/bus/:id', getBus, async (req, res) => {
  try {
    await res.bus.deleteOne();
    res.json({ message: 'Bus deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// patch
router.patch('/bus/:id', getBus, async (req, res) => {
  if (req.body.busName != null) {
    res.bus.busName = req.body.busName;
  }

  if (req.body.name != null) {
    res.bus.name = req.body.name;
  }

  if (req.body.collected != null) {
    res.bus.collected = req.body.collected;
  }

  if (req.body.notCollected != null) {
    res.bus.notCollected = req.body.notCollected;
  }

  if (req.body.amount != null) {
    res.bus.amount = req.body.amount;
  }

  try {
    const updatedBus = await res.bus.save();
    res.json(updatedBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get id using middleware
async function getBus(req, res, next) {
  let bus;
  try {
    bus = await RestaurantBus.findById(req.params.id);
    if (bus === null) {
      return res.status(404).json({ message: 'Can not find bus' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.bus = bus;
  next();
}

///////////////////////////////////////////// Bus routes end ///////////////////////////////

///////////////////////////////////////////// Topup routes  ///////////////////////////////

//Get all
router.get('/topup/', async (req, res) => {
  try {
    const topup = await RestaurantTopup.find();
    res.json(topup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//post
router.post('/topup/', async (req, res) => {
  const topup = new RestaurantTopup({
    busName: req.body.busName,
    name: req.body.name,
    amount: req.body.amount,
  });
  try {
    const newTopup = await topup.save();
    res.status(201).json(newTopup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get single
router.get('/topup/:id', getTopup, (req, res) => {
  res.json(res.topup);
});

//delete
router.delete('/topup/:id', getTopup, async (req, res) => {
  try {
    await res.topup.deleteOne();
    res.json({ message: 'Topup deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// patch
router.patch('/topup/:id', getTopup, async (req, res) => {
  if (req.body.busName != null) {
    res.topup.busName = req.body.busName;
  }

  if (req.body.name != null) {
    res.topup.name = req.body.name;
  }

  if (req.body.amount != null) {
    res.topup.amount = req.body.amount;
  }

  try {
    const updatedTopup = await res.topup.save();
    res.json(updatedTopup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get id using middleware
async function getTopup(req, res, next) {
  let topup;
  try {
    topup = await RestaurantTopup.findById(req.params.id);
    if (topup === null) {
      return res.status(404).json({ message: 'Can not find topup' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.topup = topup;
  next();
}

///////////////////////////////////////////// Topup routes end ///////////////////////////////
///////////////////////////////////////////// Received routes ///////////////////////////////

//Get all
router.get('/received/', async (req, res) => {
  try {
    const received = await RestaurantReceived.find();
    res.json(received);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//post
router.post('/received/', async (req, res) => {
  const received = new RestaurantReceived({
    productId: req.body.productId,
    code: req.body.code,
    name: req.body.name,
    quantity: req.body.quantity,
  });
  try {
    const newReceived = await received.save();
    res.status(201).json(newReceived);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get single
router.get('/received/:id', getReceived, (req, res) => {
  res.json(res.received);
});

//delete
router.delete('/received/:id', getReceived, async (req, res) => {
  try {
    await res.received.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// patch
router.patch('/received/:id', getReceived, async (req, res) => {
  if (req.body.productId != null) {
    res.received.productId = req.body.productId;
  }

  if (req.body.code != null) {
    res.received.code = req.body.code;
  }

  if (req.body.name != null) {
    res.received.name = req.body.name;
  }

  if (req.body.quantity != null) {
    res.received.quantity = req.body.quantity;
  }

  try {
    const updatedReceived = await res.received.save();
    res.json(updatedReceived);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get id using middleware
async function getReceived(req, res, next) {
  let received;
  try {
    received = await RestaurantReceived.findById(req.params.id);
    if (received === null) {
      return res.status(404).json({ message: 'Can not find Product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.received = received;
  next();
}

///////////////////////////////////////////// Recived routes end ///////////////////////////////

module.exports = router;
