const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const buildItemSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
//  type might not be needed 
//    type: {
//     type: String,
//     required: true,
//     trim: true,
//   },
    category: {
    type: String,
    enum: ['Body', 'Electrical', 'Mechanical', 'Suspension'],
    required:true,
  },
   status: {
    type: String,
    enum: ['Purchased', 'Not purchased'],
    default: 'Not purchased',
  },
  cost: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: false,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },

    build: {
    type: Schema.Types.ObjectId,
    ref: 'Build', 
    required: true,
  }
}, { timestamps: true }); 



// model
const BuildItem = mongoose.model("BuildItem", buildItemSchema);

// export the model
module.exports = BuildItem;