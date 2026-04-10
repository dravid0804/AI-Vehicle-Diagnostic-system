const form = document.getElementById("uploadForm")

form.addEventListener("submit", async (e)=>{

e.preventDefault()

const fileInput = document.getElementById("imageInput")

if(!fileInput.files.length){

alert("Please select an image")

return

}

const formData = new FormData()

formData.append("image",fileInput.files[0])

document.getElementById("loading").classList.remove("hidden")

try{

const res = await fetch(
"http://localhost:5000/api/diagnosis/upload",
{
method:"POST",
body:formData
}
)

if(!res.ok){
throw new Error("Server error")
}

const data = await res.json()

localStorage.setItem(
"diagnosisResult",
JSON.stringify(data)
)

window.location.href="result.html"

}catch(err){

alert("Prediction failed")

console.error(err)

}

})