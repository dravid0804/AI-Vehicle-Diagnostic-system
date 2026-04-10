let data = [];

// Load Excel
fetch("data.xlsx")
  .then(res => res.arrayBuffer())
  .then(buffer => {
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(sheet);
  });

// Clean text
function clean(t) {
  return t.toLowerCase().replace(/[^\w\s]/g, "");
}

// Better similarity
function similarity(a, b) {
  let A = clean(a).split(" ");
  let B = clean(b).split(" ");

  let match = A.filter(w => B.includes(w));
  return match.length / Math.max(A.length, B.length);
}

// Get answer
function getAnswer(input) {
  let best = 0;
  let ans = "I don't know. Try asking differently.";

  data.forEach(row => {
    let score = similarity(input, row.question);
    if (score > best) {
      best = score;
      ans = row.answer;
    }
  });

  return ans;
}

// Send message
function send() {
  const input = document.getElementById("input");
  const text = input.value;
  if (!text) return;

  addMsg(text, "user");
  input.value = "";

  setTimeout(() => {
    addMsg(getAnswer(text), "bot");
  }, 300);
}

// Quick suggestions click → auto respond
function quickAsk(btn) {
  const text = btn.innerText;

  addMsg(text, "user");

  setTimeout(() => {
    addMsg(getAnswer(text), "bot");
  }, 300);
}

// Add message
function addMsg(text, type) {
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;

  document.getElementById("messages").appendChild(div);
  div.scrollIntoView();
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
}