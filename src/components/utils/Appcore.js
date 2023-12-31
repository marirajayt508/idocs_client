import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Appdrawer from './Appdrawer';
import { useNavigate } from 'react-router-dom';
import Userbody from '../userBody';
import Admin from '../admin/admin';
import Swal from 'sweetalert2';

export default function Apputil() {
  const [page,setPage] = useState(0)
  const [isup,setisup] = useState(false)
  const [signin,setsignin] = useState(false)
  const [menu,setMenu] = useState('Dashboard')
  const [fields,setFields] = useState([])
  const [uploads,setUploads] = useState([])
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
  setFields([
    {
     name : 'Full Name',
     type : 'text',
     status : 'upending',
     value : '',
     mandate : true,
     comments : ''
    },
    {
        name : 'Gender',
        type : 'radio',
        options : ['Male','Femal'],
        status : 'upending',
        value : '',
        mandate : true,
        comments : ''
    },
    {
        name : 'Education',
        type : 'check',
        options : ['SSLC','HSC'],
        status : 'upending',
        value : '',
        mandate : true,
        comments : ''
    },
    {
        name : 'State',
        type : 'select',
        options : ['Tamilnadu','Andra'],
        status : 'upending',
        value : '',
        mandate : true,
        comments : ''
    },
]
)

setUploads([
  {
   name : 'Aadhar Card',
   type : 'document',
   status : 'upending',
   value : '',
   mandate : true,
   comments : ''
  },
  {
      name : 'Pan Card',
      type : 'text',
      status : 'upending',
      value : '',
      mandate : true,
      comments : ''
  },
  {
      name : 'SSLC',
      type : 'document',
      status : 'upending',
      value : '',
      mandate : true,
      comments : ''
  },
  {
      name : 'HSC',
      type : 'document',
      status : 'upending',
      value : '',
      mandate : true,
      comments : ''
  },
]
)
    }
  },[])
  //upending, apending, approved, rejected
 

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
}
  return (
    <Box sx={{ display: 'flex' }}>
       <Navbar token={signin}/>
      <Appdrawer status={status} tdatas={tdatas} udraw={userMenu} adraw={adminMenu} isUpload={isup} token={signin} menu={menu} page={page} setmenu={(v)=>setMenu(v)} setpage={(v)=>setPage(v)}/>
     {signin && signin.role=='user' && <Box sx={{ display: 'flex' }}><CssBaseline /> <Userbody popup={()=>popup()} tdatas={tdatas} status={status} fields={fields} uploads={uploads} udraw={userMenu}  menu={menu} isup={isup} setisup={(v)=>setisup(v)} page={page} datas={signin} username={signin.username} setpage={(v)=>setPage(v)}/></Box>}
      {signin && signin.role=='admin' && <Box sx={{ display: 'flex' }}><CssBaseline /><Admin adraw={adminMenu} menu={menu}/></Box>}
   </Box>
  );
}