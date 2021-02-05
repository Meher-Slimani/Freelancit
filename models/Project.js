const mongoose = require ("mongoose") 
const projectSchema = mongoose.Schema ({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    title :{
        type : String,
        required :true ,
    }, 
    description :{
        type : String,
        required :true ,
    },  
    avatar: {
    type: String,
    },
    firstName: {
        type: String,
      },
    lastName: {
        type: String,
      },
    requiredSkills  : {
        type : String,
        required :true ,
    },
    estimatedBudget : {
        type : Number,
        required :true ,
    },
    attachment : {
        type : String,
    },
    publishedAt :{
        type : Date,
        default: Date.now ,
    },
    status :{
        type : String,
        required :true ,
    },
    comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})
module.exports = Project = mongoose.model("project", projectSchema);

