document.addEventListener("DOMContentLoaded", () => {
  const source = document.getElementById("blog-source");
  const typedBlog = document.getElementById("typed-blog");
  source.style.display = "none";

  const elements = Array.from(source.children);
  let index = 0;

  function typeElement(element, callback) {
    const clone = document.createElement(element.tagName);
    typedBlog.appendChild(clone);
    const text = element.textContent;
    let i = 0;

    function typeChar() {
      if (i < text.length) {
        clone.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 10); // adjust typing speed here
      } else {
        callback();
      }
    }

    typeChar();
  }

  function showNext() {
    if (index >= elements.length) return;

    const el = elements[index];
    index++;

    const tag = el.tagName.toLowerCase();
    if (tag === "h1" || tag === "h2" || tag === "h3") {
      typeElement(el, showNext); // animate only headings
    } else {
      const clone = el.cloneNode(true);
      typedBlog.appendChild(clone);
      setTimeout(showNext, 200); // delay for other content
    }
  }

  showNext();
});
