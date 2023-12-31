import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React,{useState} from 'react';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

export default function Appdrawer({token,page,setpage,isUpload,setmenu,menu,udraw,adraw,tdatas,status})
{
  const [open,setOpen] = useState(false)
    const role = token.role;
    const drawerWidth = 240;
    let nodata = tdatas.filter((item)=> item.value == '').length
    let mandate = tdatas.filter((item)=> item.mandate && item.value != '').length
    let approved = tdatas.filter((item)=> item.status.toLowerCase().includes('approved')).length
    const showInputAlert = async () => {
      const { value: userInput } = await Swal.fire({
        title: 'OTP',
        input: 'text',
        inputPlaceholder: `Enter the OTP sent to ${sessionStorage.getItem('mail')}`,
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
      });
    
      if (userInput) {
       console.log(userInput)
      }
    }; 
    return <> <Drawer
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
      {    role=='user' && <Box sx={{'textAlign' : 'center'}}><button disabled={approved == tdatas.length} onClick={()=>{
        (status.up || status.dr) && mandate==0 && nodata!=0? setOpen(true) : showInputAlert()
      }} variant='contained' className='btn btn-success'>
      <i class="fa-solid fa-share-from-square"></i> &nbsp;  Submit
        </button><br/><br/><Divider /> 
      { approved != tdatas.length && <h6 className='fw-bolder p-2'>Note: Before submit your datas kindly save by clicking save button.</h6>}</Box>}
    </Box>
  </Drawer>
  <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {`Dear ${sessionStorage.getItem('un').toUpperCase().slice(0,-5)}`}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {
tdatas.map((v)=>{
   return <div className='row p-3'>
    <div className='col-md-6 fw-bold'>
    {v.status.toLowerCase().includes('upending') && v.mandate &&<>{v.name}</>}
           {v.status.toLowerCase().includes('rejected') && v.mandate &&<>{v.name}</>}
    </div>
    <div className='col-md-6'>
           {v.status.toLowerCase().includes('upending')&& v.mandate &&<Typography sx={{ fontSize: 14 }}  className={`badge badge-${v.status.toLowerCase().includes('upending') && 'warning'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Submission Pending</span> </Typography>}
           {v.status.toLowerCase().includes('rejected')&& v.mandate&&<Typography sx={{ fontSize: 14 }}  className={`badge badge-${v.status.toLowerCase().includes('rejected') && 'danger'}`} gutterBottom><i class="fa-solid fa-xmark"></i> <span>Rejected</span> </Typography>}
           {/* {v.status.toLowerCase().includes('apending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'primary'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Approval Pending</span> </Typography>} */}
           {/* {v.status.toLowerCase().includes('upending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'warning'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Submission Pending</span> </Typography>} */}
    </div>
     </div>
})}
          </DialogContentText>
         
        </DialogContent>
        {/* <br/>
        <span className='p-3'>
        Need to take action over above item to sub your request.
        </span> */}
        <DialogActions>
        <small className='text alert-info p-3'>Kindly fill (or) refill the above datas to submit</small>
          <Button  onClick={()=>{
            setOpen(false)
          }}>close</Button>
        </DialogActions>
      </Dialog>
  </>
}