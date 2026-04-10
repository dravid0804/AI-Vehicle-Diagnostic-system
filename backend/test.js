const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:admin123@vehicle-diagnosis.5wczsjf.mongodb.net/?appName=vehicle-diagnosis")

.then(()=>console.log("Connected"))
.catch(err=>console.log(err))