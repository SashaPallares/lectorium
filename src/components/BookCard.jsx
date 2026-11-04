import React from "react";
import "./BookCard.css";

function BookCard({ id, title, author, cover, rating, status, onDelete }) {
  return (
    <div className="book-card">
      <div className="book-cover-wrapper">
        <img
          src={cover}
          alt={`Portada de ${title}`}
          className="book-cover-img"
        />

        {/* Badge de estado sutil arriba */}
        {status === "read" && (
          <span className="book-status-badge">✓ Leído</span>
        )}
      </div>

      {/* Bloque inferior de información y acciones */}
      <div className="book-info">
        <h3 className="book-title" title={title}>
          {title}
        </h3>
        <p className="book-author" title={author}>
          {author}
        </p>

        <div className="book-footer-row">
          {rating > 0 ? (
            <div className="book-rating" title={`${rating} de 5 estrellas`}>
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </div>
          ) : (
            <span className="book-pending-label">Pendiente</span>
          )}

          {/* Botón de eliminar integrado abajo, limpio y libre de conflictos */}
          <button
            className="delete-book-link"
            onClick={() => onDelete(id)}
            title="Eliminar del diario"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
