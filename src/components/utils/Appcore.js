import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Appdrawer from './Appdrawer';
import { useNavigate } from 'react-router-dom';
import Userbody from '../userBody';
import Admin from '../admin/admin';


export default function Apputil() {
  const [page,setPage] = useState(0)
  const [isup,setisup] = useState(false)
  const [signin,setsignin] = useState(false)
  const [menu,setMenu] = useState('Dashboard')
   const navigate = useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem('un')??false)
    {
  let signdata = {
    'un' : sessionStorage.getItem('un'),
    'mail' : sessionStorage.getItem('mail'),
    'role' : sessionStorage.getItem('role')
  };
  setsignin(signdata)
    }

  },[])
const logout = ()=>{
  sessionStorage.clear()
  navigate('/')
}

  return (
    <Box sx={{ display: 'flex' }}>
       <Navbar token={signin}/>
      <Appdrawer isUpload={isup} token={signin} menu={menu} page={page} setmenu={(v)=>setMenu(v)} setpage={(v)=>setPage(v)}/>
     {signin && signin.role=='user' && <Box  sx={{ display: 'flex' }}><CssBaseline />
      {signin.role=="user" && <Userbody  menu={menu} isup={isup} setisup={(v)=>setisup(v)} page={page} datas={signin} username={signin.username} setpage={(v)=>setPage(v)}/>}</Box>}
      {signin && signin.role=='admin' && <Box  sx={{ display: 'flex' }}><CssBaseline />
      {signin.role=="admin" && <Admin menu={menu}/>}</Box>}
   </Box>
  );
}