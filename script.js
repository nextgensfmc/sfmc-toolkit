function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(div => div.style.display = 'none');
  document.getElementById(tab + 'Tab').style.display = 'block';
}
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}
function insertSnippet(value, targetId) {
  if (value) document.getElementById(targetId).value = value;
}
function run(type) {
  const code = document.getElementById(type + "Code").value;
  let output = "";
  let log = "";

  try {
    if (!code.trim()) throw new Error("Code is empty");

    if (type === "ampscript" && !code.includes("%%")) throw new Error("Missing %% in AMPscript.");
    if (type === "sql" && !code.toLowerCase().includes("select")) throw new Error("SQL must contain SELECT.");
    if (type === "json") {
      const parsed = JSON.parse(code);
      output = JSON.stringify(parsed, null, 2);
      log = "✅ Valid JSON";
    } else {
      output = "// Simulated Output for " + type + "\\n" + code;
      log = "✅ Executed Successfully";
    }
  } catch (e) {
    output = "// Error Output";
    log = "❌ " + e.message;
  }

  document.getElementById(type + "Out").innerText = output;
  document.getElementById(type + "Log").innerText = log;
}
