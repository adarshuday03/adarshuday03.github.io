// Fetch simple HTML partials and inject into pages. Also marks the active nav link.
(function () {
  async function insert(selector, path) {
    try {
      const res = await fetch(path, {cache: 'no-store'});
      if (!res.ok) return;
      const html = await res.text();
      const el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    } catch (e) {
      // fail silently in static preview
      console.warn('partial load failed', path, e);
    }
  }

  function markActive() {
    const page = (window.location.pathname.split('/').pop() || 'index.html');
    const nav = document.querySelector('#site-header');
    if (!nav) return;
    const links = nav.querySelectorAll('a.nav-link');
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === page) {
        a.classList.add('font-semibold', 'text-slate-900');
        a.setAttribute('aria-current', 'page');
      } else {
        a.classList.remove('font-semibold', 'text-slate-900');
        a.removeAttribute('aria-current');
      }
    });
  }

  // Public init: inject header and footer then mark active link
  window.addEventListener('DOMContentLoaded', async function () {
    await insert('#site-header', '/assets/partials/header.html');
    await insert('#site-footer', '/assets/partials/footer.html');
    markActive();
  });
})();
