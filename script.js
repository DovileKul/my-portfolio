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
    const tabs = document.querySelectorAll('.tab-button');
    const panels = document.querySelectorAll('.tab-panel');

    if (tabs.length && panels.length) {
        tabs[0].classList.add('active');
        panels[0].classList.add('active');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab)?.classList.add('active');
            });
        });
    }

    // Projects
    const filters = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    if (filters.length && projects.length) {
        filters[0].classList.add('active');

        filters.forEach(btn => {
            btn.addEventListener('click', () => {
                filters.forEach(f => f.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                projects.forEach(card => {
                    const show = filter === 'all' || card.dataset.category.includes(filter);
                    card.style.display = show ? 'block' : 'none';
                    setTimeout(() => {
                        card.style.opacity = show ? '1' : '0';
                        card.style.transform = show ? 'scale(1)' : 'scale(0.8)';
                    }, 10);
                });
            });
        });
    }
});
