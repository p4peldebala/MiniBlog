import styles from './Register.module.css'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAutentication'

import { Link } from 'react-router-dom'

const Register = () => {
  // Use state
  const [displayName, setDisplayName] =  useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [id, setId] = useState(0)

  const {createUser, error: authError,  loading} = useAuthentication()


  const changeId = () =>{
    setId(id + 1)
    return id
  }

  const handleSubmit  = async(e) =>{
    e.preventDefault()
    setError('')


    const user={
      name: displayName,
      email,
      password,
      id: changeId()
    }


    // Validation Process
    if(password !==  confirmPassword){
      setError('The passwords not equals')
      setId(user.id)
      return 
    }

    const res  = await createUser(user)
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
      <h1>Register for Post and Share</h1>
      <h3>Create your user and welcome to our <span style={{color:'rgb(148,0,211)'}}>World</span></h3>
      <form className={styles.register} onSubmit={handleSubmit}>
        <label>
          <span>Name: </span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="User Name"
            value={displayName}
            onChange={(e)=> setDisplayName(e.target.value)}
          />
        </label>
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
        <label>
          <span>Confirm password: </span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="*******"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
        </label>
          
        {!loading  && <button className='btn' type='submit'>Register</button>}
        {loading  && <button className='btn' disabled>Wait please ...</button>}
        {error && <p className='error'>{error}</p>}
        
        
        <p>Is already register?<Link to={'/login'}><a className={styles.already}><span> Click for login</span></a></Link></p>
      </form>
    </div>
  );
}

export default Register