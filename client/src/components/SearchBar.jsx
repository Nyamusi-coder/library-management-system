import { useEffect, useState } from 'react'

export default function SearchBar({ onSearch, delay = 400 }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim())
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay, onSearch])

  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search by title or author..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}