async function getCatFact() {
  try {
    const response = await fetch('https://catfact.ninja/fact?max_length=140', {
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();
    document.getElementById('fact').textContent = data.fact;
  } catch (error) {
    document.getElementById('fact').textContent = 'Error fetching cat fact.';
    console.error(error);
  }
}
const resultsDiv = document.getElementById("results");

const queries = [
  "indie graphic novel",
  "independent comic",
  "self-published graphic novel"
];

async function fetchAndPreloadBook() {
  try {
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(randomQuery)}`);
    const data = await response.json();

    const validBooks = data.docs.filter(book => book.cover_i && book.title);
    if (validBooks.length === 0) throw new Error("No valid indie graphic novels found.");

    const book = validBooks[Math.floor(Math.random() * validBooks.length)];
    const imgSrc = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

    // Preload image
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgSrc;
      img.onload = resolve;
      img.onerror = reject;
    });

    return {
      title: book.title,
      imgSrc
    };
  } catch (err) {
    console.error("Error fetching or preloading book:", err);
    return null;
  }
}

function displayBook(book) {
  resultsDiv.innerHTML = `
    <div class="book">
      <img src="${book.imgSrc}" alt="Cover of ${book.title}">
      <p>${book.title}</p>
    </div>
  `;
}


async function showBooksLoop() {
  while (true) {
    resultsDiv.textContent = "Loading indie graphic novel...";

    const book = await fetchAndPreloadBook();
    if (book) {
      displayBook(book);
      await new Promise(resolve => setTimeout(resolve, 10000));
    } else {
      resultsDiv.textContent = "Failed to load a graphic novel.";
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

showBooksLoop();
