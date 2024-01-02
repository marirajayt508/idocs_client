import { Button, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import { api } from '../util';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import { Context } from './utils/context';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { toast } from 'react-toastify';

export default function Uploaddocuments({setpage,setupload,d,udraw})
{
    const [ufiles,setUfiles] = useState({});
    const [cfiles,setCfiles] = useState([]);
    const [open,setOpen] = useState(false)
    const [uploads,setUploads] = useState([])
  const cstate = useContext(Context)
  useEffect(()=>{
    setUploads(cstate.uploads)
  },[])

  const handleFileUpload = (event,name,ind) => {
    setOpen(true)
    const file = event.target.files[0];
            const fd = new FormData();
            fd.append('username',sessionStorage.getItem('un'))
            fd.append('filename',name)
                    fd.append('file',file)
                 
         uploads[ind].value= `${sessionStorage.getItem('un').slice(0,-5)}/${name.toUpperCase()+"_"+sessionStorage.getItem('un').toUpperCase().slice(0,-5)}`
        //  tu[ind].value= `${sessionStorage.getItem('un').slice(0,-5)}/${name.toUpperCase()+"_"+sessionStorage.getItem('un').toUpperCase().slice(0,-5)}`
         axios.post(api+"users/access/",fd,{ headers: { 'Content-Type': 'multipart/form-data'}},).then((res)=>{
        setOpen(false)
       }).catch((err)=>{
        setOpen(false)
        console.log(err)
       })
       axios.put(api+"save/setuplod",{
        "_id" : sessionStorage.getItem("un"),
        uploads
     }).catch((e)=>{
        toast.error("Network Error!")
     })

  } 
        


      const showAlert = (name) => {
        Swal.fire({
          // title: 'Hello!',
          text: name.toUpperCase()+' is Submitted to the admin. Unless your document gets rejected, you will be able to submit it.',
          // icon: 'info',
          confirmButtonText: 'ok'
        });
      };

      const showCmd = (cmt) => {
        Swal.fire({
          // title: 'Hello!',
          text: cmt,
          // icon: 'info',
          confirmButtonText: 'ok'
        });
      };
    return       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
 <Paper sx={{p:2, width : "1000px"}}>
 <small className='fw-bold'>Upload Documents</small>
    <div style={{'border': '1px solid grey','width' : '90px'}}/>
    <Divider/>
    <br/>
    {/* <Paper sx={{p : 2}}> */}
 { uploads.length?
        uploads?.map((val,ind)=>{
            return   <Grid  container sx={{p:2}} spacing={2}><Grid item xs={3}>
                <label>{val.mandate && <span className='text-danger  fw-bolder'>* </span>}  {val?.name?.toUpperCase()}</label></Grid>
                <Grid item xs={3}>     <div>
      <label  className='btn btn-info' onClick={()=>(val.status.toLowerCase().includes('apending') || val.status.toLowerCase().includes('approved'))&& showAlert(val.name)} htmlFor={`upload${val.name}`}>
      <i class="fa-solid fa-upload"></i> &nbsp; Select file
      </label>
      <input
        id={`upload${val.name}`}
        type="file"
        style={{display:'none'}}
        onChange={(e)=>handleFileUpload(e,val.name,ind)}
        disabled={val.status.toLowerCase().includes('apending') || val.status.toLowerCase().includes('approved')}
      /><br/>
      {/* {cfiles.indexOf(val.name)!=-1 && <lable>{val.name.toUpperCase()} uploaded</lable>} */}
    </div>
          </Grid>
          <Grid item xs={3}>
          {val.status.toLowerCase().includes('approved')&&<Typography sx={{ fontSize: 14 }}  className={`text-${val.status.toLowerCase().includes('approved') && 'success'}`} gutterBottom><i class="fa-solid fa-check"></i> <span>Approved</span> </Typography>}
           {val.status.toLowerCase().includes('rejected')&&<Typography sx={{ fontSize: 14 }}  className={`text-${val.status.toLowerCase().includes('rejected') && 'danger'}`} gutterBottom><i class="fa-solid fa-xmark"></i> <span>Rejected</span> </Typography>}
           {/* {val.status.toLowerCase().includes('apending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${val.status.toLowerCase().includes('apending') && 'primary'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Approval Pending</span> </Typography>} */}
           {/* {val.status.toLowerCase().includes('upending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${val.status.toLowerCase().includes('apending') && 'warning'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Submission Pending</span> </Typography>} */}
          </Grid>
          <Grid item xs={3}>
          {val.status.toLowerCase().includes('rejected') && <div className="btn btn-primary" onClick={()=>showCmd(val.comments)}><i class="fa-regular fa-eye"></i> View Comment</div>  }
          </Grid>
          </Grid>
        })
     : <Box style={{textAlign : 'center', color : 'green', fontWeight : 'bold'}}>Loading...</Box>}
    <br/>
    <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='text-center'>
          <span class="spinner-border text-primary small" role="status"/> <br/>
Uploading Please Wiat...
         </DialogContentText>
         </DialogContent>
      </Dialog>
      {/* <Box sx={{textAlign : 'center'}}> 
              <Button onClick={()=>{setpage(1)}} color={'warning'} variant='contained'><i class="fa-solid fa-floppy-disk"></i>&nbsp; save</Button>
              </Box> */}
     </Paper>
     
     {/* </Paper> */}
  </Box>
}