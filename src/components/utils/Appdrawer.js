import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

export default function Appdrawer({token,page,setpage,isUpload,setmenu,menu,udraw,adraw})
{
    const role = token.role;
    const drawerWidth = 240; 
console.log(udraw,adraw)
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
        {adraw.map((text, index) => (
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
        {udraw?.map((text, index) => (
          <ListItem selected={text == menu} key={text.name} disablePadding>
            <ListItemButton onClick={()=>setmenu(text.trim())}>
            <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
</Box>}
      <Divider /><br/>
      {    role=='user' && <Box sx={{'textAlign' : 'center'}}><button variant='contained' className='btn btn-success'>
      <i class="fa-solid fa-share-from-square"></i> &nbsp;  Submit
        </button><br/><br/><Divider /></Box>}
    </Box>
  </Drawer>
}