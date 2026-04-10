const result = JSON.parse(
    localStorage.getItem("diagnosisResult")
)

const card = document.getElementById("resultCard")

if(!result){

card.innerHTML = `
<div class="text-center text-gray-500">
No diagnosis result found
</div>
`

}else{

let color="green"

if(result.severity==="High"){
color="red"
}

if(result.severity==="Medium"){
color="orange"
}


/* ISSUE ANIMATION IMAGES */

let image=""

if(result.issue === "dent"){
image="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MXZ1YnVpMHU1bnpsOW0xMmk3eW5qY3A2ZmJxY3Qwbm5pb2N6Zmp2MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/zzRpqN1HqkAA5slp9T/giphy.gif"
}

else if(result.issue === "scratch"){
image="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGRqMGlxNHhra3M4bnpnMjE3M2d2aXVrZTNuczk4c21haGxvaW43NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LtnRr5sbwsqHdmoFSV/giphy.gif"
}

else if(result.issue === "broken_light"){
image="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa29pZnh3N3E1MDVpajQyZTBlZTdidHFqbXZuaXUzczhrdmxzcnNxeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dyjw1AUfocWcQIQOdx/giphy.gif"
}

else if(result.issue === "normal"){
image="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3VhZzBnOTRueXBrdmMzMDU1MnNhdjZ4aHJhZ3JzeTB3Z3hmaW44bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/69iv77x8e5NMA/giphy.gif"
}


/* CONFIDENCE VALUE */

let confidence = 0

if(result.confidence){
confidence = Math.round(result.confidence * 100)
}


/* ✅ NEW: FALLBACK VALUES (prevents undefined) */

let recommendation = result.recommendation || "No recommendation available"
let estimatedCost = result.estimated_cost || "Not available"


card.innerHTML = `

<div class="glass p-10 text-left w-full">

<h2 class="text-2xl font-bold mb-6 text-center">
Vehicle Diagnosis Report
</h2>


<div class="result-scroll max-h-[260px]">


<div class="flex justify-center mb-6">

<img 
src="${image}" 
class="w-40 rounded-lg shadow-md"
alt="diagnosis animation">

</div>



<div class="grid gap-4">

<div class="result-row">

<div class="result-title">
Detected Issue
</div>

<div class="result-value text-lg font-semibold">
${result.issue}
</div>

</div>



<div class="result-row">

<div class="result-title">
Severity Level
</div>

<div class="result-value">

<span class="px-3 py-1 rounded-full text-white text-sm"
style="background:${color}">
${result.severity}
</span>

</div>

</div>



<div class="result-row">

<div class="result-title">
Recommended Action
</div>

<div class="result-value">
${recommendation}
</div>

</div>


<!-- ✅ NEW: ESTIMATED COST -->

<div class="result-row">

<div class="result-title">
Estimated Cost
</div>

<div class="result-value">
${estimatedCost}
</div>

</div>



<div class="result-row">

<div class="result-title">
AI Confidence
</div>

<div class="mt-2">

<div class="w-full bg-gray-200 rounded-full h-3">

<div
style="width:${confidence}%"
class="bg-blue-600 h-3 rounded-full transition-all duration-500">
</div>

</div>

<div class="text-sm text-gray-500 mt-1">
${confidence}%
</div>

</div>

</div>


</div>


<div class="mt-6 text-center text-sm text-gray-500">
AI generated vehicle inspection report
</div>


</div>

</div>

`
}