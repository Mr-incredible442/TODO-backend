if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

//mongoose
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//import routes
const usersRouter = require('./routes/usersRoute');
const restaurantRouter = require('./routes/restaurantRoute');
const goatRouter = require('./routes/goatRoute');
const storeRouter = require('./routes/storeRoute');

// define routes
app.use('/api/users', usersRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/goat', goatRouter);
app.use('/api/store', storeRouter);

app.get('/', (req, res) => {
  res.sendFile('index');
});
