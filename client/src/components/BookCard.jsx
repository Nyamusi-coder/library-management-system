import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} className="book-card">
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>
      {book.genre && <span className="book-card__genre">{book.genre.name}</span>}
      <p className="book-card__copies">{book.totalCopies} copies</p>
    </Link>
  )
}