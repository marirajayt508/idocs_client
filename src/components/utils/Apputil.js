import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Body from '../Body';
import Appdrawer from './Appdrawer';
import { jwtDecode } from "jwt-decode";
import Userbody from '../userBody';
import Login from './Login';

export default function Apputil() {
  const [page,setPage] = useState(0)
  const [isup,setisup] = useState(false)
  const location = window.location.href;
  const url = new URL(location);
  const queryParams = new URLSearchParams(url.search);
  const token = queryParams.get('ut');
  sessionStorage.setItem("token",token)
  var verify = false;
  try
   {  verify =  jwtDecode(sessionStorage.getItem('token'))
  // if(verify.mail && verify.otp)
  // {
  //   setMail(verify.mail)
  //   setOtp(verify.otp)
  // }
  }
   catch(e)
   {
    verify = false
   }
const utoken = sessionStorage.getItem('token')
  return (
    <Box sx={{ display: 'flex' }}>
     {verify && verify.role=='user' ?<Box  sx={{ display: 'flex' }}><CssBaseline />
      <Navbar token={utoken}/>
      <Appdrawer isUpload={isup} token={utoken} page={page} setpage={(v)=>setPage(v)}/>
      {verify.role=="user"?<Userbody isup={isup} setisup={(v)=>setisup(v)} page={page} datas={verify} username={verify._id} setpage={(v)=>setPage(v)}/>:<Body/>}</Box> : <Login/>}
   </Box>
  );
}