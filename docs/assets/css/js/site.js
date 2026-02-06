// Edit these lists when you add/remove files.
// Paths are relative to /docs (GitHub Pages root).

const templates = [
  { title: "Module Page", file: "templates/module-page.html", desc: "Reusable unit/lesson intro layout with clear sections and headings.", tags: ["Template"] },
  { title: "Quiz Timer", file: "templates/quiz-timer.html", desc: "A simple timing/support page for quizzes/exams (non-automated).", tags: ["Template"] },
  { title: "Birthday Widget Page", file: "templates/birthday.html", desc: "Fun morale booster page (HTML/CSS only).", tags: ["Template"] },
  { title: "Grades Calculator", file: "templates/grades-calculator", desc: "Calculator page (folder-based). Link points to its index if present.", tags: ["Template"] },
  { title: "Graphing Calculator", file: "templates/graphing-calculator", desc: "Graphing helper page (folder-based).", tags: ["Template"] },
  { title: "Journals", file: "templates/journals", desc: "Reflection/journaling layouts (folder-based).", tags: ["Template"] },
  { title: "Attendance Excel Generator", file: "templates/attendance-excel-generator", desc: "Utility template (folder-based).", tags: ["Template"] },
];

const widgets = [
  { title: "BuddyAI", file: "widgets/buddy-ai.html", desc: "BuddyAI help panel concept for student navigation and support.", tags: ["Widget Preview"] },
  { title: "FAQ", file: "widgets/faq.html", desc: "Homepage FAQ using accessible details/summary components.", tags: ["Widget Preview"] },
  { title: "Work-To-Do", file: "widgets/work-to-do.html", desc: "A simplified, student-friendly task overview widget.", tags: ["Widget Preview"] },
  { title: "Course Info", file: "widgets/course-info", desc: "Course info widget folder (link to index if present).", tags: ["Widget Preview"] },
];

// Helpers
function isFolderPath(p) {
  return !p.endsWith(".html");
}

function normalizeLink(p) {
  // If it's a folder, assume it has index.html
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

  const card = el("article", { class: "item" }, [
    el("h3", {}, [item.title]),
    el("p", {}, [item.desc]),
    el("div", { class: "meta" }, [
      el("span", { class: "pill" }, [kind]),
      ...(item.tags || []).map(t => el("span", { class: "pill" }, [t]))
    ]),
    el("div", { class: "actions" }, [
      el("a", { class: "btn secondary", href: link }, ["Open"]),
      // Templates can be copied by opening and using Source/Copy in the editor.
      kind === "HTML Template"
        ? el("a", { class: "btn", href: link }, ["View Template"])
        : el("a", { class: "btn", href: link }, ["Open Preview"])
    ])
  ]);

  if (preview) {
    card.appendChild(
      el("div", { class: "preview" }, [
        el("iframe", {
          src: link,
          title: `${item.title} preview`,
          loading: "lazy"
        })
      ])
    );
  }

  return card;
}

function render() {
  const templateList = document.getElementById("templateList");
  const widgetList = document.getElementById("widgetList");

  // Templates: list view only (no embedded preview)
  templates.forEach(t => templateList.appendChild(buildItemCard(t, "HTML Template", false)));

  // Widgets: show what it looks like (embedded preview)
  widgets.forEach(w => widgetList.appendChild(buildItemCard(w, "Widget Preview", true)));
}

document.addEventListener("DOMContentLoaded", render);
