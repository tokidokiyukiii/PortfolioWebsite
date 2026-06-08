document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const preview = header.nextElementSibling;
            const content = preview.nextElementSibling;
            const isOpen = header.getAttribute('aria-expanded') === 'true';
            
            if (isOpen) {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                document.querySelectorAll('.accordion-header').forEach(otherHeader => {
                    if (otherHeader !== header) {
                        otherHeader.setAttribute('aria-expanded', 'false');
                        const otherPreview = otherHeader.nextElementSibling;
                        const otherContent = otherPreview.nextElementSibling;
                        otherContent.style.maxHeight = null;
                    }
                });
                
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});