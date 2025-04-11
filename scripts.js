document.addEventListener('DOMContentLoaded', () => {
    // 移动端导航开关
    const menuToggle = document.querySelector('.ct-header-trigger');
    const offcanvas = document.querySelector('#offcanvas');
    const menuClose = offcanvas.querySelector('.ct-toggle-close');

    menuToggle.addEventListener('click', () => offcanvas.classList.toggle('active'));
    menuClose.addEventListener('click', () => offcanvas.classList.remove('active'));

    // 动态加载文章
    const articleList = document.getElementById('article-list');
    const pagination = document.getElementById('pagination');
    const articlesPerPage = 5;
    let currentPage = 1;

    // 示例 JSON 数据（实际应从 articles.json 加载）
    fetch('/articles.json')
        .then(response => response.json())
        .then(data => {
            renderArticles(data);
            setupPagination(data);
        })
        .catch(error => console.error('加载文章失败:', error));

    function renderArticles(articles) {
        const start = (currentPage - 1) * articlesPerPage;
        const end = start + articlesPerPage;
        const paginatedArticles = articles.slice(start, end);

        articleList.innerHTML = paginatedArticles.map(article => `
            <article class="entry-card">
                <ul class="entry-meta">
                    <li class="meta-date">${article.date}</li>
                    <li class="meta-categories"><a href="${article.categoryUrl}">${article.category}</a></li>
                </ul>
                <h2 class="entry-title"><a href="${article.url}">${article.title}</a></h2>
                <div class="entry-excerpt"><p>${article.excerpt}</p></div>
            </article>
        `).join('');
    }

    function setupPagination(articles) {
        const totalPages = Math.ceil(articles.length / articlesPerPage);
        let paginationHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<a href="#" class="page-numbers ${i === currentPage ? 'current' : ''}" data-page="${i}">${i}</a>`;
        }
        paginationHTML += `<a href="#" class="next page-numbers" data-page="${currentPage + 1}">下一个</a>`;
        pagination.innerHTML = paginationHTML;

        pagination.querySelectorAll('.page-numbers').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = parseInt(e.target.dataset.page);
                renderArticles(articles);
                setupPagination(articles);
            });
        });
    }
});