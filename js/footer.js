document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('footer-placeholder');
  if (!container) return;

  // 🔹 Inject your exact footer HTML
  container.innerHTML = `
    <footer class="footer">
      <div class="footer-container">
        <!-- About Me -->
        <div class="footer-section">
          <h3>About Me</h3>
          <a href="../pages/about.html#about" class="abouts" target="_blank" rel="noopener">I'm Karen! Nice to meet you!</a>
        </div>
        
        <!-- Updates -->
        <div class="footer-section">
          <h3>Updates</h3>
          <ul>
            <li>Updated Hobbies Details</li>
            <li>Added Employment Pictures</li>
          </ul>
        </div>
        
        <!-- Contact / Social -->
        <div class="footer-section">
          <h3>Contacts</h3>
          <div class="social-icons">
            <a href="../pages/about.html#contact" class="social-icon" target="_blank" rel="noopener">
              <i class="fab fa-github"></i>
            </a>
            <a href="../pages/about.html#contact" class="social-icon" target="_blank" rel="noopener">
              <i class="fab fa-discord"></i>
            </a>
            <a href="../pages/about.html#contact" class="social-icon" target="_blank" rel="noopener">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // 🔹 Optional: Re-attach hover effects if your CSS doesn't cover them
  // (Only needed if you want JS-controlled animations)
  const icons = container.querySelectorAll('.social-icon');
  icons.forEach(icon => {
    icon.addEventListener('mouseenter', (e) => {
      e.currentTarget.style.transform = 'translateY(-10px) scale(1.2)';
    });
    icon.addEventListener('mouseleave', (e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
    });
  });
});