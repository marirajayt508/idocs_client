import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { jwtDecode } from "jwt-decode";


export default function Appdrawer({token,page,setpage,isUpload})
{
    const decode = jwtDecode(token)
    const role = decode.role;
    const drawerWidth = 240;
    const udraw = ["BASIC DETAILS"]
    if(isUpload)
    {
        udraw.push("Upload Documents")
    }
    return  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
{    role=='admin' && <Box> <List>
        {['Dashboard', 'Iniate Docs', 'Pending Request'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
              {
                text=="Pending Request" && <Badge badgeContent={4} color="primary"/>
              }
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List></Box>}
      {    role=='user' && <Box> <List>
        {udraw.map((text, index) => (
          <ListItem selected={index == page} key={text} disablePadding>
            <ListItemButton onClick={()=>text=="Upload Documents"?setpage(1):setpage(0)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
</Box>}
      <Divider /><br/>
    </Box>
  </Drawer>
}