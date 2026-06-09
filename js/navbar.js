document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('navbar-placeholder');
  if (!container) return;

  const currentPath = window.location.pathname;
  const isInPagesFolder = currentPath.includes('/pages/');

  const pagePrefix = isInPagesFolder ? '' : 'pages/';
  const homePath = isInPagesFolder ? '../index.html' : './index.html';

  // 1. Inject the Mobile Banner and the Nav
  container.innerHTML = `
    <div class="mobile-top-bar">
        <h2 class="page-title">Loading...</h2>
    </div>
    <nav>
        <button class="hamburger" aria-label="Toggle navigation" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul>
            <li><a href="${homePath}">Home</a></li>
            <li><a href="${pagePrefix}about.html">About Me</a></li>
            <li><a href="${pagePrefix}studies.html">Studies</a></li>
            <li><a href="${pagePrefix}experiences.html">Experiences</a></li>
            <li><a href="${pagePrefix}hobbies.html">Hobbies</a></li>
        </ul>
    </nav>
  `;

  // 2. Active Link Logic & Dynamic Page Title Extraction
  const links = container.querySelectorAll('nav ul li a');
  let pageTitle = 'Home'; // Fallback

  links.forEach(link => {
    const href = link.getAttribute('href');
    const normalizedHref = href.replace('./', '').replace('../', '');
    const normalizedPath = currentPath.replace(/^\//, '');

    if (normalizedPath.endsWith(normalizedHref) || normalizedPath === normalizedHref) {
      link.classList.add('active');
      pageTitle = link.textContent.trim(); // Grab the active link's text!
    }
  });

  // Inject the extracted title into the banner
  const titleElement = container.querySelector('.page-title');
  if (titleElement) {
    titleElement.textContent = pageTitle;
  }

  // 3. Hamburger Toggle Logic
  const hamburger = container.querySelector('.hamburger');
  const navLinks = container.querySelector('nav ul');

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active'); 
    navLinks.classList.toggle('active');  
    document.body.classList.toggle('menu-open'); 
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
});