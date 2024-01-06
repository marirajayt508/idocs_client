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
    const [ip,setIp] = useState('none')
    const [ie,setIe] = useState('none')
    const [loading,setLoading] = useState(false)
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
  setLoading(true)
  if(verify)
  {
 
    axios.post(api+'auth/login',{mail: sessionStorage.getItem('un'),otp: sessionStorage.getItem('otp')}).then((res)=>{  
      if(res.data.status.value??false)
        {
          setIp('1px solid red')
        }
        else
     {   
      sessionStorage.setItem('un',res.data.status._id)
        sessionStorage.setItem('role',res.data.status.role)
        sessionStorage.setItem('mail',res.data.status.mail)
        // toast.success("Login Success")
        navigate('/board')
      }
      setLoading(false)
    }).catch((err)=>{
      setIe('1px solid red')
      setLoading(false)
    })
  }
else
{
   axios.post(api+'auth/login',{mail,otp}).then((res)=>{
    if(res.data.status.value??false)
    {
      setIp('1px solid red')
    }
    else
{
    sessionStorage.setItem('un',res.data.status._id)
    sessionStorage.setItem('role',res.data.status.role)
    sessionStorage.setItem('mail',res.data.status.mail)
    // toast.success("Login Success")
    navigate('/board')
    }
    setLoading(false)
}).catch((err)=>{
  setIe('1px solid red')
  setLoading(false)
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
            style={{border : ie }}
            onChange={(e)=>{
              setIe('none')
              setMail(e.target.value)}}/>
{ie!='none' && <Typography variant="small" color="error">
        Invalid Email
      </Typography>}
      <input type="password" placeholder="Password"
         value={sessionStorage.getItem('otp')}
         style={{border : ip }}
        //  '1px solid red'
         onChange={(e)=>{
          setIp('none')
           setOtp(e.target.value)
         }} />
         {ip!='none' &&  <Typography variant="small" color="error">
        Invalid Password
      </Typography>}
      <button disabled={loading} onClick={()=> signin()}>{loading? 
      <div class="spinner-border spinner-border-sm text-light" role="status">
      <span class="sr-only">Loading...</span>
    </div>
      :'Sign In'}</button>
    </div>
  </div>
  <div className="toggle-container">
    <div className="toggle">
      <div className="toggle-panel toggle-right">
        <h1>iDocs</h1>
        <p>Verification made easily</p>
        <button className="hidden" id="register">Learn more</button>
      </div>
    </div>
  </div>
</div>
</div>
}
