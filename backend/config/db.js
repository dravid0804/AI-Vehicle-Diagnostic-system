const mongoose = require("mongoose")

const connectDB = async () => {

try{

await mongoose.connect("mongodb://dravid:dravid@ac-beuvxpt-shard-00-00.qroy9dd.mongodb.net:27017,ac-beuvxpt-shard-00-01.qroy9dd.mongodb.net:27017,ac-beuvxpt-shard-00-02.qroy9dd.mongodb.net:27017/?ssl=true&replicaSet=atlas-pzq8sa-shard-0&authSource=admin&appName=vehicle-diagnosis")

console.log("MongoDB Connected")

}catch(error){

console.error(error)
process.exit(1)

}

}

module.exports = connectDB