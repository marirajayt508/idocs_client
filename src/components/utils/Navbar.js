import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar({setDopen,dopen})
{
  const navigate = useNavigate()
   const logout = ()=>{
    sessionStorage.clear()
    navigate('/login')
   }

   const toggle = ()=>{
    if(dopen)
    {
      setDopen(false)
    }
    else
    {
      setDopen(true)
    }
   }
//    return <div className="navbar text-light fw-bold p-2" style={{backgroundColor : '#131630'}}>
//      iDocs
//      <span className="fw-bold">
//      <i class="fa-solid fa-power-off"/> 
//         <Button sx={{color : "white", fontWeight : 'bold'}} onClick={()=>{
//           logout()
//         }}>logout</Button>
//      </span>
//  </div>
    return       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor : '#131630', color : 'wheat'}}>
    <Toolbar>
      <Typography variant="h6"  noWrap component="div">
     <Button sx={{fontWeight : "bold", color : 'wheat'}} onClick={()=>toggle()}><i className={`fa-solid ${dopen? 'fa-angles-left' : 'fa-bars'}`}></i> &nbsp;&nbsp;<span>iDocs</span></Button>  
       {/* {role=="user" && <span><i class="fa-solid fa-user"></i> &nbsp;{id.slice(0,-5).toUpperCase()}</span>} */}
       </Typography>
       <Box sx={{position : 'absolute', right:'10px'}}>
       <i class="fa-solid fa-power-off"/> 
        <Button sx={{color : "wheat"}} onClick={()=>{
          logout()
        }}>logout</Button></Box> 
    </Toolbar>
  </AppBar>
}