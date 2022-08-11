const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  // type:
  // String
  // Number
  // Date
  // Buffer
  // Boolean
  // Array
  //   Schema.Types.ObjectId
  //   Schema.Types.mixed
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 70,
      unique: true,
      required: [true, "Set title for task"],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    // owner: Schema.Types.ObjectId,
    // owner: { type: Schema.Types.ObjectId },
    // whatever: Schema.Types.mixed,
    // owners: [
    //   {
    //     name: String,
    //   },
    // ],
    // address: {
    //   city: String,
    //   street: String,
    // },
  },
  { versionKey: "__v", timestamps: true }
);

const Task = mongoose.model("task", taskSchema, "tasks");

module.exports = Task;
