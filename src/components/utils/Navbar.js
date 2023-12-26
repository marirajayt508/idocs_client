import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { jwtDecode } from "jwt-decode";

export default function Navbar({token})
{
    const decode = jwtDecode(token)
    let role = decode.role;
   
    return       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Typography variant="h6" sx={{fontWeight : "bold"}} noWrap component="div">
       {role=="admin" && <span>iDocs</span>}
       {role=="user" && <span>{decode._id.slice(0,-5).toUpperCase()}</span>}
       </Typography>
       {role=="admin" &&<Box sx={{position : 'absolute', right:'10px'}}>
        <Button sx={{color : "white"}}>logout</Button></Box> }
        {role=="user" &&<Box sx={{position : 'absolute', right:'10px'}}>
        <Typography sx={{color : "white"}}>{String(new Date())}</Typography></Box> }
    </Toolbar>
  </AppBar>
}