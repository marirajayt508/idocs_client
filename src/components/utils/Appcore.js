import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Appdrawer from './Appdrawer';
import { styled, useTheme } from '@mui/material/styles';
import Userbody from '../userBody';
import Admin from '../admin/admin';
import Swal from 'sweetalert2';
import axios from 'axios';
import { api } from '../../util';
import { toast } from 'react-toastify';
import { Context } from './context';
import { useNavigate } from 'react-router-dom';
// import DraweerH

export default function Apputil() {
  const [page,setPage] = useState(0)
  const [isup,setisup] = useState(false)
  const [signin,setsignin] = useState(false)
  const [menu,setMenu] = useState('Dashboard')
  const [fields,setFields] = useState([])
  const [uploads,setUploads] = useState([])
  const [dopen,setDopen] = useState(true)

  const navigate = useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem('un')??false)
    { 
  let signdata = {
    'un' : sessionStorage.getItem('un'),
    'mail' : sessionStorage.getItem('mail'),
    'role' : sessionStorage.getItem('role')
  };
  setsignin(signdata)
    }
    axios.post(api+"save/get/",{
      _id : sessionStorage.getItem('un'),
      role : sessionStorage.getItem('role')
    })
    .then((res)=>{
      setFields(res.data.datas.fields)
      // setUploads(res.data.datas.uploads)
    })
    .catch((e)=>{
      toast.error("Network Error, Try Again")
      navigate('/login')
    })
  },[])
  //upending, apending, approved, rejected
 const role = sessionStorage.getItem('role')
 const userMenu = ["Dashboard","Basic Details"]
 const adminMenu = ['Dashboard', 'Manage Users', 'Pendings',"Documents","Settings"]
 let status = {}
 let tdatas = []
if(role == 'user')
{
tdatas =[...fields]
const up = tdatas.filter(field => field.status.toLowerCase().includes('upending')).length
const ap = tdatas.filter(field => field.status.toLowerCase().includes('apending')).length
const dr = tdatas.filter(field => field.status.toLowerCase().includes('reject')).length
const da = tdatas.filter(field => field.status.toLowerCase().includes('approved')).length
const sp = fields.filter(field => field.value != '' && field.status.toLowerCase().includes('upending')).length
const fieldValue =  fields.filter(field => field.value != '').length
const fieldLength = fields.length
// const uploadValue = uploads.filter(upload => upload.value != '' && upload.mandate).length
// const uploadLength = uploads.length


  status = {up,ap,dr,da,sp,
  tf : fields.length,
  fieldValue,
  fieldLength,
  }

  
const popup = (cl)=>{
  console.log(cl)
  Swal.fire({
    title: getTitle(cl),
    html: getHtml(),
    icon: getIcon(),
    confirmButtonText: 'Close',
  });
}

const getTitle = (cl)=>{
  return 'Instructions'
}
const getHtml = (cl)=>{
  return "<div><span>Enter Basic Details and upload your document. Track your data Submission status in dashboard. Once You filled the data then click save button & Before Submiting make sure all datas are filed.</span></div>";
}
const getIcon = (cl)=>{
  return "info"
}}
  return (
    <Box sx={{
      flexGrow: 1,
      transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
      marginLeft: dopen ? '170px' : '0', // Adjust the width based on the drawer state
    }}>
       <Navbar dopen={dopen} setDopen={(v)=>{setDopen(v)}}/>
       <Appdrawer dopen={dopen} status={status}  udraw={userMenu} adraw={adminMenu}  token={signin} menu={menu} setmenu={(v)=>setMenu(v)} tdatas={tdatas}/>
       <Box open={dopen}>
       <Context.Provider value={{fields,uploads, dopen}}>
       {signin && signin.role=='user' && <Box sx={{ display: 'flex' }}><CssBaseline /> <Userbody tdatas={tdatas} status={status} fields={fields} uploads={uploads} udraw={userMenu}  menu={menu}  datas={signin} username={signin.username} setpage={(v)=>setPage(v)}/></Box>}
       {signin && signin.role=='admin' && <Box sx={{ display: 'flex' }}><CssBaseline />I AM FROM ADMIN</Box>}
       </Context.Provider>
       </Box>
    {/* <div className='row'>
      <div className='col-lg-2'>
    
     </div>
      <div className='col-lg-10'>
        TTTT
      </div> */}
      
      {/* <Appdrawer status={status} tdatas={tdatas} udraw={userMenu} adraw={adminMenu} isUpload={isup} token={signin} menu={menu} page={page}  setmenu={(v)=>setMenu(v)} setpage={(v)=>setPage(v)}/> */}
     {/* <Context.Provider value={{fields,uploads}}>
     {signin && signin.role=='user' && <Box sx={{ display: 'flex' }}><CssBaseline /> <Userbody popup={()=>popup()} uds={uploads} tdatas={tdatas} status={status} fields={fields} uploads={uploads} udraw={userMenu}  menu={menu} isup={isup} setisup={(v)=>setisup(v)} page={page} datas={signin} username={signin.username} setpage={(v)=>setPage(v)}/></Box>}
      {signin && signin.role=='admin' && <Box sx={{ display: 'flex' }}><CssBaseline /><Admin adraw={adminMenu} menu={menu}/></Box>}
      </Context.Provider> */}
   {/* </div> */}
   </Box>
  );
}