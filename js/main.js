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

  // ========== Weather Widget ==========
  const weatherDisplay = document.getElementById('weatherDisplay');
  const weatherSearch = document.getElementById('weatherSearch');
  const weatherSearchBtn = document.getElementById('weatherSearchBtn');

  // WMO Weather codes mapping
  const weatherCodes = {
    0: { desc: '晴朗', icon: '☀️' },
    1: { desc: '大致晴朗', icon: '🌤️' },
    2: { desc: '局部多云', icon: '⛅' },
    3: { desc: '阴天', icon: '☁️' },
    45: { desc: '雾', icon: '🌫️' },
    48: { desc: '雾凇', icon: '🌫️' },
    51: { desc: '小雨', icon: '🌦️' },
    53: { desc: '小雨', icon: '🌦️' },
    55: { desc: '中雨', icon: '🌧️' },
    56: { desc: '冻雨', icon: '🌧️' },
    57: { desc: '冻雨', icon: '🌧️' },
    61: { desc: '小雨', icon: '🌦️' },
    63: { desc: '中雨', icon: '🌧️' },
    65: { desc: '大雨', icon: '🌧️' },
    66: { desc: '冻雨', icon: '🌧️' },
    67: { desc: '冻雨', icon: '🌧️' },
    71: { desc: '小雪', icon: '🌨️' },
    73: { desc: '中雪', icon: '🌨️' },
    75: { desc: '大雪', icon: '❄️' },
    77: { desc: '雪粒', icon: '❄️' },
    80: { desc: '阵雨', icon: '🌦️' },
    81: { desc: '中阵雨', icon: '🌧️' },
    82: { desc: '强阵雨', icon: '⛈️' },
    85: { desc: '阵雪', icon: '🌨️' },
    86: { desc: '强阵雪', icon: '❄️' },
    95: { desc: '雷暴', icon: '⛈️' },
    96: { desc: '雷暴冰雹', icon: '⛈️' },
    99: { desc: '强雷暴冰雹', icon: '⛈️' }
  };

  function renderWeatherLoading() {
    weatherDisplay.innerHTML =
      '<div class="weather-loading"><div class="weather-spinner"></div><p>正在获取天气数据…</p></div>';
  }

  function renderWeatherError(msg) {
    weatherDisplay.innerHTML = '<div class="weather-error">' + msg + '</div>';
  }

  function renderWeather(data, locationName) {
    var current = data.current;
    var code = current.weather_code;
    var wInfo = weatherCodes[code] || { desc: '未知', icon: '🌡️' };

    weatherDisplay.innerHTML =
      '<div class="weather-info">' +
        '<div class="weather-location">📍 ' + locationName + '</div>' +
        '<div class="weather-main">' +
          '<div class="weather-icon">' + wInfo.icon + '</div>' +
          '<div>' +
            '<div class="weather-temp">' + Math.round(current.temperature_2m) + '°C</div>' +
            '<div class="weather-desc">' + wInfo.desc + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="weather-details">' +
          '<div class="weather-detail-item">' +
            '<span class="weather-detail-label">湿度</span>' +
            '<span class="weather-detail-value">' + current.relative_humidity_2m + '%</span>' +
          '</div>' +
          '<div class="weather-detail-item">' +
            '<span class="weather-detail-label">风速</span>' +
            '<span class="weather-detail-value">' + current.wind_speed_10m + ' km/h</span>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function fetchWeather(cityName) {
    renderWeatherLoading();

    // Step 1: Geocoding
    fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(cityName) + '&count=1&language=zh')
      .then(function (res) { return res.json(); })
      .then(function (geoData) {
        if (!geoData.results || geoData.results.length === 0) {
          renderWeatherError('未找到城市「' + cityName + '」，请检查城市名');
          return null;
        }
        var loc = geoData.results[0];
        // Step 2: Fetch weather
        return fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=' + loc.latitude +
          '&longitude=' + loc.longitude +
          '¤t=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m'
        )
          .then(function (res) { return res.json(); })
          .then(function (weatherData) {
            var displayName = loc.name;
            if (loc.admin1 && loc.admin1 !== loc.name) {
              displayName = loc.name + '，' + loc.admin1;
            }
            renderWeather(weatherData, displayName);
          });
      })
      .catch(function () {
        renderWeatherError('获取天气数据失败，请稍后重试');
      });
  }

  // Default city
  fetchWeather('深圳');

  // Search button
  weatherSearchBtn.addEventListener('click', function () {
    var city = weatherSearch.value.trim();
    if (city) {
      fetchWeather(city);
    }
  });

  // Enter key search
  weatherSearch.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var city = weatherSearch.value.trim();
      if (city) {
        fetchWeather(city);
      }
    }
  });

  // ========== Calendar Widget ==========
  var calTitle = document.getElementById('calTitle');
  var calDays = document.getElementById('calDays');
  var calTodayInfo = document.getElementById('calTodayInfo');
  var calPrev = document.getElementById('calPrev');
  var calNext = document.getElementById('calNext');

  var calCurrent = new Date();
  var today = new Date();

  var monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'];
  var weekdayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  function renderCalendar() {
    var year = calCurrent.getFullYear();
    var month = calCurrent.getMonth();

    calTitle.textContent = year + ' 年 ' + monthNames[month];

    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var firstWeekday = firstDay.getDay();
    var daysInMonth = lastDay.getDate();
    var prevMonthDays = new Date(year, month, 0).getDate();

    var html = '';

    // Previous month's trailing days
    for (var i = firstWeekday - 1; i >= 0; i--) {
      var dayNum = prevMonthDays - i;
      var weekday = (firstWeekday - i) % 7;
      var weekendClass = (weekday === 0 || weekday === 6) ? ' weekend' : '';
      html += '<div class="cal-day other-month' + weekendClass + '">' + dayNum + '</div>';
    }

    // Current month's days
    for (var d = 1; d <= daysInMonth; d++) {
      var weekday = new Date(year, month, d).getDay();
      var classes = 'cal-day';
      if (weekday === 0 || weekday === 6) classes += ' weekend';
      if (year === today.getFullYear() && month === today.getMonth() && d === today.getDate()) {
        classes += ' today';
      }
      html += '<div class="' + classes + '">' + d + '</div>';
    }

    // Next month's leading days
    var totalCells = firstWeekday + daysInMonth;
    var remaining = (7 - (totalCells % 7)) % 7;
    for (var r = 1; r <= remaining; r++) {
      var weekday = (totalCells + r - 1) % 7;
      var weekendClass = (weekday === 0 || weekday === 6) ? ' weekend' : '';
      html += '<div class="cal-day other-month' + weekendClass + '">' + r + '</div>';
    }

    calDays.innerHTML = html;

    // Today info
    if (year === today.getFullYear() && month === today.getMonth()) {
      calTodayInfo.innerHTML = '今天是 <strong>' + today.getFullYear() + ' 年 ' +
        (today.getMonth() + 1) + ' 月 ' + today.getDate() + ' 日</strong> ' +
        weekdayNames[today.getDay()];
    } else {
      calTodayInfo.innerHTML = '';
    }
  }

  calPrev.addEventListener('click', function () {
    calCurrent.setMonth(calCurrent.getMonth() - 1);
    renderCalendar();
  });

  calNext.addEventListener('click', function () {
    calCurrent.setMonth(calCurrent.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();

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