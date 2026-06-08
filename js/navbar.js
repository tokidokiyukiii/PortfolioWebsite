document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('navbar-placeholder');
  if (!container) return;

  container.innerHTML = `
    <header>
      <nav>
        <ul>
          <li><a href="./index.html">Home</a></li>
          <li><a href="../pages/about.html">About Me</a></li>
          <li><a href="../pages/studies.html">Studies</a></li>
          <li><a href="../pages/experiences.html">Experiences</a></li>
          <li><a href="../pages/hobbies.html">Hobbies</a></li>
        </ul>
      </nav>
    </header>
  `;

  const currentPath = window.location.pathname;
  const links = container.querySelectorAll('nav ul li a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });

  if (currentPath === '/' || currentPath === '/index.html') {
    const homeLink = container.querySelector('a[href="index.html"]');
    if (homeLink) homeLink.classList.add('active');
  }
});