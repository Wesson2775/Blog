document.addEventListener('DOMContentLoaded', () => {
    // 搜索图标动画和跳转
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('#search-input');

    if (searchIcon && searchInput) {
        console.log('搜索图标和输入框已找到，正在绑定点击事件');
        const handleSearch = (event) => {
            event.preventDefault();
            console.log('搜索图标被点击或触摸');
            searchIcon.classList.add('animate');
            const query = searchInput.value.trim();
            console.log('搜索关键词:', query);
            setTimeout(() => {
                searchIcon.classList.remove('animate');
                if (query) {
                    const baseUrl = '/Blog';
                    const searchUrl = `${baseUrl}/search.html?q=${encodeURIComponent(query)}`;
                    console.log('即将跳转到:', searchUrl);
                    window.location.href = searchUrl;
                } else {
                    console.log('关键词为空，不跳转');
                }
            }, 400);
        };
        searchIcon.addEventListener('click', handleSearch);
        searchIcon.addEventListener('touchstart', handleSearch);
    } else {
        console.error('未找到搜索图标或输入框');
    }

    // 搜索结果页面逻辑
    const searchResultsContainer = document.querySelector('#search-results');
    const searchQueryElement = document.querySelector('#search-query');
    if (searchResultsContainer && searchQueryElement) {
        console.log('搜索结果页面已加载');
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q')?.toLowerCase() || '';
        console.log('URL 中的关键词:', query);

        searchQueryElement.textContent = query ? `“${query}” 的搜索结果` : '搜索结果';

        const postsJsonUrl = '/Blog/posts.json';
        console.log('尝试加载:', postsJsonUrl);
        fetch(postsJsonUrl)
            .then(response => {
                console.log('posts.json 请求状态:', response.status);
                if (!response.ok) {
                    console.error('posts.json 加载失败，尝试备用路径: /posts.json');
                    return fetch('/posts.json');
                }
                return response;
            })
            .then(response => {
                if (!response.ok) throw new Error(`无法加载 posts.json，状态码: ${response.status}`);
                return response.text();
            })
            .then(text => {
                console.log('posts.json 原始内容（前 500 字符）:', text.substring(0, 500));
                try {
                    const posts = JSON.parse(text);
                    console.log('文章数据已加载:', posts);
                    const results = posts.filter(post => 
                        post.title?.toLowerCase().includes(query) ||
                        post.content?.toLowerCase().includes(query) ||
                        post.tags?.some(tag => tag.toLowerCase().includes(query))
                    );
                    console.log('搜索结果:', results);

                    searchResultsContainer.innerHTML = results.length > 0
                        ? results.map(post => `
                            <div class="search-result-item">
                                <div class="search-result-tags">
                                    ${post.tags?.map(tag => `<a href="/Blog/tags/${tag}" class="tag">${tag}</a>`).join(' ') || ''}
                                </div>
                                <h3><a href="${post.url}">${post.title}</a></h3>
                                <p>${post.content?.substring(0, 150)}...</p>
                                <div class="search-result-date">${post.date}</div>
                            </div>
                        `).join('')
                        : '<p class="no-results">未找到匹配内容</p>';
                } catch (error) {
                    console.error('JSON 解析失败:', error);
                    console.log('完整 posts.json 内容:', text);
                    searchResultsContainer.innerHTML = '<p class="no-results">未找到匹配内容（JSON 解析失败，请检查 posts.json）。</p>';
                    return;
                }
            })
            .catch(error => {
                console.error('加载文章数据失败:', error);
                searchResultsContainer.innerHTML = `<p class="no-results">加载文章失败：${error.message}。请检查 posts.json 或稍后重试。</p>`;
            });
    }
});