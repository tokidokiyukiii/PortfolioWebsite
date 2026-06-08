document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.createElement('div');
  tooltip.className = 'custom-tooltip';
  tooltip.setAttribute('role', 'tooltip'); 
  document.body.appendChild(tooltip);

  const triggers = document.querySelectorAll('[data-tooltip]');

  triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', showTooltip);
    trigger.addEventListener('mouseleave', hideTooltip);
    trigger.addEventListener('focus', showTooltip);   
    trigger.addEventListener('blur', hideTooltip);     
  });

  window.addEventListener('scroll', hideTooltip, true);

  function showTooltip(e) {
    const target = e.target;
    const text = target.getAttribute('data-tooltip');
    if (!text) return;

    tooltip.textContent = text;
    tooltip.classList.add('visible');

    const rect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top = rect.top + window.scrollY - tooltipRect.height - 10; 
    let left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);

    if (left < 10) {
      left = 10;
    } else if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  function hideTooltip() {
    tooltip.classList.remove('visible');
  }
});