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
import { api } from '../../util';
import loginlogo from '../static/login.png'
import { useNavigate } from 'react-router-dom';

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
        console.log(res.data)
        sessionStorage.setItem('un',res.data.status._id)
        sessionStorage.setItem('role',res.data.status.role)
        sessionStorage.setItem('mail',res.data.status.mail)
        navigate('/board')
    }).catch((err)=>{
        alert("LOGIN ERR")
    })
  }
else
{
   axios.post(api+'auth/login',{mail,otp}).then((res)=>{
    console.log(res.data)
    sessionStorage.setItem('un',res.data.status._id)
    sessionStorage.setItem('role',res.data.status.role)
    sessionStorage.setItem('mail',res.data.status.mail)
    navigate('/board')
}).catch((err)=>{
    alert("LOGIN ERR")
})
}
}
  return (
    <Box sx={{width:"100%"}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p : 10,
            border : 'solid 0.5px',
            boxShadow : '2px 2px 4px 7px rgba(0, 0, 0, 0.2)'
          }}
        >
            <img src={loginlogo} width='35' alt="loginlogo"/>
          <Typography componenet="h1" variant="h5">
            Login
          </Typography> 
          <div style={{'border': '1px solid grey','width' : '90px'}}/>
          <br/>  <br/>
          <Input
            margin="normal"
            required
            fullWidth
            placeholder="Username"
            name="username"
            id="username"
            value={sessionStorage.getItem('un')}
            onChange={(e)=>setMail(e.target.value)}
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
          <br/><br/>
          <Input
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="PASSWORD"
            type="password"
            id="password"
            value={sessionStorage.getItem('otp')}
            onChange={(e)=>setOtp(e.target.value)}
          /><br/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>{
                signin()
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}