import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Basicdetails from './Basicdetails';
import Uploaddocuments from './Uploaddocs';
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { api } from '../util';
import Dashboard from './utils/dashboard';

export default function Userbody ({setpage,popup,menu,status,fields,tdatas,uds})
{
    const [udata,setUdata] = useState({})
    const [details,setDetails] = useState({
    })
    const [uploads,setUploads] = useState({
    })
    let data =  sessionStorage.getItem('un').slice(0,-5);
    useEffect(()=>{
        axios.post(api+"users/get",{
            username : sessionStorage.getItem("un")
        }).then((res)=>{
            setUdata(res.data.datas)
        })
    },[])

    const components = [
<Dashboard popup={()=>popup()} status={status} tdatas={tdatas}/>,
<Basicdetails fields={fields} setdetails={(v)=>setDetails(v)} d={details}  setpage={(v)=>setpage(v)}/>,
<Uploaddocuments uploads={uploads} d={details} setupload={(v)=>{setUploads(v)}} setpage={(v)=>setpage(v)}/>
    ]
    return       <Box component="main">
    <Toolbar />
    {
        components.map((cmpnt)=>{
            return <>
            {cmpnt.type.name.toLowerCase().trim()==menu.toLowerCase().trim().split(' ').join('') && cmpnt}
            </>
        })
    }
  </Box>
}