const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

const diagnosisRoute = require("./routes/diagnosisRoute")

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/diagnosis", diagnosisRoute)

app.listen(5000,()=>{

console.log("Server running on port 5000")

})

const odometerRoute = require("./routes/odometerRoute")

app.use("/api/odometer", odometerRoute)