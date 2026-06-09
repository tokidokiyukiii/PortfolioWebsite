document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('footer-placeholder');
  if (!container) return;

  container.innerHTML = `
    <footer class="footer">
      <div class="footer-container">
        <!-- About Me -->
        <div class="footer-section">
          <h3>About Me</h3>
          <a href="../pages/about.html#about" class="abouts" target="_blank" rel="noopener">I'm Karen! Nice to meet you! Want to know more about Me?</a>
        </div>
        
        <!-- Updates -->
        <div class="footer-section">
          <h3>Updates</h3>
          <ul>
            <li>Updated Hobbies Details</li>
            <li>Added Pictures</li>
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
});