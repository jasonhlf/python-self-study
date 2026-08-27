// AI生成
/**
 * Python 自学指南 - 交互脚本
 * 功能：导航滚动效果、移动端菜单、代码Tab切换、滚动渐显动画
 */

(function () {
  'use strict';

  // ========== Navigation Scroll Effect ==========
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ========== Mobile Menu Toggle ==========
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ========== Code Tab Switching ==========
  const codeTabs = document.querySelectorAll('.code-tab');
  const codePanels = document.querySelectorAll('.code-panel');

  codeTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      // Update tab states
      codeTabs.forEach(function (t) {
        t.classList.remove('active');
      });
      this.classList.add('active');

      // Update panel states
      codePanels.forEach(function (panel) {
        panel.classList.remove('active');
        if (panel.getAttribute('data-panel') === targetTab) {
          panel.classList.add('active');
        }
      });
    });
  });

  // ========== Scroll Reveal Animation ==========
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Add stagger delay based on index within parent
            const siblings = Array.from(
              entry.target.parentElement.querySelectorAll('.reveal')
            );
            const index = siblings.indexOf(entry.target);
            const delay = Math.min(index * 80, 320);

            setTimeout(function () {
              entry.target.classList.add('visible');
            }, delay);

            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ========== Active Nav Highlight ==========
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function highlightActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(function (item) {
          item.classList.remove('active-nav');
          if (item.getAttribute('href') === '#' + id) {
            item.classList.add('active-nav');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ========== Syntax Highlighting ==========
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  // ========== Smooth Anchor Scroll ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ========== Roadmap Progress Tracking ==========
  const roadmapItems = document.querySelectorAll('.roadmap-item');

  roadmapItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      this.classList.toggle('completed');

      // Update marker visual
      const marker = this.querySelector('.roadmap-marker');
      if (this.classList.contains('completed')) {
        marker.style.background = 'var(--color-success)';
        marker.style.borderColor = 'var(--color-success)';
        marker.querySelector('.marker-num').style.color = 'var(--color-white)';
      } else {
        marker.style.background = '';
        marker.style.borderColor = '';
        marker.querySelector('.marker-num').style.color = '';
      }
    });
  });

  // ========== Console Welcome ==========
  console.log(
    '%c Python 自学指南 %c 开始你的编程之旅！',
    'background: #3776ab; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
    'color: #3776ab; font-size: 14px;'
  );
  console.log(
    '%c 提示：点击学习路线图中的阶段标记可以标记完成进度',
    'color: #64748b; font-size: 12px;'
  );
})();