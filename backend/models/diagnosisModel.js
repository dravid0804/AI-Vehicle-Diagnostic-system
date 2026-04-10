const mongoose = require("mongoose")

const diagnosisSchema = new mongoose.Schema({

image:{
type:String
},

issue:{
type:String
},

severity:{
type:String
},

description:{
type:String
},

confidence:{
type:Number
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Diagnosis", diagnosisSchema)