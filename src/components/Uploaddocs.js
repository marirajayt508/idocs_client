import { Button, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import React,{useState} from 'react';
import axios from 'axios';
import { api } from '../util';

export default function Uploaddocs ({setpage,uploades,setupload,d})
{
    const [ufiles,setUfiles] = useState({});
    const [cfiles,setCfiles] = useState([]);
    const handleFileUpload = (event,val) => {
        const file = event.target.files[0];
        ufiles[val] = file;
        setCfiles([...cfiles,val])
        setUfiles(ufiles)
        const fd = new FormData();
        fd.append('username',d.fullname)
        fd.append('file',file)
        let url = api+"users/access/"+val;
        console.log(url,fd)
           axios.post(api+"users/access/"+val,fd,{ headers: { 'Content-Type': 'multipart/form-data'}}).then((res)=>{
            console.log("UPLOADED")
           }).catch((err)=>{
            console.log(err)
           })
      } 
        

      const submit = ()=>{
if(!(cfiles.length != uploades.length))
{
    // d['uploades'] = ufiles;
    // let formData = objectToFormData(d);
    // axios.post(api+"users/access",formData,{
    //     headers : {"Content-Type" : "multipart/formdata"}
    //   })
    // const fd = new FormData();
    // fd['username'] = d.fullname
// cfiles.forEach((v)=>{
        // fd['file'] = ufiles["aadhar"]
    // })
    // cfiles.forEach((v)=>{
    //         axios.post(api+"users/access/"+v,fd,(res)=>{
    //             console.log(res)
    //         },(err)=>{
    //             console.log(err)
    //         })
    //         console.log(fd)
    // })
}
      }


    return       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
 <Paper sx={{p:5, width : "1000px"}}>
    <h2>UPLOAD DOCUMENTS</h2>
    <Divider/>
    <br/>
    <Paper sx={{p : 2}}>
 { uploades.length?
        uploades?.map((val)=>{
            return   <Grid  container sx={{p:2}} spacing={2}><Grid item xs={3}>
                <label style={{fontWeight : "bold"}}>{val?.name?.toUpperCase()}</label></Grid>
                <Grid item xs={3}>     <div>
      <label style={{backgroundColor : "navy"}} className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-sghohy-MuiButtonBase-root-MuiButton-root" htmlFor={`upload${val.name}`}>
        Select file
      </label>
      <Input
        id={`upload${val.name}`}
        type="file"
        sx={{display:'none'}}
        onChange={(e)=>handleFileUpload(e,val.name)}
      /><br/>
      {cfiles.indexOf(val.name)!=-1 && <lable>{val.name.toUpperCase()} uploaded</lable>}
    </div>
          </Grid></Grid>
        })
     : <Box style={{textAlign : 'center', color : 'green', fontWeight : 'bold'}}>NO DOCUMENTS NEED</Box>}
     </Paper>
     <br/>
     <br/>
     <Box style={{textAlign : 'center'}}>
     <Button onClick={()=>{setpage(0)}} variant='contained' >Back</Button> &nbsp; &nbsp; <Button variant="contained" sx={{backgroundColor : "green"}} onClick={()=>{
        submit()
     }}>submit</Button>
     </Box>
     </Paper>
  </Box>
}