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
    const role = token.role;
    const drawerWidth = 240; 
    const udraw = ["Dashboard","Basic Details","Upload Documents"]

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
        {['Dashboard', 'Document Request', 'Pending Approval',"Add Client","Document Galary","Settings"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
              {
                text.trim().toLowerCase()=="pendingapproval" && <Badge badgeContent={4} color="primary"/>
              }
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
      </List></Box>}
      {    role=='user' && <Box> <List>
        {udraw.map((text, index) => (
          <ListItem selected={index == page} key={text.name} disablePadding>
            <ListItemButton onClick={()=>text.trim().toLowerCase()=="uploaddocuments"?setpage(1):setpage(0)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
</Box>}
      <Divider /><br/>
      {    role=='user' && <Box sx={{'textAlign' : 'center'}}><Button variant='contained' color={'success'} >
        Save
        </Button><br/><Divider /></Box>}
    </Box>
  </Drawer>
}