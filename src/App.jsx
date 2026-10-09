
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './App.css'
import Mechanics from './Mechanics'
const formGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 12,
  marginTop: 20,
  marginBottom: 20,
}

const partsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
  gap: 16,
  marginTop: 20,
}

const accountOptions = [
  {
    type: 'Car Owner',
    description: 'Manage your car and find help',
    icon: '🚗',
  },
  {
    type: 'Mechanic',
    description: 'Connect with customers',
    icon: '🔧',
  },
  {
    type: 'Spare Seller',
    description: 'List and sell car parts',
    icon: '⚙️',
  },
]

const dashboardDetails = {
  owner: {
    label: 'CAR OWNER',
    heading: 'Your car care starts here.',
    description: 'Find support, explore parts, and keep your car moving.',
    cards: [
      ['🚗', 'My Cars', 'Add and manage your vehicles.', 'Open'],
      ['🔧', 'Find a Mechanic', 'Connect with automotive professionals.', 'Find Mechanic'],
      ['⚙️', 'Spare Parts', 'Discover parts for your vehicle.', 'Browse Parts'],
      ['✚', 'First Aid', 'Learn about common car problems.', 'Get Help'],
      ['📋', 'Service Requests', 'Keep track of service requests.', 'View Requests'],
    ],
  },
  mechanic: {
    label: 'MECHANIC',
    heading: 'Welcome to your workspace.',
    description: 'Manage your customers and service requests.',
    cards: [
      ['🔧', 'Service Requests', 'See customers who need your help.', 'View Requests'],
      ['👤', 'My Profile', 'Manage your mechanic information.', 'Open Profile'],
      ['⭐', 'My Reviews', 'See your customer feedback.', 'View Reviews'],
    ],
  },
  seller: {
    label: 'SPARE SELLER',
    heading: 'Grow your spare parts business.',
    description: 'Showcase your automotive inventory.',
    cards: [
      ['＋', 'Add Spare Part', 'Create a new part listing.', 'Add Part'],
      ['⚙️', 'My Spare Parts', 'Manage your listed parts.', 'View Parts'],
      ['📦', 'Orders', 'Keep track of customer orders.', 'View Orders'],
    ],
  },
}

function Splash() {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="garage-mark">SG</div>
        <h1>SAFE GARAGE</h1>
        <div className="gold-line" />
        <p>SMARTER CAR CARE. SAFER ROADS.</p>
        <div className="loading-line"><span /></div>
      </div>
    </div>
  )
}

function Welcome({ setScreen, setMessage }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-overlay" />
      <div className="welcome-content">
        <div className="brand-small">SAFE GARAGE</div>
        <div className="welcome-badge">YOUR AUTOMOTIVE CONNECTION</div>
        <h1>Your Car.<br />Your Mechanic.<br />Your Garage.</h1>
        <p>
          Connect with mechanics, discover spare parts, get guidance
          when your car needs attention, and keep moving with Safe Garage.
        </p>
        <div className="welcome-actions">
          <button className="primary-action" onClick={() => {
            setMessage('')
            setScreen('register')
          }}>
            Create Account
          </button>
          <button className="secondary-action" onClick={() => {
            setMessage('')
            setScreen('login')
          }}>
            Login
          </button>
        </div>
        <div className="welcome-features">
          <span>Mechanics</span>
          <span>Spare Parts</span>
          <span>First Aid</span>
        </div>
      </div>
    </div>
  )
}

function Register({
  registerName, setRegisterName,
  registerPhone, setRegisterPhone,
  registerEmail, setRegisterEmail,
  registerPassword, setRegisterPassword,
  confirmPassword, setConfirmPassword,
  accountType, setAccountType,
  busy, message, handleRegister, setScreen, setMessage,
}) {
  return (
    <div className="page-shell">
      <div className="form-card">
        <div className="form-brand">SAFE GARAGE</div>
        <h2>Create your account</h2>
        <p className="form-subtitle">Join our automotive community.</p>

        <input
          type="text"
          placeholder="Full name"
          autoComplete="name"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone number"
          autoComplete="tel"
          value={registerPhone}
          onChange={(e) => setRegisterPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create password"
          autoComplete="new-password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <h3>Choose account type</h3>
        <div className="account-options">
          {accountOptions.map((option) => (
            <button
              key={option.type}
              type="button"
              className={accountType === option.type
                ? 'account-option active'
                : 'account-option'}
              onClick={() => setAccountType(option.type)}
            >
              <strong>{option.icon} {option.type}</strong>
              <small>{option.description}</small>
            </button>
          ))}
        </div>

        <button
          className="main-form-button"
          onClick={handleRegister}
          disabled={busy}
        >
          {busy ? 'Creating account...' : 'Create Safe Garage Account'}
        </button>

        {message && <div className="message-box">{message}</div>}

        <p className="switch-text">Already have an account?</p>
        <button className="link-button" onClick={() => {
          setMessage('')
          setScreen('login')
        }}>
          Login
        </button>
        <button className="back-button" onClick={() => {
          setMessage('')
          setScreen('welcome')
        }}>
          ← Back to Safe Garage
        </button>
      </div>
    </div>
  )
}

function Login({
  loginEmail, setLoginEmail,
  loginPassword, setLoginPassword,
  busy, message, handleLogin, setScreen, setMessage,
}) {
  return (
    <div className="page-shell">
      <div className="form-card login-card">
        <div className="form-brand">SAFE GARAGE</div>
        <h2>Welcome back</h2>
        <p className="form-subtitle">Log in to continue to your account.</p>

        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button
          className="main-form-button"
          onClick={handleLogin}
          disabled={busy}
        >
          {busy ? 'Logging in...' : 'Login to Safe Garage'}
        </button>

        {message && <div className="message-box">{message}</div>}

        <p className="switch-text">Don't have an account?</p>
        <button className="link-button" onClick={() => {
          setMessage('')
          setScreen('register')
        }}>
          Create Account
        </button>
        <button className="back-button" onClick={() => {
          setMessage('')
          setScreen('welcome')
        }}>
          ← Back to Safe Garage
        </button>
      </div>
    </div>
  )
}

function DashboardHeader({ busy, handleLogout }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-logo">
        <span className="garage-mark small-mark">SG</span>
        SAFE GARAGE
      </div>
      <button
        className="logout-button"
        onClick={handleLogout}
        disabled={busy}
      >
        {busy ? 'Please wait...' : 'Logout'}
      </button>
    </header>
  )
}

function GarageHero({ openFeature }) {
  return (
    <section className="garage-hero">
      <div className="garage-hero-text">
        <span className="hero-tag">YOUR CAR CARE HUB</span>
        <h1>Every journey deserves a safer ride.</h1>
        <p>
          Find mechanics, discover spare parts, and get guidance
          when your car needs attention.
        </p>
        <button className="hero-button" onClick={() => openFeature('First Aid')}>
          Explore First Aid →
        </button>
      </div>
      <div className="garage-hero-image">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
          alt="Modern car"
        />
      </div>
    </section>
  )
}

function DashboardCard({ icon, title, description, button, onClick, extraClass = '' }) {
  return (
    <div className={`dashboard-card ${extraClass}`}>
      <div className="card-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClick}>{button}</button>
    </div>
  )
}

function FeatureMessage({ title, children }) {
  return (
    <section className="form-card" style={{ width: '100%', maxWidth: 900 }}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function FirstAidContent({ profile }) {
  return (
    <FeatureMessage title="Safe Garage First Aid">
      <p>
        These are basic safety steps, not a substitute for a qualified
        mechanic. If the vehicle is unsafe, stop in a safe place and
        keep away from moving traffic.
      </p>

      <div style={{ marginTop: 20 }}>
        <h3>1. Engine overheating</h3>
        <p>
          Stop somewhere safe and switch off the engine. Never open a hot
          radiator cap. Allow the engine to cool and seek professional help
          if the temperature stays high or coolant is leaking.
        </p>

        <h3>2. Flat tyre</h3>
        <p>
          Park on firm, level ground away from traffic, turn on hazard
          lights, and use the parking brake. Only change a tyre if the
          location is safe and you know how. Otherwise, request assistance.
        </p>

        <h3>3. Weak or dead battery</h3>
        <p>
          Do not touch exposed wiring. Jump-start only if you know the
          correct procedure for your vehicle; otherwise call a mechanic.
        </p>

        <h3>4. Brake problems</h3>
        <p>
          If the brakes feel weak, the pedal sinks, or a brake warning
          appears, stop safely and do not continue driving. Arrange
          professional assistance.
        </p>

        <h3>5. Warning lights</h3>
        <p>
          If the oil-pressure or engine-temperature warning is red, pull
          over safely and switch off the engine. Check the vehicle manual
          and contact a mechanic.
        </p>

        <h3>6. Smoke or fuel smell</h3>
        <p>
          Stop safely, switch off the engine, and get everyone away from
          the vehicle if there is smoke, a strong fuel smell, or fire risk.
          Do not restart it; seek professional help.
        </p>

        <p style={{ marginTop: 20 }}>
          <strong>Next stage:</strong> connect illustrated guides and videos
          through Safe Garage media storage.
        </p>

        {profile?.phone && (
          <p>
            <strong>Emergency contact:</strong>{' '}
            <a href={`tel:${profile.phone}`}>Call {profile.phone}</a>
          </p>
        )}
      </div>
    </FeatureMessage>
  )
}

function SparePartsContent({
  profile,
  activeFeature,
  parts,
  partsLoading,
  partsError,
  partSearch,
  setPartSearch,
  partForm,
  setPartForm,
  savingPart,
  fetchParts,
  handleAddPart,
  setActiveFeature,
  setPartsError,
}) {
  const isSeller = profile?.user_type === 'Spare Seller'
  const isMyParts = activeFeature === 'My Spare Parts'

  const filteredParts = parts.filter((part) => {
    const search = partSearch.trim().toLowerCase()
    if (!search) return true

    return [
      part.part_name,
      part.car_make,
      part.car_model,
      part.description,
    ].filter(Boolean).some((value) =>
      String(value).toLowerCase().includes(search)
    )
  })

  return (
    <div style={{ width: '100%' }}>
      {activeFeature === 'Add Spare Part' && isSeller && (
        <FeatureMessage title="Add a Spare Part">
          <p>
            Enter the part details below. The listing will be saved to
            your Safe Garage spare-parts table.
          </p>

          <div style={formGridStyle}>
            <input
              placeholder="Part name *"
              value={partForm.part_name}
              onChange={(e) => setPartForm((old) => ({
                ...old, part_name: e.target.value,
              }))}
            />
            <input
              placeholder="Car make, e.g. Toyota *"
              value={partForm.car_make}
              onChange={(e) => setPartForm((old) => ({
                ...old, car_make: e.target.value,
              }))}
            />
            <input
              placeholder="Car model, e.g. Premio"
              value={partForm.car_model}
              onChange={(e) => setPartForm((old) => ({
                ...old, car_model: e.target.value,
              }))}
            />
            <input
              type="number"
              min="0"
              step="1"
              placeholder="Price in UGX *"
              value={partForm.price}
              onChange={(e) => setPartForm((old) => ({
                ...old, price: e.target.value,
              }))}
            />
            <input
              placeholder="Quantity available *"
              value={partForm.quantity}
              onChange={(e) => setPartForm((old) => ({
                ...old, quantity: e.target.value,
              }))}
            />
            <textarea
              placeholder="Description, condition, or other details"
              value={partForm.description}
              onChange={(e) => setPartForm((old) => ({
                ...old, description: e.target.value,
              }))}
              rows={4}
              style={{ gridColumn: '1 / -1' }}
            />
          </div>

          {partsError && <div className="message-box">{partsError}</div>}
          <button
            className="main-form-button"
            onClick={handleAddPart}
            disabled={savingPart}
          >
            {savingPart ? 'Saving part...' : 'Save Spare Part'}
          </button>
        </FeatureMessage>
      )}

      {(activeFeature === 'Spare Parts' || isMyParts) && (
        <FeatureMessage title={isMyParts ? 'My Spare Parts' : 'Browse Spare Parts'}>
          <p>
            {isMyParts
              ? 'Manage and review your saved listings.'
              : 'Search available parts by name, car make, or model.'}
          </p>

          <input
            type="search"
            placeholder="Search parts, Toyota, Premio..."
            value={partSearch}
            onChange={(e) => setPartSearch(e.target.value)}
            style={{ width: '100%', margin: '15px 0' }}
          />

          <button
            className="main-form-button"
            onClick={fetchParts}
            disabled={partsLoading}
          >
            {partsLoading ? 'Refreshing...' : 'Refresh Parts'}
          </button>

          {isSeller && (
            <button
              className="back-button"
              onClick={() => {
                setPartsError('')
                setActiveFeature('Add Spare Part')
              }}
            >
              + Add a Spare Part
            </button>
          )}

          {partsError && (
            <div className="message-box" style={{ marginTop: 15 }}>
              {partsError}
            </div>
          )}

          {partsLoading && <p>Loading spare parts...</p>}

          {!partsLoading && !partsError && filteredParts.length === 0 && (
            <p style={{ marginTop: 20 }}>
              No matching spare parts were found. Try another search or refresh.
            </p>
          )}

          <div style={partsGridStyle}>
            {filteredParts.map((part) => (
              <article
                key={part.id}
                className="dashboard-card"
                style={{ textAlign: 'left' }}
              >
                <div className="card-icon">⚙️</div>
                <h2>{part.part_name || 'Unnamed part'}</h2>
                <p>
                  <strong>Vehicle:</strong>{' '}
                  {[part.car_make, part.car_model].filter(Boolean).join(' ') ||
                    'Not specified'}
                </p>
                <p>
                  <strong>Price:</strong>{' '}
                  {part.price == null
                    ? 'Price not listed'
                    : `UGX ${Number(part.price).toLocaleString('en-UG')}`}
                </p>
                <p><strong>Quantity:</strong> {part.quantity || 'Ask seller'}</p>
                {part.description && <p>{part.description}</p>}
                <p><strong>Status:</strong> {part.status || 'available'}</p>
              </article>
            ))}
          </div>
        </FeatureMessage>
      )}
    </div>
  )
}

function FeatureContent(props) {
  const { activeFeature, profile } = props

  if (
    activeFeature === 'Spare Parts' ||
    activeFeature === 'My Spare Parts' ||
    activeFeature === 'Add Spare Part'
  ) {
    return <SparePartsContent {...props} />
  }

  if (activeFeature === 'First Aid') {
    return <FirstAidContent profile={profile} />
  }

  if (activeFeature === 'My Cars') {
    return (
      <FeatureMessage title="My Cars">
        <p>
          This screen is ready for vehicle records. Before saving vehicles,
          we must match the form and owner relationship to your existing
          Supabase <code>cars</code> table.
        </p>
        <p>The next database step is to connect vehicle registration and listing.</p>
      </FeatureMessage>
    )
  }

  if (activeFeature === 'Find a Mechanic') {
    return (
      <FeatureMessage title="Find a Mechanic">
        <p>Find a mechanic by name, location, or specialization.</p>
        <p>
          Your mechanics table must be connected to this screen so it can
          show real mechanic details and working phone links.
        </p>
      </FeatureMessage>
    )
  }

  if (activeFeature === 'Service Requests') {
    return (
      <FeatureMessage title="Service Requests">
        <p>
          This is where car owners will request assistance and mechanics
          will review jobs.
        </p>
        <p>
          We will connect the form and request list to your existing
          service-requests table after checking its exact columns.
        </p>
      </FeatureMessage>
    )
  }

  if (activeFeature === 'My Profile') {
    return (
      <FeatureMessage title="My Profile">
        <p><strong>Name:</strong> {profile?.full_name || 'Not provided'}</p>
        <p><strong>Account type:</strong> {profile?.user_type || 'Not provided'}</p>
        <p><strong>Phone:</strong> {profile?.phone || 'Not provided in profile record'}</p>
        <p>
          Your profile is loaded from Supabase. We can add editable profile
          fields once the relevant database columns are confirmed.
        </p>
      </FeatureMessage>
    )
  }

  if (activeFeature === 'My Reviews') {
    return (
      <FeatureMessage title="My Reviews">
        <p>
          Customer reviews will appear here after we connect the reviews
          table and its relationship to mechanics and customers.
        </p>
      </FeatureMessage>
    )
  }

  if (activeFeature === 'Orders') {
    return (
      <FeatureMessage title="Orders">
        <p>
          This section will display customer orders once the order workflow
          and database connection are added.
        </p>
      </FeatureMessage>
    )
  }

  return (
    <FeatureMessage title={activeFeature || 'Safe Garage'}>
      <p>This section is ready for its next development step.</p>
    </FeatureMessage>
  )
}

function Dashboard({
  type,
  profile,
  busy,
  message,
  setMessage,
  handleLogout,
  activeFeature,
  openFeature,
  backToDashboard,
  parts,
  partsLoading,
  partsError,
  partSearch,
  setPartSearch,
  partForm,
  setPartForm,
  savingPart,
  fetchParts,
  handleAddPart,
  setActiveFeature,
  setPartsError,
}) {
  const info = dashboardDetails[type]

  if (!info) {
    return (
      <div className="page-shell">
        <div className="form-card">
          <h2>Account type not recognised</h2>
          <p>Please log out and log in again.</p>
          <button className="main-form-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <DashboardHeader busy={busy} handleLogout={handleLogout} />

      <main className="dashboard-content">
        {activeFeature ? (
          <>
            <button
              className="back-button"
              onClick={backToDashboard}
              style={{ marginBottom: 20 }}
            >
              ← Back to Dashboard
            </button>

            {message && (
              <div className="message-box">
                {message}{' '}
                <button className="link-button" onClick={() => setMessage('')}>
                  Dismiss
                </button>
              </div>
            )}

            <FeatureContent
              profile={profile}
              activeFeature={activeFeature}
              parts={parts}
              partsLoading={partsLoading}
              partsError={partsError}
              partSearch={partSearch}
              setPartSearch={setPartSearch}
              partForm={partForm}
              setPartForm={setPartForm}
              savingPart={savingPart}
              fetchParts={fetchParts}
              handleAddPart={handleAddPart}
              setActiveFeature={setActiveFeature}
              setPartsError={setPartsError}
            />
          </>
        ) : (
          <>
            {type === 'owner' && <GarageHero openFeature={openFeature} />}

            <div className="dashboard-welcome">
              <span>{info.label}</span>
              <h1>
                {info.heading}
                {profile?.full_name ? ` ${profile.full_name}` : ''}
              </h1>
              <p>{info.description}</p>
            </div>

            {message && (
              <div className="message-box">
                {message}{' '}
                <button className="link-button" onClick={() => setMessage('')}>
                  Dismiss
                </button>
              </div>
            )}

            {type === 'owner' && (
              <div className="dashboard-section-heading">
                <div>
                  <span className="hero-tag">EXPLORE SERVICES</span>
                  <h2>Your garage, all in one place.</h2>
                </div>
              </div>
            )}

            <div className="dashboard-grid">
              {info.cards.map(([icon, title, description, button], index) => (
                <DashboardCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={description}
                  button={button}
                  extraClass={
                    index === 0
                      ? 'featured'
                      : title === 'First Aid'
                        ? 'first-aid-card'
                        : ''
                  }
                  onClick={() => openFeature(title)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('splash')
  const [profile, setProfile] = useState(null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [activeFeature, setActiveFeature] = useState('')

  const [registerName, setRegisterName] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [accountType, setAccountType] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [parts, setParts] = useState([])
  const [partsLoading, setPartsLoading] = useState(false)
  const [partsError, setPartsError] = useState('')
  const [partSearch, setPartSearch] = useState('')
  const [partForm, setPartForm] = useState({
    part_name: '',
    car_make: '',
    car_model: '',
    price: '',
    quantity: '',
    description: '',
  })
  const [savingPart, setSavingPart] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      checkLoggedInUser()
    }, 1200)

    return () => clearTimeout(timer)
    // Run the initial session check only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (activeFeature === 'Spare Parts' || activeFeature === 'My Spare Parts') {
      fetchParts()
    }
    // fetchParts uses the current feature and profile.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFeature, profile])

  async function checkLoggedInUser() {
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
      setScreen('welcome')
      return
    }

    const loaded = await loadProfile(data.user.id)

    if (!loaded) {
      setScreen('welcome')
      setMessage(
        'Your account is signed in, but your profile could not be loaded. Please log in again.'
      )
    }
  }

  async function loadProfile(authUserId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('auth_user_id', authUserId)
      .maybeSingle()

    if (error || !data) {
      console.log('Profile lookup:', error)
      return false
    }

    setProfile(data)
    setActiveFeature('')
    setMessage('')

    if (data.user_type === 'Car Owner') {
      setScreen('owner')
    } else if (data.user_type === 'Mechanic') {
      setScreen('mechanic')
    } else if (data.user_type === 'Spare Seller') {
      setScreen('seller')
    } else {
      setScreen('welcome')
      return false
    }

    return true
  }

  async function createProfile(user, name, type) {
    const profileData = {
      auth_user_id: user.id,
      full_name:
        name ||
        user.user_metadata?.full_name ||
        user.email?.split('@')[0] ||
        'Safe Garage User',
      user_type:
        type ||
        user.user_metadata?.user_type ||
        'Car Owner',
    }

    const { error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'auth_user_id' })

    if (error) {
      console.log('Profile creation:', error)
      setMessage(`Your profile could not be saved: ${error.message}`)
      return false
    }

    const loaded = await loadProfile(user.id)

    if (!loaded) {
      setMessage(
        'Your account exists, but the profile could not be loaded. Check your profiles table and permissions.'
      )
    }

    return loaded
  }

  async function handleRegister() {
    setMessage('')

    if (
      !registerName.trim() ||
      !registerPhone.trim() ||
      !registerEmail.trim() ||
      !registerPassword ||
      !confirmPassword ||
      !accountType
    ) {
      setMessage('Please fill in all fields and choose an account type.')
      return
    }

    if (registerPassword !== confirmPassword) {
      setMessage('Your passwords do not match.')
      return
    }

    if (registerPassword.length < 6) {
      setMessage('Your password must contain at least 6 characters.')
      return
    }

    setBusy(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail.trim(),
        password: registerPassword,
        options: {
          data: {
            full_name: registerName.trim(),
            phone: registerPhone.trim(),
            user_type: accountType,
          },
        },
      })

      if (error) {
        setMessage(error.message)
        return
      }

      if (!data.user) {
        setMessage('We could not create your account. Please try again.')
        return
      }

      if (data.session) {
        await createProfile(data.user, registerName.trim(), accountType)
        return
      }

      setLoginEmail(registerEmail.trim())
      setRegisterName('')
      setRegisterPhone('')
      setRegisterEmail('')
      setRegisterPassword('')
      setConfirmPassword('')
      setAccountType('')
      setScreen('login')
      setMessage(
        'Your account was created. Check your email if confirmation is required, then log in.'
      )
    } catch (error) {
      setMessage(error.message || 'Something went wrong during registration.')
    } finally {
      setBusy(false)
    }
  }

  async function handleLogin() {
    setMessage('')

    if (!loginEmail.trim() || !loginPassword) {
      setMessage('Please enter your email and password.')
      return
    }

    setBusy(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      })

      if (error) {
        setMessage(error.message)
        return
      }

      if (!data.user) {
        setMessage('Login failed. Please try again.')
        return
      }

      const loaded = await loadProfile(data.user.id)

      if (!loaded) {
        await createProfile(
          data.user,
          data.user.user_metadata?.full_name,
          data.user.user_metadata?.user_type
        )
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong during login.')
    } finally {
      setBusy(false)
    }
  }

  async function handleLogout() {
    setBusy(true)

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        setMessage(error.message)
        return
      }

      setProfile(null)
      setActiveFeature('')
      setParts([])
      setPartSearch('')
      setMessage('')
      setScreen('welcome')
    } finally {
      setBusy(false)
    }
  }

  function openFeature(title) {
    setMessage('')
    setPartsError('')
    setActiveFeature(title)
    setPartSearch('')
  }

  function backToDashboard() {
    setActiveFeature('')
    setMessage('')
    setPartsError('')
    setPartSearch('')
  }

  async function fetchParts() {
    setPartsLoading(true)
    setPartsError('')

    try {
      let query = supabase.from('spare_parts').select('*')

      if (activeFeature === 'My Spare Parts') {
        if (!profile?.auth_user_id) {
          setParts([])
          setPartsError(
            'Your profile does not contain an auth_user_id. Please check your profiles table.'
          )
          return
        }

        query = query.eq('seller_id', profile.auth_user_id)
      }

      const { data, error } = await query

      if (error) {
        setPartsError(`Could not load spare parts: ${error.message}`)
        setParts([])
        return
      }

      const sortedParts = [...(data || [])].sort((a, b) =>
        String(b.created_at || '').localeCompare(String(a.created_at || ''))
      )

      setParts(sortedParts)
    } catch (error) {
      setPartsError(
        error.message || 'An unexpected error occurred while loading parts.'
      )
    } finally {
      setPartsLoading(false)
    }
  }

  async function handleAddPart() {
    setMessage('')
    setPartsError('')

    if (profile?.user_type !== 'Spare Seller') {
      setPartsError('Only spare sellers can add spare parts.')
      return
    }

    if (!profile?.auth_user_id) {
      setPartsError(
        'Your profile is missing its auth_user_id. Please check your profiles table.'
      )
      return
    }

    if (
      !partForm.part_name.trim() ||
      !partForm.car_make.trim() ||
      !partForm.price ||
      !partForm.quantity.trim()
    ) {
      setPartsError('Please enter the part name, car make, price, and quantity.')
      return
    }

    const price = Number(partForm.price)

    if (!Number.isFinite(price) || price < 0) {
      setPartsError('Enter a valid price in UGX.')
      return
    }

    setSavingPart(true)

    try {
      const { error } = await supabase.from('spare_parts').insert({
        seller_id: profile.auth_user_id,
        part_name: partForm.part_name.trim(),
        car_make: partForm.car_make.trim(),
        car_model: partForm.car_model.trim(),
        price,
        quantity: partForm.quantity.trim(),
        description: partForm.description.trim(),
        status: 'available',
        created_at: new Date().toISOString(),
      })

      if (error) {
        setPartsError(`Could not save this part: ${error.message}`)
        return
      }

      setPartForm({
        part_name: '',
        car_make: '',
        car_model: '',
        price: '',
        quantity: '',
        description: '',
      })

      setMessage('Spare part added successfully!')
      setActiveFeature('My Spare Parts')
    } catch (error) {
      setPartsError(
        error.message || 'An unexpected error occurred while saving the part.'
      )
    } finally {
      setSavingPart(false)
    }
  }

  const dashboardType = {
    owner: 'owner',
    mechanic: 'mechanic',
    seller: 'seller',
  }[screen]

  if (screen === 'splash') return <Splash />

  if (screen === 'welcome') {
    return <Welcome setScreen={setScreen} setMessage={setMessage} />
  }

  if (screen === 'register') {
    return (
      <Register
        registerName={registerName}
        setRegisterName={setRegisterName}
        registerPhone={registerPhone}
        setRegisterPhone={setRegisterPhone}
        registerEmail={registerEmail}
        setRegisterEmail={setRegisterEmail}
        registerPassword={registerPassword}
        setRegisterPassword={setRegisterPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        accountType={accountType}
        setAccountType={setAccountType}
        busy={busy}
        message={message}
        handleRegister={handleRegister}
        setScreen={setScreen}
        setMessage={setMessage}
      />
    )
  }

  if (screen === 'login') {
    return (
      <Login
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        busy={busy}
        message={message}
        handleLogin={handleLogin}
        setScreen={setScreen}
        setMessage={setMessage}
      />
    )
  }

  if (dashboardType) {
    return (
      <Dashboard
        type={dashboardType}
        profile={profile}
        busy={busy}
        message={message}
        setMessage={setMessage}
        handleLogout={handleLogout}
        activeFeature={activeFeature}
        openFeature={openFeature}
        backToDashboard={backToDashboard}
        parts={parts}
        partsLoading={partsLoading}
        partsError={partsError}
        partSearch={partSearch}
        setPartSearch={setPartSearch}
        partForm={partForm}
        setPartForm={setPartForm}
        savingPart={savingPart}
        fetchParts={fetchParts}
        handleAddPart={handleAddPart}
        setActiveFeature={setActiveFeature}
        setPartsError={setPartsError}
      />
    )
  }

  return <Welcome setScreen={setScreen} setMessage={setMessage} />
}

export default App