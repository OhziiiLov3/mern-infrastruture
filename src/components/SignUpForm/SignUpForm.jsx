import React, { Component } from 'react'
import {signUp} from '../../utilities/users-service'



class SignUpForm extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: '',
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const formData = {...this.state};
          delete formData.confirm;
          delete formData.error;
          const user = await signUp(formData)
          // update state with user 
          this.props.setUser(user);
          // console.log(user);
        }catch (err){
          console.log(err);
          this.setState({
            error: " Sign Up Failed - Try Again",
          })
        }
        // alert(JSON.stringify(this.state))// ajax call to server , separe calls in utilities folder w/ files 
    }

  render() {
    const disable = this.state.password !== this.state.confirm;

    return (
      <div>
        <div className="form-container">
            <form autoComplete='off' onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input type="text" name='name' value={this.state.name} onChange={this.handleChange} required />
                <label>Email</label>
                <input type='email' name='email' value={this.state.email} onChange={this.handleChange} required />
                <label>Password</label>
                <input type="password" name='password' value={this.state.password} onChange={this.handleChange} required />
                <label>Confirm</label>
                <input type="password" name='confirm' value={this.state.confirm} onChange={this.handleChange} required />
                <button type='submit' disabled={disable}>SIGN UP</button>
            </form>
        </div>
        <p className='error-message'>&nbsp;{this.state.error}</p>
      </div>
    );
  }
}


export default SignUpForm