import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Appdrawer from './Appdrawer';
import { useNavigate } from 'react-router-dom';
import Userbody from '../userBody';
import Admin from '../admin/admin';


export default function Apputil() {
  const [page,setPage] = useState(0)
  const [isup,setisup] = useState(false)
  const [signin,setsignin] = useState(false)
  const [menu,setMenu] = useState('Dashboard')
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
  },[])
  //upending, apending, approved, rejected
const fields = [
    {
     name : 'Full Name',
     type : 'text',
     status : 'upending',
     value : '',
     mandate : '',
     comments : ''
    },
    {
        name : 'Pan Card Number',
        type : 'text',
        status : 'upending',
        value : '',
        mandate : '',
        comments : ''
    },
    {
        name : 'Aadhar Card Number',
        type : 'text',
        status : 'upending',
        value : '',
        mandate : '',
        comments : ''
    },
    {
        name : 'Pan Card Number',
        type : 'text',
        status : 'upending',
        value : '',
        mandate : '',
        comments : ''
    },
]

const uploads = [
  {
   name : 'Aadhar Card',
   type : 'document',
   status : 'upending',
   value : '',
   mandate : '',
   comments : ''
  },
  {
      name : 'Pan Card',
      type : 'text',
      status : 'upending',
      value : '',
      mandate : '',
      comments : ''
  },
  {
      name : 'SSLC',
      type : 'document',
      status : 'upending',
      value : '',
      mandate : '',
      comments : ''
  },
  {
      name : 'HSC',
      type : 'document',
      status : 'upending',
      value : '',
      mandate : '',
      comments : ''
  },
]


let tdatas =[...fields,...uploads]
const up = tdatas.filter(field => field.status.toLowerCase().includes('upending')).length
const ap = tdatas.filter(field => field.status.toLowerCase().includes('apending')).length
const dr = tdatas.filter(field => field.status.toLowerCase().includes('reject')).length
const da = tdatas.filter(field => field.status.toLowerCase().includes('approved')).length
  const userMenu = ["Dashboard","Basic Details","Upload Documents"]
  const adminMenu = ['Dashboard', 'Manage Users', 'Pending Approval',"Add Client","Document Galary","Settings"]
  let status = {up,ap,dr,da,
  tf : fields.length,
  tu : uploads.length,
  }
  return (
    <Box sx={{ display: 'flex' }}>
       <Navbar token={signin}/>
      <Appdrawer udraw={userMenu} adraw={adminMenu} isUpload={isup} token={signin} menu={menu} page={page} setmenu={(v)=>setMenu(v)} setpage={(v)=>setPage(v)}/>
     {signin && signin.role=='user' && <Box sx={{ display: 'flex' }}><CssBaseline /> <Userbody tdatas={tdatas} status={status} fields={fields} uploads={uploads} udraw={userMenu}  menu={menu} isup={isup} setisup={(v)=>setisup(v)} page={page} datas={signin} username={signin.username} setpage={(v)=>setPage(v)}/></Box>}
      {signin && signin.role=='admin' && <Box sx={{ display: 'flex' }}><CssBaseline /><Admin adraw={adminMenu} menu={menu}/></Box>}
   </Box>
  );
}