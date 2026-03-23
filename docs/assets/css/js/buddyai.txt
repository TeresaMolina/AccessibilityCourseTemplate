function normalize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s\^\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(s) {
  const stop = new Set(["the","a","an","to","of","and","or","in","on","for","with","is","are","be","this","that","it","i","me","my","you","your","we","our"]);
  return normalize(s)
    .split(" ")
    .filter(w => w && !stop.has(w) && w.length > 1);
}

function scoreEntry(tokens, entry) {
  const hay = normalize([entry.title, entry.text, (entry.tags || []).join(" ")].join(" "));
  let score = 0;

  for (const t of tokens) {
    if (!t) continue;
    // exact token match
    if (hay.includes(t)) score += 3;

    // bonus for strong keywords
    if ((entry.tags || []).some(tag => normalize(tag).includes(t))) score += 2;
  }

  // small boost for shorter focused entries
  const len = (entry.text || "").length;
  if (len > 0 && len < 220) score += 1;

  return score;
}

function buildAnswer(matches, question) {
  if (matches.length === 0) {
    return {
      html: `
        <div class="tag">No match found</div>
        <p>I couldn’t find an exact answer in the course knowledge pack for:</p>
        <p><strong>${escapeHtml(question)}</strong></p>
        <p>Try one of these:</p>
        <ul>
          <li>Use a keyword like <strong>derivative</strong>, <strong>power rule</strong>, or <strong>formula</strong></li>
          <li>Ask “Where can I find…”</li>
          <li>Check the Unit <strong>Resources</strong> folder</li>
        </ul>
      `,
      sources: []
    };
  }

  const top = matches.slice(0, 2);
  const html = `
    <div class="tag">From instructor-approved course material</div>
    ${top.map(m => `
      <h3 style="margin:10px 0 6px 0;">${escapeHtml(m.title)}</h3>
      <p style="margin:0;">${escapeHtml(m.text)}</p>
    `).join("")}
  `;

  const sources = top.map(m => ({
    label: m.sourceLabel || m.title,
    url: m.sourceUrl || "#"
  }));

  return { html, sources };
}

function escapeHtml(str) {
  return (str || "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function renderSources(sources) {
  const wrap = document.getElementById("sourcesWrap");
  const ul = document.getElementById("sources");

  ul.innerHTML = "";
  if (!sources || sources.length === 0) {
    wrap.hidden = true;
    return;
  }

  for (const s of sources) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = s.url;
    a.textContent = s.label;
    a.target = "_blank";
    a.rel = "noopener";
    li.appendChild(a);
    ul.appendChild(li);
  }
  wrap.hidden = false;
}

function askBuddyAI() {
  const input = document.getElementById("question");
  const answerEl = document.getElementById("answer");
  const q = (input.value || "").trim();

  if (!q) {
    answerEl.textContent = "Type a question first.";
    renderSources([]);
    return;
  }

  const pack = window.BUDDYAI_PACK || [];
  const tokens = tokenize(q);

  const scored = pack
    .map(e => ({ ...e, _score: scoreEntry(tokens, e) }))
    .filter(e => e._score > 0)
    .sort((a, b) => b._score - a._score);

  const { html, sources } = buildAnswer(scored, q);
  answerEl.innerHTML = html;
  renderSources(sources);
}

function clearBuddyAI() {
  document.getElementById("question").value = "";
  document.getElementById("answer").textContent = "Ask a question to get started.";
  renderSources([]);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("askBtn").addEventListener("click", askBuddyAI);
  document.getElementById("clearBtn").addEventListener("click", clearBuddyAI);

  document.getElementById("question").addEventListener("keydown", (e) => {
    if (e.key === "Enter") askBuddyAI();
  });
});
