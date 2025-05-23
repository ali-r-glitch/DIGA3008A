document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".timeline-block");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    blocks.forEach(block => {
      const blockTop = block.getBoundingClientRect().top;

      if (blockTop < triggerBottom) {
        block.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run on load
});
document.addEventListener("DOMContentLoaded", function () {
  // Scroll animation logic
  const blocks = document.querySelectorAll(".timeline-block");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  blocks.forEach(block => observer.observe(block));

  // Read more toggle logic
  const buttons = document.querySelectorAll(".read-more-btn");
  buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const moreText = btn.previousElementSibling;
    const timelineBlock = btn.closest('.timeline-block');

    moreText.classList.toggle("expanded");
    timelineBlock.classList.toggle("expanded");

    if (btn.textContent === "Read more") {
      btn.textContent = "Read less";
    } else {
      btn.textContent = "Read more";
    }
  });
});
});

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".scroll-inner-top").forEach(button => {
      button.addEventListener("click", () => {
        const container = button.closest(".more-text");
        if (container) {
          container.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });
  });