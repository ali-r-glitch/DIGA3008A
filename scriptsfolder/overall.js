document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
  
    burger.addEventListener('click', () => {
      // Toggle nav
      nav.classList.toggle('nav-active');
  
      // Animate links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
  
      // Burger animation
      burger.classList.toggle('toggle');
  
     
      burger.setAttribute('aria-expanded', !expanded);
    });
  });

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("backToTop");

    // Show/hide button when scrolling
    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    });

    // Scroll smoothly to top when clicked
    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });
  