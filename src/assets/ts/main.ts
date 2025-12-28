// main.ts
document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;

  // Универсальная проверка для главной страницы
  // Сработает для: "/", "/index.html", "/repo-name/", "/repo-name/index.html"
  if (path.endsWith('/') || path.endsWith('/index.html')) {
    const { initIndexPage } = await import('./pages/index');
    initIndexPage();
  }

  // Проверка для страницы "О нас"
  if (path.endsWith('/about.html') || path.endsWith('/about')) {
    // const { initAboutPage } = await import('./pages/about');
    // initAboutPage();
  }
});
