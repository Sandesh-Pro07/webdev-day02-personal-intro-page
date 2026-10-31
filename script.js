// 1. Typing effect in the Java code card
const typedEl = document.getElementById("typed");
const lines = [
  ['<span class="tok-c">// Sandesh Pal, Bareilly</span>'],
  ['<span class="tok-k">class</span> Sandesh {'],
  ['  String course  = <span class="tok-s">"B.Tech CSE"</span>;'],
  ['  String college = <span class="tok-s">"Invertis University"</span>;'],
  ['  String[] skills = { <span class="tok-s">"Java"</span>, <span class="tok-s">"HTML"</span>,'],
  ['                      <span class="tok-s">"CSS"</span>, <span class="tok-s">"JavaScript"</span> };'],
  ['  <span class="tok-k">boolean</span> openToInternships = <span class="tok-k">true</span>;'],
  ['}'],
];
const html = lines.map(l => l.join("")).join("\n");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeHTML(target, source, speed) {
  let i = 0;
  (function step() {
    // skip over whole tags so they are never shown half-typed
    if (source[i] === "<") i = source.indexOf(">", i) + 1;
    else i++;
    target.innerHTML = source.slice(0, i);
    if (i < source.length) setTimeout(step, speed);
  })();
}
if (typedEl) {
  if (reduceMotion) typedEl.innerHTML = html;
  else typeHTML(typedEl, html, 28);
}

// 2. Theme toggle (remembers choice when storage is available)
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
function setTheme(t) {
  root.setAttribute("data-theme", t);
  themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "dark");
themeBtn.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// 3. Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// 4. Highlight the nav link of the section in view
const links = [...nav.querySelectorAll("a")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main .section").forEach(s => observer.observe(s));

// 5. Copy email button
const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}
document.getElementById("copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("sandeshpal938@gmail.com");
    showToast("Email copied");
  } catch (e) {
    showToast("Copy failed, please select the email manually");
  }
});

// 6. Footer year
document.getElementById("year").textContent = new Date().getFullYear();