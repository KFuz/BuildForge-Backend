const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const buildSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  make: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  engine: {
    type: String,
    required: true,
    trim: true,
  },
  goal: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['To do', 'In progress', 'On-hold', 'Complete'],
    default: 'To do',
  },
  budget: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
}, { timestamps: true }); 



// model
const Build = mongoose.model("Build", buildSchema);

// export the model
module.exports = Build;