const API_URL = "https://api-inference.huggingface.co/models/microsoft/CodeGPT-small-py";
const API_TOKEN = "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";

async function askBot() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("botResponse");
  responseBox.textContent = "Thinking...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: input })
    });
    const data = await res.json();
    responseBox.textContent = data[0]?.generated_text || "No answer available.";
  } catch (error) {
    responseBox.textContent = "Error connecting to chatbot.";
  }
}


document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const codeId = btn.getAttribute('data-target');
      const codeElem = document.getElementById(codeId);
      let code = codeElem ? codeElem.textContent : "";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = "Copied!";
          setTimeout(() => btn.textContent = "Copy", 1200);
        });
      }
    });
  });
});
