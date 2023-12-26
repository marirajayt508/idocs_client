import { Button, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import React,{useState,useEffect} from 'react';

export default function Basicdetails ({setpage,fields,d,setdetails})
{

    const getVal = (e,val)=>{
        d[val] = e.target.value;
        setdetails(d)
    }

    return       <Box component="main" sx={{  p: 1 }}>
        {/* <button onClick={()=>console.log(d)}>TETS</button> */}
  <Paper sx={{p:2, width : "1000px"}}>
    <h2>BASIC DETAILS</h2>
    <Divider/>
    <br/>
    <Box sx={{p : 3}}>
    <Grid container sx={{p : 1}} spacing={3}><Grid item xs={4}>
                <label style={{fontWeight : "bold"}}>{"full name".toUpperCase()}</label></Grid>
                <Grid item xs={3}> <Input value={d.fullname?.toUpperCase()} />
          </Grid></Grid>
          <Grid container sx={{p : 1}} spacing={3}><Grid item xs={4}>
                <label style={{fontWeight : "bold"}}>{"email id".toUpperCase()}</label></Grid>
                <Grid item xs={3}> <Input value={d.email}  />
          </Grid></Grid>
  {
        fields?.map((val)=>{
            return   <Grid container sx={{p : 1}} spacing={3}><Grid item xs={4}>
                <label style={{fontWeight : "bold"}}>{val.toUpperCase()}</label></Grid>
                <Grid item xs={3}> <Input placeholder={`Enter your ${val}`} onChange={((v)=>{getVal(v,val)})}/>
          </Grid></Grid>
        })
     }
     </Box>
     <br/>
     <br/>
         <Button sx={{float : "right"}} onClick={()=>{setpage(1)}} variant='contained'>Next</Button><br/>
     <br/>
     </Paper>
  </Box>
}