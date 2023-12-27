import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar()
{
  const navigate = useNavigate()
    let role = sessionStorage.getItem('role');
    let id = sessionStorage.getItem('un');
   const logout = ()=>{
    sessionStorage.clear()
    navigate('/')
   }
    return       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
    <Toolbar>
      <Typography variant="h6" sx={{fontWeight : "bold"}} noWrap component="div">
       {role=="admin" && <span>iDocs</span>}
       {role=="user" && <span>{id.slice(0,-5).toUpperCase()}</span>}
       </Typography>
       <Box sx={{position : 'absolute', right:'10px'}}>
        <Button sx={{color : "white"}} onClick={()=>{
          logout()
        }}>logout</Button></Box> 
    </Toolbar>
  </AppBar>
}