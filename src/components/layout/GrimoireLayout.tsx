import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import styles from './GrimoireLayout.module.css'

export function GrimoireLayout() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
  }, [pathname])

  return (
    <div className={styles.grimoireLayout}>
      <button className={styles.mobileToggle} onClick={() => setOpen(true)} aria-label="Abrir índice">☰</button>
      <Sidebar open={open} />
      {open && <button className={styles.overlay} onClick={() => setOpen(false)} aria-label="Fechar índice" />}
      <main className={styles.content}>
        <div className={styles.inner}>
          <TopBar />
          <Outlet />
        </div>
      </main>
    </div>
  )
}
