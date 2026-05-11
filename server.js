const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const authRouter = require('./controllers/auth.routes');
const verifyToken = require('./middleware/verify-token');
const buildRouter = require("./controllers/build.routes");
const buildItemRouter = require('./controllers/build.item.routes');


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use('/build',buildRouter);
// Routes go here
app.use('/auth', authRouter);
// app.use('/build',verifyToken,buildRouter);
// app.use('/item',verifyToken,buildItemRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});
