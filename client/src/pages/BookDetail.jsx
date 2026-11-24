import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

export default function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadBook() {
      setLoading(true)
      setError(null)
      setBook(null)
      try {
        const res = await fetch(`${API_URL}/books/${id}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        const text = await res.text()
        setBook(text ? JSON.parse(text) : null)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadBook()
    return () => controller.abort()
  }, [id])

  return (
    <main className="container">
      <Link to="/" className="back-link">
        &larr; Back to catalog
      </Link>

      {loading && <p className="status-message">Loading book...</p>}

      {error && (
        <p className="status-message status-message--error">
          Could not load this book. Is the server running? ({error})
        </p>
      )}

      {!loading && !error && !book && (
        <p className="status-message">Book not found.</p>
      )}

      {book && (
        <article className="book-detail">
          <h1 className="book-detail__title">{book.title}</h1>
          <p className="book-detail__author">by {book.author}</p>

          {book.genre && (
            <span className="book-card__genre">{book.genre.name}</span>
          )}
          {book.genre?.description && (
            <p className="book-detail__genre-description">
              {book.genre.description}
            </p>
          )}

          <dl className="book-detail__facts">
            <div>
              <dt>ISBN</dt>
              <dd>{book.isbn}</dd>
            </div>
            <div>
              <dt>Copies</dt>
              <dd>{book.totalCopies}</dd>
            </div>
          </dl>
        </article>
      )}
    </main>
  )
}