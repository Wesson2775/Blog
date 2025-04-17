class Search {
    constructor() {
        this.input = document.getElementById('search-input');
        this.results = document.getElementById('search-results');
        this.index = null;
        
        this.init();
    }

    async init() {
        await this.loadIndex();
        this.setupEvents();
    }

    async loadIndex() {
        const response = await fetch('/search.json');
        this.posts = await response.json();
    }

    setupEvents() {
        this.input.addEventListener('input', () => this.handleSearch());
        document.addEventListener('click', (e) => {
            if (!this.results.contains(e.target) && e.target !== this.input) {
                this.results.innerHTML = '';
            }
        });
    }

    handleSearch() {
        const query = this.input.value.trim().toLowerCase();
        if (query.length < 2) {
            this.results.innerHTML = '';
            return;
        }

        const matches = this.posts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.content.toLowerCase().includes(query)
        );

        this.displayResults(matches);
    }

    displayResults(results) {
        this.results.innerHTML = results.length 
            ? results.map(post => `
                <article class="search-result">
                    <h3><a href="${post.url}">${post.title}</a></h3>
                    <p>${post.excerpt || post.content.substring(0, 100)}...</p>
                </article>
              `).join('')
            : '<p class="no-results">未找到匹配内容</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => new Search());