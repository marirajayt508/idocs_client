import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Basicdetails from './Basicdetails';
import Uploaddocs from './Uploaddocs';
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { api } from '../util';

export default function Userbody ({setpage,page,username,setisup,isup})
{
    const [udata,setUdata] = useState({})
    const [details,setDetails] = useState({
    })
    const [uploades,setUploades] = useState({
    })
    let data =  sessionStorage.getItem('un').slice(0,-5);
    useEffect(()=>{
        axios.post(api+"users/get",{
            username : data
        },{
            headers : { "authorization": `Bearer ${sessionStorage.getItem('token')}`,}
        }).then((res)=>{
            setUdata(res.data.datas)
            console.log(res.data.datas)
            setisup(res.data.datas?.hasOwnProperty('uploades'))
            details['fullname']=res.data.datas?.username;
            details['email']=res.data.datas?.usermail;
            setDetails(details)
        })
    },[])
    return       <Box component="main">
    <Toolbar />
    {page && isup?<Uploaddocs d={details} setupload={(v)=>{setUploades(v)}} uploades={udata.uploades} setpage={(v)=>setpage(v)}/>:<Basicdetails setdetails={(v)=>setDetails(v)} d={details}  setpage={(v)=>setpage(v)}/>}
  </Box>
}