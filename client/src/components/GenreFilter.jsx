import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function GenreFilter({ value, onChange }) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    async function loadGenres() {
      try {
        const res = await fetch(`${API_URL}/genres`)
        if (!res.ok) throw new Error('Failed to load genres')
        setGenres(await res.json())
      } catch {
        setGenres([])
      }
    }
    loadGenres()
  }, [])

  return (
    <select
      className="genre-filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  )
}