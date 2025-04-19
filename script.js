let books = JSON.parse(localStorage.getItem('books')) || [];
const adminPassword = "dream123";

function toggleAdmin() {
  document.getElementById("adminPanel").classList.toggle("hidden");
}

function loginAdmin() {
  const input = document.getElementById("adminPassword").value;
  if (input === adminPassword) {
    document.getElementById("adminForm").classList.remove("hidden");
  } else {
    alert("Wrong password");
  }
}

function addBook() {
  const title = document.getElementById("bookTitle").value;
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then(res => res.json())
    .then(data => {
      const book = {
        title: title,
        description: data.items?.[0]?.volumeInfo?.description || "No description",
        image: data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || ""
      };
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
      alert("Book added!");
    });
}

function uploadBooks() {
  const fileInput = document.getElementById("bulkUpload");
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    books = books.concat(data);
    localStorage.setItem('books', JSON.stringify(books));
    alert("Books uploaded!");
  };
  reader.readAsText(fileInput.files[0]);
}

function searchBooks() {
  const prompt = document.getElementById("userPrompt").value.toLowerCase();
  const results = books.filter(book => 
    book.title.toLowerCase().includes(prompt) || 
    book.description.toLowerCase().includes(prompt)
  ).slice(0, 3);

  const container = document.getElementById("results");
  container.innerHTML = "";
  if (results.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(book => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      ${book.image ? `<img src="${book.image}" alt="${book.title}" />` : ""}
    `;
    container.appendChild(card);
  });
}
