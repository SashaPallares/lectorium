import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";

function App() {
  const [activeTab, setActiveTab] = useState("read");

  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("lectorium_books");
    if (savedBooks) {
      return JSON.parse(savedBooks);
    }
    return [
      {
        id: 1,
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        cover:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
        rating: 5,
        status: "read",
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        cover:
          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
        rating: 0,
        status: "to-read",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("lectorium_books", JSON.stringify(books));
  }, [books]);

  const handleAddBook = (newBook) => {
    setBooks([newBook, ...books]);
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const filteredBooks = books.filter((book) => book.status === activeTab);

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main
        className="app-container"
        style={{ marginTop: "30px", marginBottom: "50px" }}
      >
        <h2
          style={{
            color: "var(--text-primary)",
            marginBottom: "20px",
            fontFamily: "Georgia, serif",
          }}
        >
          {activeTab === "read"
            ? "Cuaderno de Lecturas (Leídos)"
            : "Lista de Pendientes (Por leer)"}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <BookForm onAddBook={handleAddBook} />

          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3
              style={{
                color: "var(--text-primary)",
                marginBottom: "15px",
                fontFamily: "Georgia, serif",
                fontSize: "1.1rem",
              }}
            >
              {activeTab === "read" ? "Libros Leídos" : "Próximas Lecturas"} (
              {filteredBooks.length})
            </h3>

            {filteredBooks.length === 0 ? (
              <p style={{ fontStyle: "italic" }}>
                {activeTab === "read"
                  ? "Aún no hay libros leídos en tu diario."
                  : "No tenés libros pendientes en tu lista de deseos."}
              </p>
            ) : (
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    cover={book.cover}
                    rating={book.rating}
                    status={book.status}
                    onDelete={handleDeleteBook}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
