var express = require('express');
var router = express.Router();

const StoreProducts = require('../model/store/StoreProducts.schema');

// get all
router.get('/products', async (req, res) => {
  try {
    const product = await StoreProducts.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// post
router.post('/products', async (req, res) => {
  const allProducts = await StoreProducts.find();
  const lastCode = allProducts[allProducts.length - 1];
  const newCode = lastCode.code + 1;

  const product = new StoreProducts({
    code: newCode,
    price: req.body.price,
    name: req.body.name,
    ostock: req.body.ostock,
    received: req.body.received,
    issued: req.body.issued,
    damage: req.body.damage,
    cstock: req.body.cstock,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get single
router.get('/products/:id', getProduct, (req, res) => {
  res.json(res.product);
});

//delete
router.delete('/products/:id', getProduct, async (req, res) => {
  try {
    await res.product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// patch
router.patch('/products/:id', getProduct, async (req, res) => {
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
  if (req.body.issued != null) {
    res.product.issued = req.body.issued;
  }
  if (req.body.damage != null) {
    res.product.damage = req.body.damage;
  }
  if (req.body.cstock != null) {
    res.product.cstock = req.body.cstock;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get id using middleware
async function getProduct(req, res, next) {
  let product;
  try {
    product = await StoreProducts.findById(req.params.id);
    if (product === null) {
      return res.status(404).json({ message: 'Can not find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

module.exports = router;
