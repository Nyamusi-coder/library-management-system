import { useState } from 'react'
import BookGrid from '../components/BookGrid'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'

export default function HomePage() {
  const [genreId, setGenreId] = useState('')
  const [search, setSearch] = useState('')

  return (
    <main className="container">
      <h1>Library Catalog</h1>

      <div className="filters">
        <SearchBar onSearch={setSearch} />
        <GenreFilter value={genreId} onChange={setGenreId} />
      </div>

      <BookGrid genreId={genreId} search={search} />
    </main>
  )
}