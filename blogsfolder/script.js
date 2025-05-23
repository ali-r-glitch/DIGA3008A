document.addEventListener("DOMContentLoaded", () => {
  const source = document.getElementById("blog-source");
  const typedBlog = document.getElementById("typed-blog");
  source.style.display = "none";

  const elements = Array.from(source.children);
  let index = 0;

  function typeParagraph(element, callback) {
    const p = document.createElement("p");
    typedBlog.appendChild(p);
    const text = element.textContent;
    let i = 0;

    function typeChar() {
      if (i < text.length) {
        p.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 1); // Adjust speed
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

    if (el.tagName.toLowerCase() === "p") {
      typeParagraph(el, showNext); // Type paragraphs
    } else {
      const clone = el.cloneNode(true); // Instantly show other elements
      typedBlog.appendChild(clone);
      setTimeout(showNext, 300); // Delay before next element
    }
  }

  showNext();
});