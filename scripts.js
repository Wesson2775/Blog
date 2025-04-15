document.addEventListener('DOMContentLoaded', () => {
    const langLinks = document.querySelectorAll('.lang-link');
    const savedLang = localStorage.getItem('lang') || 'zh';

    langLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase() === savedLang) {
            link.classList.add('active');
        }

        link.addEventListener('click', (e) => {
            langLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            localStorage.setItem('lang', e.target.textContent.toLowerCase());
        });
    });
});