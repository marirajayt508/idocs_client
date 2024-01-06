import { Button, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import React, { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
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

export default function Basicdetails({ d }) {
    const [fields, setFields] = useState([]);
    const cstate = useContext(Context);
    const [open,setOpen] = useState(false)
    const [select,setSelect] = useState('all')

    useEffect(() => {
        setFields(cstate.fields);
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
                const fd = new FormData();
                fd.append('username',sessionStorage.getItem('un'))
                fd.append('filename',name)
                        fd.append('file',file)
                     
            //  uploads[ind].value= `${sessionStorage.getItem('un').slice(0,-5)}/${name.toUpperCase()+"_"+sessionStorage.getItem('un').toUpperCase().slice(0,-5)}`
            //  tu[ind].value= `${sessionStorage.getItem('un').slice(0,-5)}/${name.toUpperCase()+"_"+sessionStorage.getItem('un').toUpperCase().slice(0,-5)}`
             axios.post(api+"users/access/",fd,{ headers: { 'Content-Type': 'multipart/form-data'}},).then((res)=>{
            setOpen(false)
           }).catch((err)=>{
            setOpen(false)
            console.log(err)
           })
        //    axios.put(api+"save/setuplod",{
        //     "_id" : sessionStorage.getItem("un"),
        //     uploads
        //  }).catch((e)=>{
        //     toast.error("Network Error!")
        //  })
    
      } 

      const showComment = (cmnt)=>{
            alert(cmnt)
      }

      const filterTable=(value)=>{
        if(!value.toLowerCase().includes('all'))
    {    let temp = fields.filter((v)=>{
            return v.status == value}) 
        setFields(temp)
      }
    else
    {
        setFields(cstate.fields)
    }
    }

    return <Box component="main" sx={{ p: 1 }}>
        {/* <button onClick={()=>console.log(d)}>TETS</button> */}
        <Paper sx={{ p: 2, width: "1000px" }}>
            <small className='fw-bold'><i class="fa-solid fa-user"></i> USER FORM</small> 
            <div style={{ 'border': '1px solid grey', 'width': '90px' }} />
            <div style={{float : 'right'}}>
<select className="text-center" onChange={(e)=>filterTable(e.target.value)} style={{height : '30px', width : '100%'}}>
  <option value='all'> All </option>
  <option value="upending"> Submission Pending </option>
  <option value="apending"> Approval Pending </option>
  <option value="approved"> Approved </option>
  <option value="rejected"> Rejected </option>
</select> 
</div>
            <Divider />
            <Box sx={{ p: 3 }}>
                {fields.length ?fields.map((v, ind) => {
                    return <div className='row p-3'>
                        <div className='col-md-3'>
                            {v.mandate && <span className='text-danger  fw-bolder'>* </span>}
                            {v.name}
                        </div>
                        <div className='col-md-3'>
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
                        </div>
                        <div className='col-md-3'>
                            {v.status.toLowerCase().includes('approved') && <Typography sx={{ fontSize: 14 }} className={`text-${v.status.toLowerCase().includes('approved') && 'success'}`} gutterBottom><i class="fa-solid fa-check"></i> <span>Approved</span> </Typography>}
                            {v.status.toLowerCase().includes('rejected') && <Typography sx={{ fontSize: 14 }} className={`text-${v.status.toLowerCase().includes('rejected') && 'danger'}`} gutterBottom><i class="fa-solid fa-xmark"></i> <span>Rejected</span> </Typography>}
                            {/* {v.status.toLowerCase().includes('apending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'primary'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Approval Pending</span> </Typography>} */}
                            {/* {v.status.toLowerCase().includes('upending')&&<Typography sx={{ fontSize: 14 }}  className={`text-${v.status.toLowerCase().includes('apending') && 'warning'}`} gutterBottom><i class="fa-solid fa-clock"></i> <span>Submission Pending</span> </Typography>} */}
                        </div>
                        <div className='col-md-3'>
                            {v.status.toLowerCase().includes('rejected') && <div className="btn btn-primary" onClick={()=>showComment(v.comments)}><i class="fa-regular fa-eye"></i> View Comment</div>}
                        </div>
                    </div>;
                }) : <span className='text text-danger fw-bold col-md-6 text-center'><i class="fa-solid fa-mug-hot"></i> {`TAKE A CUP OF COFFE, NO FIELDS HERE WHICH YOU TRY TO FIND.`}.</span>}
            </Box>
            {/* <Box sx={{ textAlign: 'center' }}>
                <Button onClick={() => {
                    save();
                }} variant='contained' color={'warning'}><i class="fa-solid fa-floppy-disk"></i> &nbsp; save</Button>
            </Box>
            <br /> */}
            <small className='text text-primary'>Note: All Files and Values are Auto Saved.</small>
        </Paper>
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
    </Box>;
}
