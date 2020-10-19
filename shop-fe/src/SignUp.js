import React,{useState} from 'react'
import './SignIn.css'
import Axios from 'axios'
import { Link } from "react-router-dom";

export default function SignUp(props) {
   const [user,setUser] = useState({
       email:"",
       password:"",
       user_name:""
   })
   const handleChange = e => {
       setUser({...user,
        [e.target.name]:e.target.value})
        console.log(user)
   }
   const handleSubmit = e => {
       e.preventDefault()
   Axios.post(`https://heir-shoes-be.herokuapp.com/register`,user).then(
       res => {
        
        Axios.post(`https://heir-shoes-be.herokuapp.com/login`,user).then(
       res => {
        localStorage.setItem(`email`,res.data.email)
        localStorage.setItem(`token`,res.data.token)
        localStorage.setItem(`id`,res.data.userid)
        props.history.push(`/home`)
        console.log(props)

       }
   )

       }
   )

   

}
  return (
    <div>
    <div className="main">
      <p className="sign" align="center">Sign Up</p>
      <form className="form1">
        <input className="un " onChange={handleChange} name="email"type="text" align="center" placeholder="Email" />
        <input className="pass" onChange={handleChange} name="user_name"type="userName" align="center" placeholder="Username" />
        <input className="pass" onChange={handleChange} name="password"type="password" align="center" placeholder="Password" />
        <a className="submit" align="center" onClick={handleSubmit}>SignUp</a>
        <Link to="/signin"><p className="forgot" align="center">Sign In</p></Link>
        {/* <p className="forgot" align="center"><a href="#">Forgot Password?</a></p><a href="#"> */}
        {/* <div className="g-signin2  btn-lg " data-onsuccess="onSignIn" data-theme="dark"></div> */}
        {/* </a></form></div><a href="#"> */}
    {/* </a> */}
    </form>
    </div>
    </div>
  )
}