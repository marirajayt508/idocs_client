import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Input } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { api } from '../../../util';
// import loginlogo from '../static/login.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./login.css"

const theme = createTheme();

export default function Login({signinDatas}) {
    const [mail,setMail] = useState('')
    const [otp,setOtp] = useState('')
    const [verify,setVrify] = useState(false)
    const navigate = useNavigate()
useEffect(()=>{
    const location = window.location.href;
  const url = new URL(location);
  const queryParams = new URLSearchParams(url.search);
  const token = queryParams.get('ut');
  sessionStorage.clear()
  try
   {  
    let verifys =  jwtDecode(token)
    console.log(verifys)
    setVrify(verifys)
    setMail(verify.un)
    setOtp(verify.otp)
    sessionStorage.setItem('un',verifys.un)
    sessionStorage.setItem('otp',verifys.otp)
    sessionStorage.setItem('role',verifys.role)
    console.log(verifys)
  }
   catch(e)
   {
    setVrify(false)
   }
},[])
const signin = ()=>{
  if(verify)
  {
    axios.post(api+'auth/login',{mail: sessionStorage.getItem('un'),otp: sessionStorage.getItem('otp')}).then((res)=>{
        if(res.data.status.value??false)
        {
          toast.error('Invalid Password')
        }
        else
     {   
      sessionStorage.setItem('un',res.data.status._id)
        sessionStorage.setItem('role',res.data.status.role)
        sessionStorage.setItem('mail',res.data.status.mail)
        // toast.success("Login Success")
        navigate('/board')
      }
    }).catch((err)=>{
      toast.error('Invalid Login')
    })
  }
else
{
   axios.post(api+'auth/login',{mail,otp}).then((res)=>{
    if(res.data.status.value??false)
    {
      toast.error('Invalid Password')
    }
    else
{
    sessionStorage.setItem('un',res.data.status._id)
    sessionStorage.setItem('role',res.data.status.role)
    sessionStorage.setItem('mail',res.data.status.mail)
    // toast.success("Login Success")
    navigate('/board')
    }
}).catch((err)=>{
  toast.error('Invalid Login')
})
}
}
  return <div className='p-5'> 
    <div className="login-body container" id="container">
  <div className="form-container sign-in">
    <div className='form' >
      <h1>Login</h1>
      <input type="email" placeholder="Email"             id="username"
            value={sessionStorage.getItem('un')}
            onChange={(e)=>setMail(e.target.value)}/>

      <input type="password" placeholder="Password"
         value={sessionStorage.getItem('otp')}
         onChange={(e)=>{
           setOtp(e.target.value)
         }} />
      <button onClick={()=> signin()}>Sign In</button>
    </div>
  </div>
  <div className="toggle-container">
    <div className="toggle">
      <div className="toggle-panel toggle-right">
        <h1>iDocs</h1>
        {/* <p>Register with your personal details to use all of site features</p> */}
        {/* <button className="hidden" id="register">Sign Up</button> */}
      </div>
    </div>
  </div>
</div>
</div>
}
