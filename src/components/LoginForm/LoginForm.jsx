import React,{useState} from 'react'
import * as userService from '../../utilities/users-service'

const LoginForm = ({setUser}) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('')

    function handleChange(e){
        setCredentials({...credentials, [e.target.name]: e.target.value});
        setError('')
    }

    async function handleSubmit(e){
        // prevents form from being sent to server 
        e.preventDefault();
        try {
            // promise returns signUp service method 
            // payload of JWT
            const user = await userService.login(credentials);
            setUser(user);
        } catch  {
            setError('Log in Failed- Try Again')
        }
    }
  return (
    <div>
        <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  )
}

export default LoginForm