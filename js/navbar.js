document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('navbar-placeholder');
  if (!container) return;

  const currentPath = window.location.pathname;
  const isInPagesFolder = currentPath.includes('/pages/');

  const pagePrefix = isInPagesFolder ? '' : 'pages/';
  const homePath = isInPagesFolder ? '../index.html' : './index.html';

  container.innerHTML = `
    <header>
      <nav>
        <ul>
          <li><a href="${homePath}">Home</a></li>
          <li><a href="${pagePrefix}about.html">About Me</a></li>
          <li><a href="${pagePrefix}studies.html">Studies</a></li>
          <li><a href="${pagePrefix}experiences.html">Experiences</a></li>
          <li><a href="${pagePrefix}hobbies.html">Hobbies</a></li>
        </ul>
      </nav>
    </header>
  `;

  const links = container.querySelectorAll('nav ul li a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    const normalizedHref = href.replace('./', '').replace('../', '');
    const normalizedPath = currentPath.replace(/^\//, '');

    if (normalizedPath.endsWith(normalizedHref) || normalizedPath === normalizedHref) {
      link.classList.add('active');
    }
  });
});