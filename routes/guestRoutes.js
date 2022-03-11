const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

router.get('/', async (req, res) => {
  const guests = await Guest.query();
  res.json(guests);
});

router.post('/', async (req, res) => {
  const { body } = req;

  const guest = await Guest.query().insert(body);
  res.status(200).json(guest);
});

module.exports = router;
