/* ============================================================
   SEASIDE SCI-FI CARD RENDERER v3.1
   Architecture: articles.json + single sections.json
   Sort order: weighting desc > band desc > date desc
   Usage: SciFilCards.renderSection(sectionId, gridId)
   v2.1: renderSection call moved into script to fix
         ReferenceError when called from inline script block.
   v2.2: Article card titles corrected from h3 to h2 for
         proper semantic hierarchy and accessibility.
   v3.0: Architecture rebuilt. master articles.json +
         per-section JSON files. Three-tier sort.
   v3.1: Separate section files consolidated into single
         sections.json keyed by section id. Simpler to
         manage and deploy. Both files fetched once and
         cached for the session.
   ============================================================ */

const SciFilCards = (() => {

    let articlesCache = null;
    let sectionsCache = null;

    const fetchArticles = () => {
        if (articlesCache) return Promise.resolve(articlesCache);
        return fetch('articles.json')
            .then(res => res.json())
            .then(data => { articlesCache = data; return data; })
            .catch(err => { console.warn('Card renderer: could not load articles.json', err); return []; });
    };

    const fetchSections = () => {
        if (sectionsCache) return Promise.resolve(sectionsCache);
        return fetch('sections.json')
            .then(res => res.json())
            .then(data => { sectionsCache = data; return data; })
            .catch(err => { console.warn('Card renderer: could not load sections.json', err); return {}; });
    };

    const buildCard = (article, sectionEntry) => {
        const card = document.createElement('a');
        card.href = article.url;
        card.className = sectionEntry.type === 'featured' ? 'featured-card' : 'article-card';

        card.innerHTML = `
            <img src="assets/img/cards/${article.image}" alt="${article.title}">
            <div class="card-content">
                <h2>${article.title}</h2>
                <p>${article.description}</p>
            </div>
        `;
        return card;
    };

    const renderSection = (sectionId, gridId) => {
        const grid = document.getElementById(gridId);
        if (!grid) {
            console.warn(`Card renderer: no element found with id "${gridId}"`);
            return;
        }

        Promise.all([fetchArticles(), fetchSections()])
            .then(([articles, sections]) => {

                const sectionEntries = sections[sectionId];
                if (!sectionEntries) {
                    console.warn(`Card renderer: section "${sectionId}" not found in sections.json`);
                    return;
                }

                // Build lookup from master
                const masterMap = {};
                articles.forEach(a => { masterMap[a.id] = a; });

                // Filter: both master active and section active must be yes
                const active = sectionEntries.filter(entry => {
                    const master = masterMap[entry.id];
                    return master && master.active === 'yes' && entry.active === 'yes';
                });

                // Sort: weighting desc, band desc (from master), date desc
                active.sort((a, b) => {
                    if (b.weighting !== a.weighting) return b.weighting - a.weighting;
                    const bandA = masterMap[a.id].band || 0;
                    const bandB = masterMap[b.id].band || 0;
                    if (bandB !== bandA) return bandB - bandA;
                    return new Date(b.date) - new Date(a.date);
                });

                // Build and append cards
                active.forEach(entry => {
                    const master = masterMap[entry.id];
                    grid.appendChild(buildCard(master, entry));
                });
            });
    };

    return { renderSection };

})();

/* --- PAGE RENDER CALLS --- */
document.addEventListener('DOMContentLoaded', () => {
    SciFilCards.renderSection('section001', 'home-grid');
});