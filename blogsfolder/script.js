    document.addEventListener("DOMContentLoaded", () => {
    const source = document.getElementById("blog-source").innerText.trim();
    const typedBlog = document.getElementById("typed-blog");
    document.getElementById("blog-source").style.display = "none";
    let i = 0;
    const speed = 0.0001; //(ms per character)

    function type() {
      if (i < source.length) {
        typedBlog.textContent += source.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  });
