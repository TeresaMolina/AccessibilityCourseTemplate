const templates = [
  { title: "Quiz Timer", file: "templates/quiz-timer.html", desc: "A simple timing/support page for quizzes/exams (non-automated).", tags: ["Template"] },
  { title: "Birthday Widget Page", file: "templates/birthday.html", desc: "Fun morale booster page (HTML/CSS only).", tags: ["Template"] },
  { title: "Grades Calculator", file: "templates/grades-calculator.html", desc: "Calculator page (folder-based). Link points to its index if present.", tags: ["Tool"] },
  { title: "Graphing Calculator", file: "templates/point_grades-calculator.html", desc: "Graphing helper page (folder-based).", tags: ["Tool"] },
  { title: "Journals", file: "templates/journal.html", desc: "Reflection/journaling layouts (folder-based).", tags: ["Template"] },
  { title: "Question Box", file: "templates/question-box.html", desc: "A simple question box template for student reflection or feedback.", tags: ["Template"] },
  { title: "Study Room", file: "templates/study-room.html", desc: "A cozy study room template to create a focused learning environment.", tags: ["Template"] }
];

const widgets = [
  { title: "BuddyAI", file: "widgets/ai-buddy.html", desc: "BuddyAI help panel concept for student navigation and support.", tags: ["Home"] },
  { title: "FAQ", file: "widgets/faq.html", desc: "Homepage FAQ using accessible details/summary components.", tags: ["Home"] },
  { title: "Work-To-Do", file: "widgets/work-to-do.html", desc: "A simplified, student-friendly task overview widget.", tags: ["Home"] },
  { title: "Course Info", file: "widgets/course-info", desc: "Course info widget folder (link to index if present).", tags: ["Home"] },
];

// Helpers
function isFolderPath(p) {
  return !p.endsWith(".html");
}

function normalizeLink(p) {
  return isFolderPath(p) ? `${p.replace(/\/$/,"")}/index.html` : p;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  children.forEach(c => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return node;
}

function buildItemCard(item, kind, preview = false) {
  const link = normalizeLink(item.file);

  const openBtn = el("a", { class: "btn secondary", href: link, target: "_blank", rel: "noopener" }, ["Open"]);
  const mainBtn = el(
    "a",
    { class: "btn", href: link, target: "_blank", rel: "noopener" },
    [kind === "HTML Template" ? "View Template" : "Open Preview"]
  );

  const card = el("article", { class: "item" }, [
    el("h3", {}, [item.title]),
    el("p", {}, [item.desc]),
    el("div", { class: "meta" }, [
      el("span", { class: "pill" }, [kind]),
      ...(item.tags || []).map(t => el("span", { class: "pill" }, [t]))
    ]),
    el("div", { class: "actions" }, [openBtn, mainBtn])
  ]);

  if (preview) {
    card.appendChild(
      el("div", { class: "preview" }, [
        el("iframe", { src: link, title: `${item.title} preview`, loading: "lazy" })
      ])
    );
  }

  return card;
}

function render() {
  const templateList = document.getElementById("templateList");
  
  const widgetList = document.getElementById("widgetList");

  if (templateList) {
    templates.forEach(t => templateList.appendChild(buildItemCard(t, "HTML Template", false)));
  }

  if (widgetList) {
    widgets.forEach(w => widgetList.appendChild(buildItemCard(w, "Widget", true)));
  }
}

document.addEventListener("DOMContentLoaded", render);
