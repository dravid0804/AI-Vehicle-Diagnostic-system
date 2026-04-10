const express = require("express")
const router = express.Router()

const multer = require("multer")
const axios = require("axios")
const FormData = require("form-data")
const fs = require("fs")

const Diagnosis = require("../models/diagnosisModel")

const upload = multer({ dest: "uploads/" })

router.post("/upload", upload.single("image"), async (req,res)=>{

try{

const formData = new FormData()

formData.append(
"file",
fs.createReadStream(req.file.path)
)

const aiResponse = await axios.post(
"http://localhost:8000/predict",
formData,
{
headers:formData.getHeaders()
}
)

const data = aiResponse.data

const diagnosis = new Diagnosis({

image:req.file.filename,
issue:data.issue,
severity:data.severity,
recommendation:data.recommendation

})

await diagnosis.save()

fs.unlinkSync(req.file.path)

res.json(data)

}catch(error){

console.error(error)

res.status(500).json({
error:"AI Prediction Failed"
})

}

})

module.exports = router