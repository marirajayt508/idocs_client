import { Button, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import React,{useState,useEffect} from 'react';

export default function Basicdetails ({setpage,d,setdetails})
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
                <Grid item xs={3}> <Input defaultValue={d.fullname?.toUpperCase()} />
          </Grid></Grid>
          <Grid container sx={{p : 1}} spacing={3}><Grid item xs={4}>
                <label style={{fontWeight : "bold"}}>{"email id".toUpperCase()}</label></Grid>
                <Grid item xs={3}> <Input defaultValue={d.email}  />
          </Grid></Grid>
     </Box>
     <br/>
        <Box sx={{textAlign : 'center'}}> 
            <Button onClick={()=>{setpage(1)}} variant='contained' color={'warning'} >save</Button>
            </Box>
     <br/>
     </Paper>
  </Box>
}