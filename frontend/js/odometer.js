document.getElementById("odoForm")
.addEventListener("submit", async (e)=>{

e.preventDefault()

const brand = document.getElementById("brand").value
const km = document.getElementById("km").value

const res = await fetch("http://localhost:5000/api/odometer/predict",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({brand, km})
})

const data = await res.json()

localStorage.setItem("odoResult", JSON.stringify(data))

window.location.href = "odometerResult.html"

})