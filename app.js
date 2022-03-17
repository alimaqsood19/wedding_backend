const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Guest = require('./models/Guest');

const app = express();
const router = express.Router();

router.use(cors());
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Expose-Headers',
    'X-Total-Count, X-Intake-Count, X-Confirmation-Count, X-API-Version'
  );
  next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
  try {
    const guests = await Guest.query();
    res.json(guests);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const { body } = req;

  const guest = await Guest.query().insert(body);
  console.log('Success', guest);
  res.status(200).json(guest);
});

// The serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
app.use('/', router);

// Export your express server so you can import it in the lambda function.
module.exports = app;
