
import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function Mechanics({ onBack }) {
  const [mechanics, setMechanics] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMechanics() {
      setLoading(true)
      setError('')

      const { data, error } = await supabase
        .from('mechanics')
        .select('id, full_name, phone, location, specialization, experience_years, status')
        .order('full_name')

      if (error) {
        setError(error.message)
      } else {
        setMechanics(data || [])
      }

      setLoading(false)
    }

    loadMechanics()
  }, [])

  const filtered = mechanics.filter((mechanic) => {
    const text = [
      mechanic.full_name,
      mechanic.location,
      mechanic.specialization
    ].filter(Boolean).join(' ').toLowerCase()

    return text.includes(search.toLowerCase())
  })

  return (
    <main style={{
      maxWidth: 900,
      margin: '0 auto',
      padding: 20,
      color: 'var(--text-color, #172033)'
    }}>
      <button onClick={onBack} style={{ padding: '10px 16px', cursor: 'pointer' }}>
        ← Back
      </button>

      <h1>Find a Mechanic</h1>
      <p>Find automotive professionals and contact them directly.</p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search name, location or specialty..."
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: 13,
          margin: '12px 0 20px',
          borderRadius: 8,
          border: '1px solid #ccd2dc'
        }}
      />

      {loading && <p>Loading mechanics...</p>}

      {error && (
        <p style={{ color: '#c62828' }}>
          Could not load mechanics: {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p>No mechanics found yet. Try another search or add mechanics to your database.</p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16
      }}>
        {filtered.map((mechanic) => (
          <article key={mechanic.id} style={{
            border: '1px solid #dce1e8',
            borderRadius: 12,
            padding: 18,
            background: 'var(--card-background, #fff)'
          }}>
            <h3>{mechanic.full_name || 'Mechanic'}</h3>
            <p><strong>Specialty:</strong> {mechanic.specialization || 'General mechanic'}</p>
            <p><strong>Location:</strong> {mechanic.location || 'Not provided'}</p>
            <p><strong>Experience:</strong> {mechanic.experience_years ?? 'Not specified'}{mechanic.experience_years != null ? ' years' : ''}</p>
            <p><strong>Status:</strong> {mechanic.status || 'Not specified'}</p>

            {mechanic.phone ? (
              <a
                href={`tel:${mechanic.phone}`}
                style={{
                  display: 'inline-block',
                  padding: '10px 16px',
                  marginTop: 8,
                  borderRadius: 8,
                  background: '#147d45',
                  color: '#fff',
                  textDecoration: 'none'
                }}
              >
                Call Mechanic
              </a>
            ) : (
              <p>Phone number not available</p>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}