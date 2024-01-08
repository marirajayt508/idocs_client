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
import DialogTitle from "@mui/material/DialogTitle";
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
   c = isFinite(c) ? c : 0;
 let a = fields.filter((v)=>  v.status.toLowerCase().includes('approved') ).length;
 let ap = (a/fields.length)*100;
//  ap = ap?ap:100;
 ap = isFinite(ap)?ap:0;
c=Math.ceil(c)
    const chart_datas = {
        labels: ['Completed', 'Pending'],
        datasets: [
          {
            label: 'Basic Details',
            data: [c,(100-c)],
            backgroundColor: [
  // 'rgba(75, 192, 192, 0.2)',
  // 'rgba(255, 206, 86, 0.2)'
  'lightgreen','white'
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
    return <Box sx={{p :3}}>
          <Typography variant="h6" style={{ fontFamily: 'Montserrat', fontSize: '24px'}}>
            Dashboard
          </Typography>
          <div style={{ 'border': '1px solid grey', 'width': '150px' }} />
          <br/>
      <div className="row">
        <div className="col-md-6">
    <Typography variant="body1" style={{ width: '700px', height: '400px' }} className="text-center">
        <Doughnut  data={chart_datas} options={options} plugins={[ChartDataLabels]} />
        </Typography>
        <br/>
        <Card>
      <CardHeader title={`${c}% Data Saved`} style={{ backgroundColor: 'lightyellow', color: 'black', width: '500px' }} />
      <CardContent>
        <Typography variant="body1">
        <div class="progress">
  <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: c+"%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
</div>
        </Typography>
      </CardContent>

    </Card>
        {/* <br/>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td className="text text-warning">Pending with you</td>
              <td>
              <span className="badge badge-warning p-2">{status.up}</span>
               </td>
            </tr>
            <tr>
              <td className="text text-primary">Pending with Admin</td>
              <td>
              <span className="badge badge-primary p-2">{status.ap}</span>
              </td>
            </tr>
            <tr>
              <td className="text text-success">Approved by Admin</td>
              <td>
              <span className="badge badge-success p-2">{status.da}</span>
              </td>
            </tr>
            <tr>
              <td className="text text-danger">Rejected by Admin</td>
              <td>
              <span className="badge badge-danger p-2">{status.dr}</span>
              </td>
            </tr>
          </tbody>
        </table> */}
  {/* {     table.map(cl=> {
    return <Card>
    <CardContent>
  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
  {cl.name.toLowerCase().includes('submission pending') &&<span className="text text-warning" onClick={()=>setPs(upending)}><FontAwesomeIcon icon={cl.icon} /> {cl.name}</span>}
  {cl.name.toLowerCase().includes('approval pending') &&<span className="text text-primary" onClick={()=>setPs(apending)}><FontAwesomeIcon icon={cl.icon} /> {cl.name}</span>}
  {cl.name.toLowerCase().includes('approved') &&<span className="text text-success" onClick={()=>setPs(approved)}><FontAwesomeIcon icon={cl.icon} /> {cl.name}</span>}
  {cl.name.toLowerCase().includes('rejected') &&<span className="text text-danger" onClick={()=>setPs(rejected)}><FontAwesomeIcon icon={cl.icon} /> {cl.name}</span>}
  </Typography>
  <Typography  component="div" style={{width: '300px'}}>
  {cl.name.toLowerCase().includes('submission pending') && <span className="text-warning"> &nbsp;{status.up}</span>}
  {cl.name.toLowerCase().includes('approval pending') && <span className="text-primary"> &nbsp;{status.ap}</span>}
  {cl.name.toLowerCase().includes('approved') && <span className="text-success"> &nbsp;{status.da}</span>}
  {cl.name.toLowerCase().includes('rejected') && <span className="text-danger"> &nbsp;{status.dr}</span>}
  </Typography>
  </CardContent>
  </Card>
  })   } */}
    </div>
    <div className="col-md-6">
    <Card>
      <CardHeader title={`${ap}% Data Approved`} style={{ backgroundColor: '#e4e8e5', color: 'black', width: '500px' }} />
      <CardContent>
        <Typography variant="body1">
        <div class="progress">
  <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: ap+'%', height :'300px'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50</div>
</div>
        </Typography>
      </CardContent>
      <CardActions>
       <Button onClick={()=>setOpen(true)}> View More</Button>
      </CardActions>
    </Card>
    <br/>
    <TableContainer sx={{width : '100%'}} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field Name</TableCell>
            <TableCell className="text-center">
            <select className="text-center" onChange={(e)=>filterTable(e.target.value)} style={{height : '30px', width : '70%', border : "none", outline : 'none'}}>
  <option value='all'> Status All </option>
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
    <Dialog onClose={()=>setOpen(false)} open={open}>
      <DialogContent>
        <table className="table table-striped">
          <tbody>
          <tr>
              <td className="text text-info">Saved by you</td>
              <td>
              <span className="badge badge-info p-2">{status.fieldValue}</span>
               </td>
            </tr>
            <tr>
              <td className="text text-warning">Pending with you</td>
              <td>
              <span className="badge badge-warning p-2">{status.up}</span>
               </td>
            </tr>
            <tr>
              <td className="text text-primary">Pending with Admin</td>
              <td>
              <span className="badge badge-primary p-2">{status.ap}</span>
              </td>
            </tr>
            <tr>
              <td className="text text-success">Approved by Admin</td>
              <td>
              <span className="badge badge-success p-2">{status.da}</span>
              </td>
            </tr>
            <tr>
              <td className="text text-danger">Rejected by Admin</td>
              <td>
              <span className="badge badge-danger p-2">{status.dr}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
    </Box>
}