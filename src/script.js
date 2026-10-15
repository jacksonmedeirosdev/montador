const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-navigation");
const navigationLinks = document.querySelectorAll(".nav-link");
const year = document.querySelector("#current-year");
const contactForm = document.querySelector("#contact-form");
const storedTheme = localStorage.getItem("jj-theme");

if (storedTheme === "light" || storedTheme === "dark") {
  root.dataset.theme = storedTheme;
} else {
  root.dataset.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function updateThemeLabel() {
  const isDark = root.dataset.theme === "dark";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Ativar tema claro" : "Ativar tema escuro",
  );
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("jj-theme", nextTheme);
  updateThemeLabel();
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  navigation.classList.toggle("is-open", !isOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    navigation.classList.remove("is-open");
    navigationLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const subject = `Solicitação de montagem - ${formData.get("nome")}`;
  const body = [
    `Nome: ${formData.get("nome")}`,
    `Telefone: ${formData.get("telefone")}`,
    `E-mail: ${formData.get("email")}`,
    "",
    "Detalhes do serviço:",
    formData.get("servico"),
  ].join("\n");

  window.location.href = `mailto:jackson.dgmedeiros@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

year.textContent = new Date().getFullYear();
updateThemeLabel();
