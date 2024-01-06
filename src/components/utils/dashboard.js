import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie  } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button } from "@mui/material";
import { Table, Select, MenuItem, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import React,{useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHourglass, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LinearProgress from '@mui/material/LinearProgress';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({status,tdatas,popup})
{
  const [ps,setPs] = useState([])
  const [open,setOpen] = useState(false)
  const [fields, setFields] = useState(tdatas);
  const [table,setTable] = useState(tdatas)
useEffect(()=>{
  let pending = tdatas.filter((val)=>{
   return val.status.toLowerCase().includes('upending')
  })
  setPs(pending)
  setFields(tdatas)
  setTable(tdatas)
},[tdatas])
const upending = tdatas.filter((val)=>{
  return val.status.toLowerCase().includes('upending')
 })
 const apending = tdatas.filter((val)=>{
  return val.status.toLowerCase().includes('apending')
 })
 const approved = tdatas.filter((val)=>{
  return val.status.toLowerCase().includes('approved')
 })
 const rejected = tdatas.filter((val)=>{
  return val.status.toLowerCase().includes('rejected')
 })
  let role = sessionStorage.getItem('role');
  let completed = fields.filter((v)=>  v.value!='' )
   let c = (completed.length/fields.length)*100;
   let p = 100 - c
  //  p = isFinite(p)?p:100
 let a = fields.filter((v)=>  v.status.toLowerCase().includes('approved') ).length;
 let ap = (a/fields.length)*100;
 ap = ap?ap:100;
    const chart_datas = {
        labels: ['Approved', 'Pending'],
        datasets: [
          {
            label: 'Basic Details',
            data: [ap,(100-ap)],
            backgroundColor: [
  // 'rgba(75, 192, 192, 0.2)',
  // 'rgba(255, 206, 86, 0.2)'
  'lightgreen','lightcoral'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
    //   context.chart.data.labels[context.dataIndex] + ': ' + 
      const options = {
        plugins: {
            datalabels: {
                formatter: (value, context) => {
                    return value+"%";
                  },
                  color: 'Black',
                  display: true,
              },
        },
      };
      
      const cardLable = [{
        name : 'Submission Pending',
        icon : faClock
      },
    {
      name : 'Approval Pending',
      icon : faHourglass
    },
  {
    name : 'Data Rejected',
    icon :  faTimesCircle
  },
{
  name : 'Data Approved',
  icon : faCheckCircle
}];

const filterTable=(value)=>{
  if(!value.toLowerCase().includes('all'))
{    let temp = fields.filter((v)=>{
  // console.log(v.status == value)
      return v.status == value
    }
      ) 
  setTable(temp)
}
else
{
  setTable(fields)
}
}
const cardStyle = {
  width: '500px', // Set the desired width here
  marginBottom: '20px', // Adjust margin as needed
};
const data = [
  { name: 'John Doe', age: 25},
  { name: 'Jane Smith', age: 30},
  { name: 'Bob Johnson', age: 22},
];
console.log(table)
    return <Box sx={{p :3}}>
          <Typography variant="h6" style={{ fontFamily: 'Montserrat', fontSize: '24px'}}>
            Dashboard
          </Typography>
          <div style={{ 'border': '1px solid grey', 'width': '150px' }} />
          <br/>
      <div className="row">
        <div className="col-md-6">
        <Card>
      <CardHeader title="Saved" style={{ backgroundColor: '#e4e8e5', color: 'black', width: '500px' }} />
      <CardContent>
        <Typography variant="body1">
        <LinearProgress variant="determinate" value={c} />
        </Typography>
      </CardContent>
      <CardActions>
  <small>{c} Data Saved</small>
      </CardActions>
    </Card>
    <br/>
    <Typography variant="body1" style={{ width: '300px', height: '300px' }} className="text-center">
        <Doughnut  data={chart_datas} options={options} plugins={[ChartDataLabels]} />
        </Typography>
    </div>
    <div className="col-md-6">
    <TableContainer sx={{width : '140%'}} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field Name</TableCell>
            <TableCell className="text-center">
            <select className="text-center" onChange={(e)=>filterTable(e.target.value)} style={{height : '30px', width : '70%', border : "none", outline : 'none'}}>
  <option value='all'> All </option>
  <option value="upending"> Submission Pending </option>
  <option value="apending"> Approval Pending </option>
  <option value="approved"> Approved </option>
  <option value="rejected"> Rejected </option>
</select> 
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table.length ? table.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
              {row.status.toLowerCase().includes('upending') && <span className={`badge alert-warning p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-clock"></i> &nbsp;Submission Pending</span>}
            {row.status.toLowerCase().includes('apending') && <span className={`badge alert-primary p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-clock"></i> &nbsp;Approval Pending</span>}
            {row.status.toLowerCase().includes('approved') && <span className={`badge alert-success p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-check"></i> &nbsp;Approved</span>}
            {row.status.toLowerCase().includes('rejected') && <span className={`badge alert-danger p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-xmark"></i> &nbsp;Rejected</span>}
              </TableCell>
            </TableRow>
          )): <TableRow><TableCell colSpan={2} className="text-center fw-bold text-primary"><i class="fa-solid fa-face-smile"> </i> Hey, No fields found on the status you want</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </Box>
}