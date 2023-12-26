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

const theme = createTheme();

export default function Login() {
    const [mail,setMail] = useState('')
    const [otp,setOtp] = useState('')
    const [verify,setVrify] = useState(false)
useEffect(()=>{
    const location = window.location.href;
  const url = new URL(location);
  const queryParams = new URLSearchParams(url.search);
  const token = queryParams.get('ut');
  try
   {  
    let verifys =  jwtDecode(token)
    console.log(verifys)
    setVrify(verifys)
    setMail(verify.mail)
    setOtp(verify.otp)
    sessionStorage.setItem('mail',verifys.mail)
    sessionStorage.setItem('otp',verifys.otp)
    console.log(mail,otp)
  }
   catch(e)
   {
    setVrify(false)
   }
},[])
const signin = ()=>{
  if(verify)
  {
    axios.post(api+'auth/login',verify).then((res)=>{
        console.log(res.data)
    }).catch((err)=>{
        alert("LOGIN ERR")
    })
  }
else
{
if(mail.trim().includes('@'))
{
   axios.post(api+'auth/login',{mail,otp}).then((res)=>{
    console.log(res.data)
}).catch((err)=>{
    alert("LOGIN ERR")
})
}
else
{
    alert('INVALID EMAILID')
}
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
          <br/>
          <br/>
          <Input
            margin="normal"
            required
            fullWidth
            placeholder="Email Address"
            name="email"
            id="email"
            value={sessionStorage.getItem('mail')}
          />
          <br/><br/>
          <Input
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            value={sessionStorage.getItem('otp')}
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
