const mongoose = require ("mongoose") 
const projectSchema = mongoose.Schema ({
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

    requiredSkills  : {
        type : String,
        required :true ,
    },
    estimatedBudget : {
        type : Number,
        required :true ,
    },
    attashement : {
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
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
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
  date: {
    type: Date,
    default: Date.now,
  },

})
module.exports = Project = mongoose.model("project", projectSchema);

