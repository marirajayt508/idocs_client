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
import { Input } from '@mui/material';
import { toast } from 'react-toastify';

export default function Appdrawer({token,dopen,setmenu,menu,udraw,adraw,tdatas,status})
{
  const [open,setOpen] = useState(false)
  const [motp,setMotp] =useState(0)
    const role = token.role;
    const drawerWidth = 170;
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

    const otp = ()=>{
      setOpen(false)
      toast.success("Data Submited to Admin.")
console.log(motp)
    }

    return <> <Drawer
    open={dopen}
    variant="persistent"  
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', fontFamily: '"Roboto", sans-serif !important',color : 'wheat', bgcolor: '#131630' },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
{  role=='admin' && <Box> <List>
        {adraw.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
            {text.toLowerCase().includes('dashboard') && <i class="fa-solid fa-gauge"></i>} 
            {text.toLowerCase().includes('users') && <i class="fa-solid fa-users"></i>} 
            {text.toLowerCase().includes('pending') && <i class="fa-solid fa-clock"></i>} 
            {text.toLowerCase().includes('galary') && <i class="fa-solid fa-folder"></i>} 
            {text.toLowerCase().includes('settings') && <i class="fa-solid fa-gear"></i>} 
            &nbsp;&nbsp;
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
           {text.toLowerCase().includes('dashboard') && <i class="fa-solid fa-gauge"></i>}
           {text.toLowerCase().includes('basic') && <i class="fa-solid fa-pen"></i>}
           {text.toLowerCase().includes('upload') && <i class="fa-solid fa-upload"></i>}
           &nbsp; &nbsp;
            <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
</Box>}
      <Divider /><br/>
      {    role=='user' && <Box sx={{'textAlign' : 'center'}}>
      <button disabled={approved == tdatas.length} onClick={()=>{
      setOpen(true)
      }} variant='contained' className='btn' style={{backgroundColor : '#512da8', color : 'white'}}>
      <i class="fa-solid fa-share-from-square"></i> &nbsp;  Submit
        </button><br/><br/><Divider /> 
      {/* { approved != tdatas.length && <h6 className='fw-bolder p-2'>Note: Before submit your datas kindly save by clicking save button.</h6>} */}
      </Box>}
    </Box>
  </Drawer>
  <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      { !(status.fieldValue==status.fieldLength) && <DialogTitle id="alert-dialog-title">
          OTP
        </DialogTitle>}
        <DialogContent style={{width : "100%"}}>
          
{     !(status.fieldValue==status.fieldLength) ? <DialogContentText id="alert-dialog-description">
          {
tdatas.map((v)=>{
   return <div className='row p-3'>
    <div className='col-md-6 fw-bold'>
    {v.status.toLowerCase().includes('upending') && v.mandate &&<>{v.name}</>}
           {v.status.toLowerCase().includes('rejected') && v.mandate &&<>{v.name}</>}
    </div>
    <div className='col-md-6'>
           {v.status.toLowerCase().includes('upending')&& v.mandate  &&<Typography sx={{ fontSize: 14 }}  className={`badge badge-${v.status.toLowerCase().includes('upending') && 'warning'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Submission Pending</span> </Typography>}
           {v.status.toLowerCase().includes('rejected')&& v.mandate  && <Typography sx={{ fontSize: 14 }}  className={`badge badge-${v.status.toLowerCase().includes('rejected') && 'danger'}`} gutterBottom><i class="fa-solid fa-xmark"></i> <span>Rejected</span> </Typography>}
           {/* {v.status.toLowerCase().includes('apending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'primary'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Approval Pending</span> </Typography>} */}
           {/* {v.status.toLowerCase().includes('upending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'warning'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Submission Pending</span> </Typography>} */}
    </div>
     </div>
})}
          </DialogContentText> : <Box >
           <Input  placeholder={`Enter the OTP`} onChange={(e)=>
          setMotp(e.target.value)}/>

            </Box>}
         
        </DialogContent>
        {/* <br/>
        <span className='p-3'>
        Need to take action over above item to sub your request.
        </span> */}
        <DialogActions>
{    !(status.fieldValue==status.fieldLength) ? <Box>    <small className='text-primary fw-bold p-3'>
          {
         ! (  status.dr && status.sp) ? 'Please complete or update the above data before submitting.' : 'Please review the document or data before submission, as some may be subject to rejection.'
          }
          </small>
          <div>
          <Button variant='contained' onClick={()=>{
            if(status.dr && status.sp )
            {
              setOpen(false)
              // showInputAlert()
            }
            else
            {
              setOpen(false)
            }
          }}>
            {
              status.dr && status.sp ? 'Submit' : 'Close'
            }
          </Button></div></Box> : <Box>
            <Button variant='contained'
            onClick={()=>{
              otp()
            }}
            >Submit otp</Button>
            </Box>}
        </DialogActions>
      </Dialog>
  </>
}