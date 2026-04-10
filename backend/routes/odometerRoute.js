const express = require("express")
const axios = require("axios")
const router = express.Router()

router.post("/predict", async (req, res) => {

try{

const response = await axios.post(
"http://localhost:8000/odometer",
req.body
)

res.json(response.data)

}catch(err){
res.status(500).json({error:"Prediction failed"})
}

})

module.exports = router