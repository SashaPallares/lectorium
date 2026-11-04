import React, { useState, useEffect } from "react";
import "./BookForm.css";

function BookForm({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState("read");

  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false); // 🪄 Bandera para evitar que se dispare la búsqueda al seleccionar

  useEffect(() => {
    // Si estamos seleccionando un libro mediante el click, ignoramos este efecto
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }

    if (title.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const query = title.trim().replace(/\s+/g, "+");
        const response = await fetch(
          `https://openlibrary.org/search.json?title=${query}&limit=5`,
        );
        const data = await response.json();

        if (data.docs && data.docs.length > 0) {
          setSuggestions(data.docs);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error buscando sugerencias:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [title]);

  const handleSelectBook = (book) => {
    setIsSelecting(true); // 🛑 Activamos el freno antes de cambiar el título
    setTitle(book.title);

    if (book.author_name && book.author_name.length > 0) {
      setAuthor(book.author_name[0]);
    } else {
      setAuthor("Autor desconocido");
    }

    if (book.cover_i) {
      setCover(`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`);
    } else {
      setCover(
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
      );
    }

    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newBook = {
      id: Date.now(),
      title,
      author: author || "Autor desconocido",
      cover:
        cover ||
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
      rating: status === "read" ? Number(rating) : 0,
      status: status,
    };

    onAddBook(newBook);

    setTitle("");
    setAuthor("");
    setCover("");
    setRating(5);
    setStatus("read");
    setSuggestions([]);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Añadir libro al diario</h3>

      <div className="form-group search-container">
        <label>Título del libro</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Escribí un título..."
          required
          autoComplete="off"
        />

        {isSearching && (
          <span className="searching-loader">Buscando sugerencias...</span>
        )}

        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((item, index) => (
              <li key={index} onMouseDown={() => handleSelectBook(item)}>
                <strong>{item.title}</strong>
                {item.author_name && (
                  <span className="suggestion-author">
                    {" "}
                    — {item.author_name[0]}
                  </span>
                )}
                {item.first_publish_year && (
                  <span className="suggestion-year">
                    {" "}
                    ({item.first_publish_year})
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="form-group">
        <label>Autor / Autora</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Se autocompleta al elegir la opción"
        />
      </div>

      <div className="form-group">
        <label>Estado en mi biblioteca</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="read">✓ Leído (Ya lo terminé)</option>
          <option value="to-read">📖 Por leer (Pendiente / Wishlist)</option>
        </select>
      </div>

      {status === "read" && (
        <div className="form-group">
          <label>Calificación (1 a 5 estrellas)</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">★☆☆☆☆ (1)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="5">★★★★★ (5)</option>
          </select>
        </div>
      )}

      <button type="submit" className="submit-btn">
        Guardar en mi Diario
      </button>
    </form>
  );
}

export default BookForm;
