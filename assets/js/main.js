document.addEventListener('DOMContentLoaded', () => {
    // 语言切换逻辑
    const langLinks = document.querySelectorAll('.lang-link');
    
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.textContent.toLowerCase();
            document.cookie = `lang=${lang};path=/;max-age=31536000`;
            window.location.href = link.href;
        });
    });

    // 回到顶部按钮逻辑
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});