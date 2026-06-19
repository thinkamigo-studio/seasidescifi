/* ============================================================
   SEASIDE SCI-FI CARD RENDERER v2.2
   Reads articles.json and builds card grids on any page.
   Usage: SciFilCards.renderSection(section, gridId)
   Call once per section block on any page.
   articles.json is fetched once and cached for the session.
   v2.1: renderSection call moved into script to fix
         ReferenceError when called from inline script block.
   v2.2: Article card titles changed from h3 to h2 for correct
         semantic hierarchy. One h1 per page (featured card).
         All other card titles are h2 - same level, correct
         for accessibility and SEO.
   ============================================================ */

const SciFilCards = (() => {

    let cache = null;

    const fetchArticles = () => {
        if (cache) return Promise.resolve(cache);
        return fetch('articles.json')
            .then(res => res.json())
            .then(data => { cache = data; return data; })
            .catch(err => { console.warn('Card renderer: could not load articles.json', err); return []; });
    };

    const buildCard = (article) => {
        const card = document.createElement('a');
        card.href = article.url;
        card.className = article.type === 'featured' ? 'featured-card' : 'article-card';

        const titleTag = 'h2';

        card.innerHTML = `
            <img src="assets/img/cards/${article.image}" alt="${article.title}">
            <div class="card-content">
                <${titleTag}>${article.title}</${titleTag}>
                <p>${article.description}</p>
            </div>
        `;
        return card;
    };

    const renderSection = (section, gridId) => {
        const grid = document.getElementById(gridId);
        if (!grid) { console.warn(`Card renderer: no element found with id "${gridId}"`); return; }

        fetchArticles().then(articles => {
            const filtered = articles
                .filter(a => a.active === 'yes' && a.section.includes(section))
                .sort((a, b) => a.order - b.order);

            filtered.forEach(article => grid.appendChild(buildCard(article)));
        });
    };

    return { renderSection };

})();

/* --- PAGE RENDER CALLS --- */
document.addEventListener('DOMContentLoaded', () => {
    SciFilCards.renderSection('home-featured', 'home-grid');
});