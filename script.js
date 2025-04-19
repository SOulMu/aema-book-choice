let adminPassword = "bookadmin123";
let bookList = [];

// Load books from localStorage when the page loads
window.onload = () => {
  const savedBooks = localStorage.getItem("bookList");
  if (savedBooks) {
    bookList = JSON.parse(savedBooks);
    updateScrollView();
  }
};

document.getElementById("adminBtn").onclick = () => {
  document.getElementById("adminPanel").classList.toggle("hidden");
};

function unlockAdmin() {
  const input = document.getElementById("adminPass").value;
  if (input === adminPassword) {
    document.getElementById("adminContent").classList.remove("hidden");
  } else {
    alert("Incorrect password!");
  }
}

async function addBook() {
  const title = document.getElementById("bookTitle").value;
  if (title) {
    const data = await fetchFromAPI(title);
    if (data) {
      bookList.push(data);
      saveToLocalStorage();
      updateScrollView();
    }
  }
}

document.getElementById("bulkUpload").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const text = await file.text();
  const titles = text.split(/\r?\n/);
  for (let title of titles) {
    const data = await fetchFromAPI(title);
    if (data) {
      bookList.push(data);
    }
  }
  saveToLocalStorage();
  updateScrollView();
});

function saveToLocalStorage() {
  localStorage.setItem("bookList", JSON.stringify(bookList));
}

function updateScrollView() {
  const scrollDiv = document.getElementById("scrolling-books");
  scrollDiv.innerHTML = "";
  bookList.forEach(book => {
    scrollDiv.innerHTML += `<div><img src="${book.cover}" width="100"/><br>${book.title}</div>`;
  });
}

async function fetchFromAPI(title) {
  const apiKey = "AIzaSyAVGNIaBoXiPMm5nSsnIYTyBzuprmMnKPc"; // <-- Replace this
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${apiKey}`);
  const json = await res.json();
  if (json.items && json.items.length > 0) {
    const book = json.items[0].volumeInfo;
    return {
      title: book.title,
      cover: book.imageLinks?.thumbnail || "",
      description: book.description || "No description available."
    };
  }
  return null;
}

async function fetchRecommendations() {
  const query = document.getElementById("userPrompt").value.toLowerCase();
  if (!query) return;
  const matches = bookList
    .filter(book => (book.title + " " + book.description).toLowerCase().includes(query))
    .slice(0, 3);

  const container = document.getElementById("recommendations");
  container.innerHTML = "";
  matches.forEach(book => {
    container.innerHTML += `
      <div style="margin: 20px; padding: 10px; border: 1px solid #58a6ff;">
        <h3 style="color:#58a6ff;">${book.title}</h3>
        <img src="${book.cover}" width="120" /><br/>
        <p>${book.description}</p>
      </div>
    `;
  });
}
