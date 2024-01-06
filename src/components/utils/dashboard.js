import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie  } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import React,{useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHourglass, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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
   console.log(p,c)
    const chart_datas = {
        labels: ['Saved', 'Pending'],
        datasets: [
          {
            label: 'Basic Details',
            data: [c,p],
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

      function createData(name, status,cn,cmnds) {
        return { name, status, cn };
      }
      
      const rows = [
        createData('Full Name', "Submission Pending","warning","Test"),
        createData('Email Id', "Approval Pending","primary","Test"),
        createData('Aadhar Card', "Data Approved","success","Test"),
        createData('Pancard', "Data Rejected Submit Again","danger","Document is Not Cleared upload a clear documents"),
      ];
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

    return <>
    {/* <br/> */}
    {/* <Grid container  rowSpacing={2} sx={{textAlign : 'center'}} alignContent='center' columnSpacing={{ xs: 10, sm: 20, md: 30 }}>
    <Grid item xs={6}>
   <strong><u>Basic Details Status</u></strong> 
  </Grid>
  <Grid item xs={6}>
   <strong><u>Documents Upload Status</u></strong>
  </Grid>
  <Grid item xs={6}>
  <Doughnut  data={datas} options={options} plugins={[ChartDataLabels]} />
  </Grid>
  <Grid item xs={6}>
    <Doughnut  data={datas} options={options} plugins={[ChartDataLabels]} />
  </Grid>
</Grid>
<br/>
<Box sx={{textAlign : 'center'}}>
<div class="alert alert-warning fw-bold" role="alert">
  Status : Document Submition Pending
</div>
</Box> */}

      <div className="row" style={{width : "100%", padding : '5px'}}>
        {role == 'user' && <>
       {
        cardLable.map((cl)=>{
          return  <div className="col-md-3" style={{clear : 'right'}}>
            <br/>
          <Card sx={{ minWidth: 200, boxShadow : "5px 5px 5px 5px lightblue" }} >
          {/* onClick={()=>{setOpen(true)}} */}
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
          </div>
        })
       }
       <hr/>

        {/* <div className="col-md-6" style={{clear : 'right'}}>
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Basic Details
        </Typography>
        <Typography component="div" style={{width: '300px'}}>
        <Doughnut style={{width : '300px !important'}}  data={datas} options={options} plugins={[ChartDataLabels]} />
        </Typography> */}
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      {/* </CardContent>
    </Card>
        </div>
        <div className="col-md-6" style={{clear : 'right'}}>
        <Card sx={{ minWidth: 270 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Document Upload
        </Typography>
        <Typography  component="div" style={{width: '300px'}}>
        <Doughnut  data={datas} options={options} plugins={[ChartDataLabels]} />
        </Typography>
      </CardContent>
    </Card>
        </div> */}
       <div>
        <br/>
        <div className="row">
<div className="col-md-8">
<Card>
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="simple table">
      <TableHead style={{'backgroundColor' : '#512da8' }}>
        <TableRow>
        <TableCell align="center" style={{'color' : 'white', fontWeight : 'bolder'}}>S.No</TableCell>
          <TableCell align="center" style={{'color' : 'white', fontWeight : 'bolder'}}>Fields</TableCell>
          <TableCell align="center" style={{'color' : 'white', fontWeight : 'bolder'}}>
            Status
         <div style={{textAlign : 'center'}}>
         <select className="text-center" onChange={(e)=>filterTable(e.target.value)} style={{height : '30px', width : '70%'}}>
  <option value='all'> All </option>
  <option value="upending"> Submission Pending </option>
  <option value="apending"> Approval Pending </option>
  <option value="approved"> Approved </option>
  <option value="rejected"> Rejected </option>
</select> 
</div>
          </TableCell>
          {/* <TableCell align="center" style={{'color' : 'white', fontWeight : 'bolder'}}>Commands</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        { table.length? table.map((row,index) => (
          <TableRow  
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
                         <TableCell align="center" component="th" scope="row">
              {index+1}
            </TableCell>
            <TableCell align="center" component="th" scope="row">
              <span className={row.value? 'text text-success' : 'text text-danger'}>{row.name.toUpperCase()}<br/></span>
            </TableCell>
            <TableCell align="center">
            {row.status.toLowerCase().includes('upending') && <span className={`badge alert-warning p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-clock"></i> &nbsp;Submission Pending</span>}
            {row.status.toLowerCase().includes('apending') && <span className={`badge alert-primary p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-clock"></i> &nbsp;Approval Pending</span>}
            {row.status.toLowerCase().includes('approved') && <span className={`badge alert-success p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-check"></i> &nbsp;Approved</span>}
            {row.status.toLowerCase().includes('rejected') && <span className={`badge alert-danger p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-xmark"></i> &nbsp;Rejected</span>}
                            </TableCell>
              {/* <TableCell align="center">
             <div className="btn btn-primary"><i class="fa-regular fa-eye"></i> View Comment</div> 
              </TableCell> */}
          </TableRow>
        )) : <TableRow><TableCell colSpan={3} className="text-center fw-bold text-primary"><i class="fa-solid fa-face-smile"> </i> Hey, No fields found on the status you want</TableCell></TableRow>}
      </TableBody>
    </Table>
  </TableContainer>


     </Card>
</div>
<div className="col-md-4">
<Doughnut  data={chart_datas} options={options} plugins={[ChartDataLabels]} />
<br/>
<div className='text-center'>
<span className="text-primary fw-bold">FORM FILLED: {c}%</span>
</div>
</div>
        </div>
       </div>
       </>}

       {
        role == 'admin' && <>
        <div className="col-md-6" style={{clear : 'right'}}>
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Basic Details
        </Typography>
        <Typography component="div" style={{width: '300px'}}>
        <Doughnut style={{width : '300px !important'}}  data={chart_datas} options={options} plugins={[ChartDataLabels]} />
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
    </Card>
        </div>
        <div className="col-md-6" style={{clear : 'right'}}>
        <Card sx={{ minWidth: 270 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Document Upload
        </Typography>
        <Typography  component="div" style={{width: '300px'}}>
        <Doughnut  data={chart_datas} options={options} plugins={[ChartDataLabels]} />
        </Typography>
      </CardContent>
    </Card>
        </div>
       <div>
        <br/>
        <Card>
      
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead className="bg-primary">
          <TableRow>
          <TableCell align="center" style={{'color' : 'white', fontWeight : 'bolder'}}>S.No</TableCell>
            <TableCell align="center" style={{'color' : 'white', fontWeight : 'bolder'}}>Fields</TableCell>
            <TableCell align="center" style={{'color' : 'white', fontWeight : 'bolder'}}>Status</TableCell>
            {/* <TableCell align="center" style={{'color' : 'white', fontWeight : 'bolder'}}>Commands</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.length? table.map((row,index) => (
            <TableRow  
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                           <TableCell align="center" component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.name.toUpperCase()}
              </TableCell>
              <TableCell align="center">
              <span className={`badge alert-${row.cn} p-2`} style={{width : "70%", fontWeight : 'bolder'}}>
                
              {row.status.toLowerCase().includes('pending') && <><i class="fa-solid fa-clock"></i> &nbsp;</>}
              {row.status.toLowerCase().includes('approved') && <><i class="fa-solid fa-check"></i> &nbsp;</>}
              {row.status.toLowerCase().includes('rejected') && <><i class="fa-solid fa-xmark"></i> &nbsp;</>}
                 {row.status}</span>
                </TableCell>
                {/* <TableCell align="center">
               <div className="btn btn-primary"><i class="fa-regular fa-eye"></i> View Comment</div> 
                </TableCell> */}
            </TableRow>
          )) : <TableRow><TableCell ><span>TTTT</span></TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>


       </Card>
       </div>
       </>
       }
      </div>
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <table class="table table-striped">
  <tbody>
{
  ps.length ? ps.map((data)=>{
    return     <tr>
    <td>{data.name}</td>
    <td>Pending</td>
  </tr>
  }) : <span>No Data Found.</span>
}
  </tbody>
</table>
         </DialogContentText>
         </DialogContent>
        <DialogActions>
          <Button  onClick={()=>{
            setOpen(false)
          }}>Ok</Button>
        </DialogActions>
      </Dialog>


    </>
}