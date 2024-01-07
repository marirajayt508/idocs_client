import { Button, Divider } from '@mui/material';
import Input from '@mui/material/Input';
import React, { useState, useEffect, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Context } from './utils/context';
import axios from 'axios';
import { api } from '../util';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Table, Select, MenuItem, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Basicdetails({ d }) {
    const [fields, setFields] = useState([]);
    const cstate = useContext(Context);
    const [open,setOpen] = useState(false)
    const [table,setTable] = useState([])
const navigate = useNavigate()
    useEffect(() => {
        setFields(cstate.fields);
        setTable(cstate.fields)
    }, []);

    function useThrottle(callback, delay) {
        useEffect(() => {
          let timeoutId;
      
          const throttledFunction = (...args) => {
            if (!timeoutId) {
              callback(...args);
              timeoutId = setTimeout(() => {
                timeoutId = null;
              }, delay);
            }
          };
      
          return () => {
            clearTimeout(timeoutId);
          };
        }, [callback, delay]);
    }

    useThrottle(() => save(), 1000); 

    const setText = (val, ind, type) => {
      
            fields[ind].value = val;
            setFields(fields);
         save()
    };

    const save = () => {
           axios.put(api + "save/setfield", {
                "_id": sessionStorage.getItem("un"),
                fields
            })
            
    // .then(() => {
    //     toast.success("Saved!");
    // }).catch((e) => {
    //     toast.error("Network Error!");
    // });
    };
    const handleFileUpload = (event,name,ind) => {
        setOpen(true)
        const file = event.target.files[0];
        if(file.type.includes('pdf'))
{                const fd = new FormData();
                fd.append('username',sessionStorage.getItem('un'))
                fd.append('filename',name)
                        fd.append('file',file)
                     
            //  uploads[ind].value= `${sessionStorage.getItem('un').slice(0,-5)}/${name.toUpperCase()+"_"+sessionStorage.getItem('un').toUpperCase().slice(0,-5)}`
            //  tu[ind].value= `${sessionStorage.getItem('un').slice(0,-5)}/${name.toUpperCase()+"_"+sessionStorage.getItem('un').toUpperCase().slice(0,-5)}`
             axios.post(api+"users/access/",fd,{ headers: { 'Content-Type': 'multipart/form-data'}},).then((res)=>{
            setOpen(false)
            toast.success("File Uploaded and Saved Successfully")
           }).catch((err)=>{
            setOpen(false)
            toast.error("Network Error, Try Again")
            navigate("/login")
           })
}   
else
{
toast.error("Please Upload PDF File")
setOpen(false)
}
//    axios.put(api+"save/setuplod",{
        //     "_id" : sessionStorage.getItem("un"),
        //     uploads
        //  }).catch((e)=>{
        //     toast.error("Network Error!")
        //  })
    
      } 

      const showComment = (cmnt,name)=>{
        Swal.fire({
          text: cmnt,
        });
      }

      const filterTable=(value)=>{
        if(!value.toLowerCase().includes('all'))
    {    let temp = fields.filter((v)=>{
            return v.status == value}) 
        setTable(temp)
      }
    else
    {
        setTable(fields)
    }
    }
    return <div style={{padding : "10px"}}>
              <Typography variant="h6" style={{ fontFamily: 'Montserrat', fontSize: '24px'}}>
           User Form
          </Typography>
          <div style={{ 'border': '1px solid grey', 'width': '150px' }} />
          <br/>
          <select className="text-center" onChange={(e)=>filterTable(e.target.value)} style={{height : '30px', width : '20%', border : "none", outline : 'none'}}>
  <option value='all'> Status All </option>
  <option value="upending"> Submission Pending </option>
  <option value="apending"> Approval Pending </option>
  <option value="approved"> Approved </option>
  <option value="rejected"> Rejected </option>
</select> 
<br/>
<br/>
    <TableContainer sx={{width : '1000px'}} component={Paper}>
      <Table>
        <TableBody>
          {table.length? table.map((v,ind) => (
            <TableRow key={v.id}>
              <TableCell>
              {v.mandate && <span className='text-danger  fw-bolder'>* </span>}
                {v.name}
                </TableCell>
                <TableCell>
                {v.type == 'check' && v.options.map((n) => {
                                return <FormControlLabel disabled={v.status.toLowerCase().includes('apending') || v.status.toLowerCase().includes('approved')}
                                    control={<Checkbox name={n} defaultChecked={n == v.value} />}
                                    label={n} />;
                            })}
{
    v.type == 'file' &&  <div>
    <label  className='btn btn-info' onClick={()=>(v.status.toLowerCase().includes('apending') || v.status.toLowerCase().includes('approved'))} 
    // &&showAlert(v.name)
    htmlFor={`upload${v.name}`}>
    <i class="fa-solid fa-upload"></i> &nbsp; Select file
    </label>
    <input
      id={`upload${v.name}`}
      type="file"
      style={{display:'none'}}
      onChange={(e)=>handleFileUpload(e,v.name,ind)}
      disabled={v.status.toLowerCase().includes('apending') || v.status.toLowerCase().includes('approved')}
    /><br/>
    {/* {cfiles.indexOf(val.name)!=-1 && <lable>{val.name.toUpperCase()} uploaded</lable>} */}
  </div>
}
                                        {v.type == 'radio' && <RadioGroup defaultValue={v.value}>{v.options.map((n) => {
                                return <FormControlLabel disabled={v.status.toLowerCase().includes('apending') || v.status.toLowerCase().includes('approved')} value={n} control={<Radio />} label={n} />;
                            })}</RadioGroup>}
                            {v.type == 'select' && <select disabled={v.status.toLowerCase().includes('apending') || v.status.toLowerCase().includes('approved')} class="form-select" id="selectOption">
                                <option selected={v.value == ''}>Select One</option>
                                {v.options.map((opt) => {
                                    return <option selected={v.value == opt} value={opt}>{opt}</option>;
                                })}
                            </select>}
                            {v.type == 'text' && <Input placeholder={`Enter your ${v.name}`} onChange={(e) => setText(e.target.value, ind)} defaultValue={v.value} disabled={v.status.toLowerCase().includes('apending') || v.status.toLowerCase().includes('approved')} />}
                </TableCell>
              <TableCell>
              {v.status.toLowerCase().includes('approved') && <Typography sx={{ fontSize: 14 }} className={`text-${v.status.toLowerCase().includes('approved') && 'success'}`} gutterBottom><i class="fa-solid fa-check"></i> <span>Approved</span> </Typography>}
                            {v.status.toLowerCase().includes('rejected') && <Typography sx={{ fontSize: 14 }} className={`text-${v.status.toLowerCase().includes('rejected') && 'danger'}`} gutterBottom><i class="fa-solid fa-xmark"></i> <span>Rejected</span> </Typography>}
                            {/* {v.status.toLowerCase().includes('apending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'primary'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Approval Pending</span> </Typography>} */}
                            {/* {v.status.toLowerCase().includes('upending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'warning'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Submission Pending</span> </Typography>} */}
              </TableCell>
              <TableCell>
              {v.status.toLowerCase().includes('rejected') && <div className="btn btn-danger" onClick={()=>showComment(v.comments,v.name.toUpperCase())}><i class="fa-regular fa-eye"></i> View</div>}
              </TableCell>
            </TableRow>
          )): <TableRow><TableCell colSpan={4}><span className='text text-danger fw-bold col-md-6 text-center'><i class="fa-solid fa-mug-hot"></i> {`TAKE A CUP OF COFFE, NO FIELDS HERE WHICH YOU TRY TO FIND.`}.</span></TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
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
    </div>
}
