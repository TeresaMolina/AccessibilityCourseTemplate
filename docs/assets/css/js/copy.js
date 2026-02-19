async function copyFromCodeBlock(btnId, codeId) {
  const btn = document.getElementById(btnId);
  const codeEl = document.getElementById(codeId);

  btn.addEventListener("click", async () => {
    const text = codeEl.textContent;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy HTML"), 1200);
    } catch (e) {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy HTML"), 1200);
    }
  });
}