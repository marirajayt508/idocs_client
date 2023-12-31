import { Button, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import React,{useState,useEffect} from 'react';
import Typography from '@mui/material/Typography';

export default function Basicdetails ({setpage,d,setdetails,fields})
{


    const getVal = (e,val)=>{
        d[val] = e.target.value;
        setdetails(d)
    }

    return       <Box component="main" sx={{  p: 1 }}>
        {/* <button onClick={()=>console.log(d)}>TETS</button> */}
  <Paper sx={{p:2, width : "1000px"}}>
    <small className='fw-bold'>BASIC DETAILS</small>
    <div style={{'border': '1px solid grey','width' : '90px'}}/>
    <Divider/>
    <Box sx={{p : 3}}>
        {
fields.map((v)=>{
   return <div className='row p-3'>
    <div className='col-md-3'>
    {v.mandate && <span className='text-danger  fw-bolder'>* </span>} 
    {v.name}
    </div>
    <div className='col-md-3'>
        
        <Input placeholder='Enter your name' defaultValue={v.value} disabled={v.status.toLowerCase().includes('apending') || v.status.toLowerCase().includes('approved')} placeholder={v.name}/>
    </div>
    <div className='col-md-3'>
           {v.status.toLowerCase().includes('approved')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('approved') && 'success'}`} gutterBottom><i class="fa-solid fa-check"></i> <span>Approved</span> </Typography>}
           {v.status.toLowerCase().includes('rejected')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('rejected') && 'danger'}`} gutterBottom><i class="fa-solid fa-xmark"></i> <span>Rejected</span> </Typography>}
           {/* {v.status.toLowerCase().includes('apending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'primary'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Approval Pending</span> </Typography>} */}
           {/* {v.status.toLowerCase().includes('upending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'warning'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Submission Pending</span> </Typography>} */}
    </div>
    <div className='col-md-3'>
    {v.status.toLowerCase().includes('rejected') && <div className="btn btn-primary"><i class="fa-regular fa-eye"></i> View Comment</div>  }
    </div>
     </div>
})
 }
     </Box>
        <Box sx={{textAlign : 'center'}}> 
            <Button onClick={()=>{setpage(1)}} variant='contained' color={'warning'} ><i class="fa-solid fa-floppy-disk"></i> &nbsp; save</Button>
            </Box>
     <br/>
     </Paper>
  </Box>
}