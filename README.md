# Accessibility Course Development (CD) Shell  
CSCI 4390 – Senior Project

## Project Overview
This project focuses on the design and development of an **accessible Brightspace Course Development (CD) shell** that improves navigation, reduces cognitive load, and supports students with disabilities or first-time LMS users.

Rather than replacing Brightspace’s built-in accessibility features, this project builds **reusable templates, widgets, and layouts** that work *within* Brightspace while also existing independently as documented, portable resources.

The project emphasizes:
- accessibility-aware front-end design
- usability and cognitive load reduction
- instructor-friendly reuse and customization
- alignment with WCAG and ADA standards

---

## Team
- **Teresa Molina** – Developer (HTML/CSS, widgets, layout implementation, GitHub management)  
- **Anne George** – Instructional Designer (accessibility research, content organization, pedagogical structure)

**Faculty Adviser:** Erik Enriquez

---

## Problem Statement
Brightspace provides accessibility-compliant tools and standards, but instructors and students often struggle with:
- cluttered course layouts
- inconsistent navigation
- overwhelming homepages
- limited guidance on how to design accessible, readable content

These issues disproportionately affect students with disabilities, neurodivergent learners, and students unfamiliar with LMS platforms.

---

## Proposed Solution
We propose the creation of an **Accessibility Course Development Shell** consisting of:
- a simplified Course Home layout
- reusable HTML content templates
- navigation-focused widgets
- external documentation and previews

The solution is designed to be:
- **discoverable** (external previews and documentation)
- **reusable** (copy/paste templates and widgets)
- **testable** (live Brightspace shell + usability evaluation)

---

## Final Deliverables

### 1. Accessible Course Home Layout
- A redesigned Brightspace Course Home
- Uses **6–8 official widgets** only
- Prioritizes clarity, task separation, and reduced visual overload
- Designed for first-time users and students with disabilities

---

### 2. HTML Content Page Templates
- **8–12 reusable HTML templates**, including:
  - course overview / syllabus page
  - weekly module layout
  - assignment instruction page
  - checklist or task breakdown page
  - low-cognitive-load overview page
- Templates are WCAG-aligned and designed for easy instructor reuse

---

### 3. Navigation & Utility Widgets
- Custom or configured widgets to support:
  - assignment and quiz navigation
  - task prioritization
  - quick access to tools (e.g., Respondus LockDown Browser)
- Optional embedded utilities (e.g., timers for exams/quizzes where appropriate)

---

### 4. External Preview & Documentation Site
- Built using **Google Sites**
- Used to:
  - preview widgets and layouts before LMS deployment
  - document use-cases and accessibility decisions
  - gather instructor/student feedback via surveys

🔗 Preview Site:  
- https://sites.google.com/view/accessibilitycoursetemplate/home
---

### 5. GitHub Repository
This repository contains:
- HTML/CSS template code
- widget-related assets
- embedded snippets
- documentation and usage instructions
- version history for troubleshooting and iteration

A deployed version of the repository may be used to support easy copy/paste integration.

---

### 6. Evaluation & Demonstration
- A **production Brightspace shell** has been created with administrative approval
- Used for:
  - midterm live demo
  - final presentation
- Evaluation includes:
  - accessibility alignment checks
  - navigation clarity analysis
  - qualitative usability observations

---

## Technologies Used
- HTML5 / CSS3
- Brightspace LMS
- Google Sites
- GitHub
- Visual Studio Code

---

## Project Scope Notes
- Brightspace homepage widgets cannot be selectively added to existing layouts; new widgets require a new homepage layout. This constraint is accounted for in the design.
- Development is performed within student role limitations, with administrative support provided by COLTT.

## License / Usage
This project is intended for educational use and instructional design support within LMS environments. Templates and code may be reused with attribution.
