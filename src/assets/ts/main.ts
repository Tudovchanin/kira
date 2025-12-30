document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;

  if (path.endsWith('/') || path.endsWith('/index.html')) {
    const { initIndexPage } = await import('./pages/index');
    initIndexPage();
  }

});
