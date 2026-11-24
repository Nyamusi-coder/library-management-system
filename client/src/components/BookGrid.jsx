import { useEffect, useState } from 'react'
import BookCard from './BookCard'

const API_URL = import.meta.env.VITE_API_URL

export default function BookGrid({ genreId = '', search = '' }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadBooks() {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({ limit: '100' })
        if (genreId) params.set('genreId', genreId)
        if (search) params.set('search', search)

        const res = await fetch(`${API_URL}/books?${params}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        const json = await res.json()
        setBooks(json.data)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadBooks()
    return () => controller.abort()
  }, [genreId, search])

  if (loading) return <p className="status-message">Loading books...</p>

  if (error) {
    return (
      <p className="status-message status-message--error">
        Could not load books. Is the server running? ({error})
      </p>
    )
  }

  if (books.length === 0) {
    return <p className="status-message">No books found. Try a different search or genre.</p>
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}