// main.ts — один entry
document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;

  if (path === '/' || path === '/index.html') {
    const { initIndexPage } = await import('./pages/index');
    initIndexPage();
  }

  if (path === '/about.html') {
   
  }
});
