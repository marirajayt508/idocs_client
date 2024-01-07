import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

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
    return       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor : '#131630', color : 'wheat'}}>
    <Toolbar>
      <Typography variant="h6"  noWrap component="div">
     <Button sx={{fontWeight : "bold", color : 'wheat'}} onClick={()=>toggle()}><i className={`fa-solid ${dopen? 'fa-angles-left' : 'fa-bars'}`}></i> &nbsp;&nbsp;<span>iDocs</span></Button>  
       </Typography>
     {sessionStorage.getItem('role')=='user' && <Tooltip title="Chat with Admin">
       <Box sx={{position : 'absolute', right:'100px', cursor: 'pointer'}}>
          <i class="fa-solid fa-comment" sx={{color : "wheat"}}></i>
        </Box>
        </Tooltip> }
       <Tooltip title="Logout">
       <Box sx={{position : 'absolute', right:'60px', cursor: 'pointer'}}> 
       <i class="fa-solid fa-power-off" sx={{color : "wheat"}} onClick={()=>{
          logout()
        }}/> 
        </Box> 
        </Tooltip> 
 {  sessionStorage.getItem('role')=='user' &&     <Tooltip title={sessionStorage.getItem('un').toLocaleUpperCase().slice(0,-5)}>
       <Box sx={{position : 'absolute', right:'20px', cursor: 'pointer'}}> 
       <i class="fa-solid fa-user" sx={{color : "wheat"}} onClick={()=>{
          console.log('test')
        }}/> 
        </Box> 
        </Tooltip> }
        {  sessionStorage.getItem('role')=='admin' &&     <Tooltip title={'Admin'}>
       <Box sx={{position : 'absolute', right:'20px', cursor: 'pointer'}}> 
       {/* <i class="fa-solid fa-calender" sx={{color : "wheat"}} onClick={()=>{
          console.log('test')
        }}/>  */}
        <i class="fa-solid fa-user"></i>
        </Box> 
        </Tooltip> }
    </Toolbar>
  </AppBar>
}