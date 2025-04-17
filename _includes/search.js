document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('.search-icon');
    const searchResults = document.getElementById('search-results');
    let postsCache = null;
    let selectedIndex = -1;

    // 动态构建 search.json 路径
    const baseurl = '{{ site.baseurl }}'.replace(/^\/|\/$/g, '');
    const searchJsonPath = baseurl ? `/${baseurl}/search.json` : '/search.json';

    // 防抖函数
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // 加载搜索索引
    const loadIndex = async () => {
        if (postsCache) return postsCache;
        try {
            const res = await fetch(searchJsonPath);
            if (!res.ok) throw new Error('无法加载 search.json');
            postsCache = await res.json();
            return postsCache;
        } catch (error) {
            console.error('加载搜索索引失败:', error);
            searchResults.innerHTML = '<p class="no-results">搜索出错，请稍后重试</p>';
            return [];
        }
    };

    // 模糊搜索和排序
    const searchPosts = (query, posts) => {
        if (!query) return [];
        const terms = query.toLowerCase().split(/\s+/);
        
        return posts
            .map(post => {
                let score = 0;
                const title = post.title.toLowerCase();
                const content = post.content.toLowerCase();
                
                terms.forEach(term => {
                    if (title.includes(term)) score += 10;
                    if (content.includes(term)) score += 1;
                });

                return { post, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.post);
    };

    // 高亮匹配关键词
    const highlightText = (text, query) => {
        const terms = query.toLowerCase().split(/\s+/);
        let result = text;
        terms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            result = result.replace(regex, '<mark>$1</mark>');
        });
        return result;
    };

    // 渲染下拉搜索结果
    const renderResults = (results, query) => {
        searchResults.innerHTML = results.length
            ? results.map((post, index) => `
                <div class="search-result-item" data-index="${index}">
                    <a href="${post.url}">${highlightText(post.title, query)}</a>
                    <p>${highlightText(post.excerpt || post.content.substring(0, 100), query)}...</p>
                </div>
            `).join('')
            : '<p class="no-results">未找到匹配内容</p>';

        selectedIndex = -1; // 重置选中索引
    };

    // 处理即时搜索（下拉列表）
    const handleInstantSearch = debounce(async () => {
        const query = searchInput.value.trim();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const posts = await loadIndex();
        const results = searchPosts(query, posts);
        renderResults(results, query);
    }, 300);

    // 处理搜索跳转
    const handleSearchRedirect = () => {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            window.location.href = `${baseurl ? '/' + baseurl : ''}/search?q=${encodeURIComponent(query)}`;
        }
    };

    // 键盘导航
    const handleKeydown = (e) => {
        const items = searchResults.querySelectorAll('.search-result-item');
        if (!items.length) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchRedirect();
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(items);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            const selectedItem = items[selectedIndex];
            window.location.href = selectedItem.querySelector('a').href;
        } else if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchRedirect();
        }
    };

    // 更新选中样式
    const updateSelection = (items) => {
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === selectedIndex);
        });
        if (selectedIndex >= 0) {
            items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    };

    // 事件监听
    searchInput.addEventListener('input', handleInstantSearch);
    searchInput.addEventListener('keydown', handleKeydown);
    searchIcon.addEventListener('click', handleSearchRedirect);
    searchIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSearchRedirect();
        }
    });
    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && e.target !== searchInput && e.target !== searchIcon) {
            searchResults.innerHTML = '';
            selectedIndex = -1;
        }
    });
});