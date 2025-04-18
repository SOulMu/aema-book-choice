import React, { useState } from "react";

const genres = ["Fiction", "Non-fiction", "Romance", "Mystery", "Sci-fi"];

const App = () => {
  const [adminMode, setAdminMode] = useState(false);
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", genre: "Fiction" });
  const [userPreferences, setUserPreferences] = useState({ genre1: "", genre2: "", genre3: "" });
  const [suggestedBooks, setSuggestedBooks] = useState([]);

  const addBook = () => {
    if (newBook.title.trim()) {
      setBooks([...books, newBook]);
      setNewBook({ title: "", genre: "Fiction" });
    }
  };

  const suggestBooks = () => {
    const matches = books.filter(
      (book) =>
        book.genre === userPreferences.genre1 ||
        book.genre === userPreferences.genre2 ||
        book.genre === userPreferences.genre3
    );
    setSuggestedBooks(matches);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Book Recommendation Website</h1>
      <button onClick={() => setAdminMode(!adminMode)}>
        {adminMode ? "Switch to User Mode" : "Switch to Admin Mode"}
      </button>

      {adminMode ? (
        <div>
          <h2>Admin Panel</h2>
          <input
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <select
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button onClick={addBook}>Add Book</button>
          <ul>
            {books.map((book, idx) => (
              <li key={idx}>
                {book.title} ({book.genre})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Find Books</h2>
          <select
            value={userPreferences.genre1}
            onChange={(e) => setUserPreferences({ ...userPreferences, genre1: e.target.value })}
          >
            <option value="">Select First Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            value={userPreferences.genre2}
            onChange={(e) => setUserPreferences({ ...userPreferences, genre2: e.target.value })}
          >
            <option value="">Select Second Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            value={userPreferences.genre3}
            onChange={(e) => setUserPreferences({ ...userPreferences, genre3: e.target.value })}
          >
            <option value="">Select Third Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button onClick={suggestBooks}>Suggest Books</button>
          <ul>
            {suggestedBooks.map((book, idx) => (
              <li key={idx}>{book.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
