import React,{useState} from 'react'
import './SignIn.css'
import Axios from 'axios'
import { Link } from "react-router-dom";

export default function SignIn(props) {
   const [user,setUser] = useState({
       email:"",
       password:""
   })
   const handleChange = e => {
       setUser({...user,
        [e.target.name]:e.target.value})
        console.log(user)
   }
   const handleSubmit = e => {
       e.preventDefault()
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
  return (
    <div>
    <div className="main">
      <p className="sign" align="center">Sign in</p>
      <form className="form1">
        <input className="un " onChange={handleChange} name="email"type="text" align="center" placeholder="Email" />
        <input className="pass" onChange={handleChange} name="password"type="password" align="center" placeholder="Password" />
        <a className="submit" align="center" onClick={handleSubmit}>Sign in</a>
        <Link to="/signup"><p className="forgot" align="center">Sign Up</p></Link>
        {/* <div className="g-signin2  btn-lg " data-onsuccess="onSignIn" data-theme="dark"></div> */}
        {/* </a></div><a href="#">
    </a></div> */}
    </form>
    </div>
    </div>
  )
}