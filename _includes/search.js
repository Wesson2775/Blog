document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value.trim();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const res = await fetch('/search.json');
        const posts = await res.json();
        
        const results = posts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) || 
            post.content.toLowerCase().includes(query.toLowerCase())
        );

        searchResults.innerHTML = results.map(post => `
            <div class="search-result-item">
                <a href="${post.url}">${post.title}</a>
                <p>${post.excerpt}</p>
            </div>
        `).join('');
    });
});