import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn, login } from '../../store/campaignStore'
import layout from '../../components/admin/AdminLayout.module.css'
import form from '../../components/admin/Form.module.css'

export function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn()) navigate('/admin/dashboard', { replace: true })
  }, [navigate])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (login(password)) navigate('/admin/dashboard')
    else setError('Senha incorreta.')
  }

  return (
    <main className={layout.login}>
      <form className={layout.loginPanel} onSubmit={submit}>
        <h1>Campanha ShadowDark</h1>
        <div className={form.field}>
          <label>Senha do Mestre</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus />
        </div>
        <div className={form.actions} style={{ marginTop: '1rem' }}>
          <button className="button">Entrar</button>
          {error && <span className={form.notice}>{error}</span>}
        </div>
      </form>
    </main>
  )
}
