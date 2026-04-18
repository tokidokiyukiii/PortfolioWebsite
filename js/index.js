document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('navbar-placeholder');
  if (!container) return;

  // 🔹 Inject your exact navbar HTML
  container.innerHTML = `
    <header>
      <nav>
        <ul>
          <li><a href="../index.html">Home</a></li>
          <li><a href="../pages/about.html">About Me</a></li>
          <li><a href="../pages/studies.html">Studies</a></li>
          <li><a href="../pages/experiences.html">Experiences</a></li>
          <li><a href="../pages/hobbies.html">Hobbies</a></li>
        </ul>
      </nav>
    </header>
  `;

  // 🔹 Auto-highlight the current page
  const currentPath = window.location.pathname;
  const links = container.querySelectorAll('nav ul li a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    // Matches both root (/index.html) and /pages/*.html
    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });

  // Fallback for when URL is just "/" (common with local servers)
  if (currentPath === '/' || currentPath === '/index.html') {
    const homeLink = container.querySelector('a[href="index.html"]');
    if (homeLink) homeLink.classList.add('active');
  }
});