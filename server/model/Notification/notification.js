const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    onClick: {
      type: String,
      required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    read:{
        type: Boolean,
        required: false       
    }
  },
  {
    timestamps: true,
  }
);

const notification = mongoose.model(" notification", notificationSchema);
module.exports = notification;
