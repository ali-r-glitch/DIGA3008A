    document.addEventListener("DOMContentLoaded", () => {
    const source = document.getElementById("blog-source").innerText.trim();
    const typedBlog = document.getElementById("typed-blog");

    let i = 0;
    const speed = 1000; //(ms per character)

    function type() {
      if (i < source.length) {
        typedBlog.textContent += source.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  });
