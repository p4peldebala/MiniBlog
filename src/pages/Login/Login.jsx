import styles from './Login.module.css'
import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAutentication'


const Login = () => {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const {login , error: authError,  loading} = useAuthentication()


  const handleSubmit  = async(e) =>{
    e.preventDefault()
    const user={
      email,
      password,
    }

    const res  = await login(user)
    console.log(res);
  }
  // Creating useEffect to view if the error has been changed

  useEffect(()=>{
    if(authError){
      setError(authError)
    }
  },[authError])

  return (
    <div>
      <h1>Sign In</h1>
      <h3>Make Login to enjoy our <span style={{color:'rgb(148,0,211)'}}>World</span></h3>
      <form className={styles.register} onSubmit={handleSubmit}>
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Password: </span>
          <input
            type="password"
            name="password"
            required
            placeholder="*******"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
        
        {!loading  && <button className='btn' type='submit'>Login</button>}
        {loading  && <button className='btn' disabled>Wait please ...</button>}
        {error && <p className='error'>{error}</p>}
        

        <p>Not registered? <Link to={'/register'}><a className={styles.already}><span> Click for sign up</span></a></Link></p>

      </form>
    </div>
  )
}

export default Login