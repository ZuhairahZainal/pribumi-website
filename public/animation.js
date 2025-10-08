window.addEventListener('beforeunload', () => {
  // Clear any hash from URL before refresh
  history.replaceState(null, document.title, window.location.pathname + window.location.search);
});

window.addEventListener("load", () => {
  // Scroll to top on page load to show hero
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in, .fade-in-up");

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        // Now supports fade-out too!
        entry.target.classList.remove("show");
      }
    });
  }, appearOptions);

  faders.forEach((el) => {
    appearOnScroll.observe(el);
  });
});

function confirmCall(event) {
  event.preventDefault(); // prevent direct call
  const confirmAction = confirm("Do you want to call +673 8795299?");
  if (confirmAction) {
    window.location.href = "tel:+6738795299";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById('scroll-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = mobileMenu.querySelectorAll("a");

  // Scroll behavior for header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.remove('-translate-y-full', 'opacity-0');
      header.classList.add('translate-y-0', 'opacity-100');
    } else {
      header.classList.remove('translate-y-0', 'opacity-100');
      header.classList.add('-translate-y-full', 'opacity-0');
    }
  });

  // Toggle mobile menu open/close
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("max-h-0");

    if (isOpen) {
      mobileMenu.classList.remove("max-h-0", "opacity-0", "pointer-events-none", "translate-y-[-10px]");
      mobileMenu.classList.add("max-h-[500px]", "opacity-100", "pointer-events-auto", "translate-y-0");
    } else {
      closeMobileMenu();
    }
  });

  // Close menu when any nav link is clicked
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Function to close menu
  function closeMobileMenu() {
    mobileMenu.classList.add("max-h-0", "opacity-0", "pointer-events-none", "translate-y-[-10px]");
    mobileMenu.classList.remove("max-h-[500px]", "opacity-100", "pointer-events-auto", "translate-y-0");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const slideCount = document.querySelectorAll('.swiper-slide').length;

  new Swiper(".mySwiper", {
    slidesPerView: 1.1,
    spaceBetween: 16,
    loop: slideCount > 4, // 🔧 only loop if enough slides
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});

(() => {
  const a = document.getElementById("hero-a");
  const b = document.getElementById("hero-b");
  if (!a || !b) return;

  const images = [
    "./assets/1.png","./assets/14.png","./assets/13.png","./assets/4.png",
    "./assets/5.png","./assets/6.png","./assets/2.png","./assets/3.png"
  ];

  const intervalMs = 3500;
  const transMs    = 1000;

  images.forEach(src => { const img = new Image(); img.src = src; });

  let idx = 0;
  let front = a, back = b;

  const setBg = (el, src) => { el.style.backgroundImage = `url("${src}")`; };

  // --- Initial fade in on refresh ---
  setBg(front, images[idx]);
  requestAnimationFrame(() => { front.style.opacity = "1"; });

  const crossfadeTo = (nextIdx) => {
    setBg(back, images[nextIdx]);
    back.style.opacity = "1";
    front.style.opacity = "0";
    setTimeout(() => { [front, back] = [back, front]; }, transMs);
  };

  setInterval(() => {
    idx = (idx + 1) % images.length;
    crossfadeTo(idx);
  }, intervalMs);
})();

(function initTheme() {
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored ? stored === 'dark' : prefersDark;
    root.classList.toggle('dark', dark);
    setFabIcon(dark);
  })();

  function setFabIcon(isDark) {
    const fab = document.getElementById('theme-fab');
    if (!fab) return;
    fab.textContent = isDark ? '☼' : '☾';
  }

  function toggleTheme() {
    const root = document.documentElement;

    // start cross-fade
    root.classList.add('theme-fade');

    const nowDark = !root.classList.contains('dark');
    root.classList.toggle('dark', nowDark);
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    setFabIcon(nowDark);

    // end cross-fade after the CSS transition time
    setTimeout(() => {
      root.classList.remove('theme-fade');
    }, 280); // a hair longer than the 260ms CSS transition
}

  document.getElementById('theme-fab')?.addEventListener('click', toggleTheme);

  try {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener?.('change', (e) => {
      // only react if user hasn't manually chosen a theme
      if (localStorage.getItem('theme')) return;

      const root = document.documentElement;
      root.classList.add('theme-fade');
      root.classList.toggle('dark', e.matches);
      setFabIcon(e.matches);

      setTimeout(() => root.classList.remove('theme-fade'), 280);
    });
  } catch {}

  const form = document.getElementById("inquiry-form");
  const successMsg = document.getElementById("success-message");

  form.addEventListener("submit", async function(e) {
    e.preventDefault(); // stop normal form redirect

    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset(); // clear inputs
      successMsg.classList.remove("hidden"); // show success text
    } else {
      alert("❌ There was an error sending your message. Please try again.");
    }
  });