import styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom'

import { useAuthContext } from '../context/AuthContext'
import { useAuthentication } from '../hooks/useAutentication'

const NavBar = () => {
  // Pick up user for our Context
  const { user } = useAuthContext()
  const { logout } = useAuthentication()


  return (
  <nav className={styles.navbar}>
    <NavLink className={styles.brand} to={"/"}>
      Mini <span>Blog</span>
    </NavLink>
    <ul className={styles.link_list}>
      <li className={styles.flex}>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Home
        </NavLink>
      </li>
      <li className={styles.flex}>
        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          About
        </NavLink>
      </li>

      {/* If user has been logged */}
      {!user && (
        <>
          <ul className={styles.register}>
            <li className={styles.login}>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li className={styles.signUp}>
              <NavLink to={"/register"}>Sign Up</NavLink>
            </li>
          </ul>
        </>
      )}

      {/* Else if */}
      {user && (
        <>
            <li className={styles.flex}>
              <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to={"/posts/create"}>New Post</NavLink>
            </li>
            <li className={styles.flex}>
              <NavLink  className={({ isActive }) => (isActive ? styles.active : "")} to={"/dashboard"}>DashBoard</NavLink>
            </li>
        </>
      )}
      
      {user && (
        <>
        <div className={styles.register}>
          <li className={styles.logout}>
            <button className={styles.exit} onClick={logout}>Logout</button>
          </li>
        </div>
        </>
      )}

    </ul>
  </nav>
  );
}

export default NavBar