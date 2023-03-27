var express = require('express');
var router = express.Router();

const GoatSupplier = require('../model/goat/Supplier.schema');

// get all
router.get('/', async (req, res) => {
  try {
    const supplier = await GoatSupplier.find();
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// post
router.post('/', async (req, res) => {
  const supplier = new GoatSupplier({
    ...req.body,
    paid: false,
    paidBy: '',
  });
  try {
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get single
router.get('/:id', getSuppplier, (req, res) => {
  res.json(res.supplier);
});

//delete
router.delete('/:id', getSuppplier, async (req, res) => {
  try {
    await res.supplier.deleteOne();
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// patch
router.patch('/:id', getSuppplier, async (req, res) => {
  if (req.body.name != null) {
    res.supplier.name = req.body.name;
  }
  if (req.body.kgs1 != null) {
    res.supplier.kgs1 = req.body.kgs1;
  }
  if (req.body.kgs2 != null) {
    res.supplier.kgs2 = req.body.kgs2;
  }
  if (req.body.kgs3 != null) {
    res.supplier.kgs3 = req.body.kgs3;
  }
  if (req.body.kgs4 != null) {
    res.supplier.kgs4 = req.body.kgs4;
  }
  if (req.body.kgs5 != null) {
    res.supplier.kgs5 = req.body.kgs5;
  }
  if (req.body.date != null) {
    res.supplier.date = req.body.date;
  }
  if (req.body.collectionDate != null) {
    res.supplier.collectionDate = req.body.collectionDate;
  }
  if (req.body.paid != null) {
    res.supplier.paid = req.body.paid;
  }
  if (req.body.paidBy != null) {
    res.supplier.paidBy = req.body.paidBy;
  }
  try {
    const updatedSupplier = await res.supplier.save();
    res.json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get id using middleware
async function getSuppplier(req, res, next) {
  let supplier;
  try {
    supplier = await GoatSupplier.findById(req.params.id);
    if (supplier === null) {
      return res.status(404).json({ message: 'Can not find Supplier' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.supplier = supplier;
  next();
}

module.exports = router;
