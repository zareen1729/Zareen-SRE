  <script>
    // ==============================
    // Theme Toggle with localStorage
    // ==============================
    (function(){
      const root = document.documentElement;
      const btn = document.getElementById('theme-toggle');
      const sun = document.getElementById('icon-sun');
      const moon = document.getElementById('icon-moon');

      function apply(theme){
        root.setAttribute('data-theme', theme);
        const isDark = theme === 'dark';
        sun.style.display = isDark ? 'none' : 'block';
        moon.style.display = isDark ? 'block' : 'none';
      }

      const saved = localStorage.getItem('theme');
      const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      apply(saved || (prefDark ? 'dark' : 'light'));

      btn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        apply(next);
      });
    })();

    // ==============================
    // Mobile Nav Toggle
    // ==============================
    (function(){
      const burger = document.getElementById('hamburger');
      const links = document.getElementById('nav-links');
      burger.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        burger.setAttribute('aria-expanded', String(open));
      });
      // Close menu after clicking a link (mobile)
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }));
    })();

    // ==============================
    // Contact Form (mailto fallback)
    // ==============================
    (function(){
      const form = document.getElementById('contact-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if(!name || !email || !message){
          alert('Please fill out all fields.');
          return;
        }
        // Replace with your email address
        const to = 'you@example.com';
        const subject = encodeURIComponent('Portfolio Contact from ' + name);
        const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>');
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      });
    })();

    // ==============================
    // Misc: current year
    // ==============================
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==============================
    // Highlight Active Section Link
    // ==============================
    (function(){
      const sections = ['about','skills','projects','experience','contact'].map(id => document.getElementById(id));
      const links = Array.from(document.querySelectorAll('nav.links a'));
      const map = new Map(sections.map(sec => [sec.id, links.find(a => a.getAttribute('href') === '#' + sec.id)]));

      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const a = map.get(entry.target.id);
          if(a){
            if(entry.isIntersecting){ a.style.background = 'var(--bg-elev)'; }
            else { a.style.background = 'transparent'; }
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

      sections.forEach(sec => sec && obs.observe(sec));
    })();
  </script>
