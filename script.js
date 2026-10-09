document.addEventListener('DOMContentLoaded', () => {
    // Nav 
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            navLinks?.classList.remove('nav-active');
            hamburger?.classList.remove('toggle');
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Experience 
       // Experience
    const tabs = document.querySelectorAll('.tab-button');
    const panels = document.querySelectorAll('.tab-panel');

    const activateTab = (tab) => {
        tabs.forEach(t => {
            const isActive = t === tab;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive);
            t.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach(p => {
            const isActive = p.id === tab.dataset.tab;
            p.classList.toggle('active', isActive);
            p.hidden = !isActive;
        });
    };

    if (tabs.length && panels.length) {
        activateTab(tabs[0]);
        tabs.forEach(tab => {
            tab.addEventListener('click', () => activateTab(tab));
        });
    }

    // Projects
    const grid = document.querySelector('.projects-grid');
    const filters = document.querySelectorAll('.filter-btn');
    const showMoreBtn = document.getElementById('showMore');

    if (grid && filters.length) {
        Array.from(grid.children).reverse().forEach(card => grid.appendChild(card));

        const cards = grid.querySelectorAll('.project-card');
        const VISIBLE = 6;
        let activeFilter = 'all';
        let expanded = false;

        const render = () => {
            let shown = 0;

            cards.forEach(card => {
                const matches = activeFilter === 'all'
                    || card.dataset.category.includes(activeFilter);

                if (!matches) {
                    card.classList.add('is-hidden');
                    return;
                }

                shown++;
                card.classList.toggle('is-hidden', !expanded && shown > VISIBLE);
            });

            if (showMoreBtn) {
                showMoreBtn.parentElement.style.display =
                    shown > VISIBLE ? 'flex' : 'none';
                showMoreBtn.textContent = expanded ? 'Show less' : 'Show more projects';
            }
        };

        filters.forEach(btn => {
            btn.addEventListener('click', () => {
                filters.forEach(f => f.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.dataset.filter;
                expanded = false;
                render();
            });
        });

        showMoreBtn?.addEventListener('click', () => {
            expanded = !expanded;
            render();
        });

        filters[0].classList.add('active');
        render();
    }
});