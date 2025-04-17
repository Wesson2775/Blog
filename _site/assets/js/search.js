document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('.search-icon');

    // 检查搜索框是否存在
    if (!searchInput || !searchIcon) {
        console.log('搜索框未找到，当前页面:', window.location.pathname);
        return;
    }

    // 使用硬编码路径
    const searchPagePath = '/Blog/search';
    const isFragmentsPage = window.location.pathname.includes('/fragments/');
    const searchJsonPath = isFragmentsPage ? '/Blog/fragments-search.json' : '/Blog/search.json';

    // 处理搜索跳转
    const handleSearchRedirect = () => {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            const url = `${searchPagePath}?q=${encodeURIComponent(query)}&type=${isFragmentsPage ? 'fragments' : 'posts'}`;
            console.log('跳转到搜索结果页面:', url);
            window.location.href = url;
        }
    };

    // 处理回车键
    const handleKeydown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchRedirect();
        }
    };

    // 事件监听
    searchInput.addEventListener('keydown', handleKeydown);
    searchIcon.addEventListener('click', handleSearchRedirect);
    searchIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSearchRedirect();
        }
    });
});