import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie  } from "react-chartjs-2";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({status,tdatas})
{
  // rgba(75, 192, 192, 0.2)',
  // 'rgba(255, 206, 86, 0.2)',
  let role = sessionStorage.getItem('role');
    const bdatas = {
        labels: ['Completed', 'Pending'],
        datasets: [
          {
            label: 'Basic Details',
            data: [status.up-status.tf,status.tf],
            backgroundColor: [
  'rgba(75, 192, 192, 0.2)',
  'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const udatas = {
        labels: ['Completed', 'Pending'],
        datasets: [
          {
            label: 'Basic Details',
            data: [50,50],
            backgroundColor: [
  'rgba(75, 192, 192, 0.2)',
  'rgba(255, 206, 86, 0.2)'
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
        icon : 'clock'
      },
    {
      name : 'Approval Pending',
      icon : 'clock'
    },
  {
    name : 'Data Rejected',
    icon : 'xmark'
  },
{
  name : 'Data Approved',
  icon : 'check'
}];
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
<br/>
      <div className="row p-2" style={{width : "100%", padding : '5px'}}>
        {role == 'user' && <>
       {
        cardLable.map((cl)=>{
          return  <div className="col-md-3" style={{clear : 'right'}}>
          <Card sx={{ minWidth: 200 }}  onClick={()=>{alert('test')}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {cl.name.toLowerCase().includes('submission pending') &&<span className="text text-warning"><i class={`fa-solid fa-${cl.icon}`}></i> {cl.name}</span>}
          {cl.name.toLowerCase().includes('approval pending') &&<span className="text text-primary"><i class={`fa-solid fa-${cl.icon}`}></i> {cl.name}</span>}
          {cl.name.toLowerCase().includes('approved') &&<span className="text text-success"><i class={`fa-solid fa-${cl.icon}`}></i> {cl.name}</span>}
          {cl.name.toLowerCase().includes('rejected') &&<span className="text text-danger"><i class={`fa-solid fa-${cl.icon}`}></i> {cl.name}</span>}
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
          {tdatas.map((row,index) => (
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
              {row.status.toLowerCase().includes('upending') && <span className={`badge alert-warning p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-clock"></i> &nbsp;Submission Pending</span>}
              {row.status.toLowerCase().includes('apending') && <span className={`badge alert-primary p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-clock"></i> &nbsp;Approval Pending</span>}
              {row.status.toLowerCase().includes('approved') && <span className={`badge alert-success p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-check"></i> &nbsp;Approved</span>}
              {row.status.toLowerCase().includes('rejected') && <span className={`badge alert-danger p-2`} style={{width : "70%", fontWeight : 'bolder'}}><i class="fa-solid fa-xmark"></i> &nbsp;Rejected</span>}
                </TableCell>
                {/* <TableCell align="center">
               <div className="btn btn-primary"><i class="fa-regular fa-eye"></i> View Comment</div> 
                </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


       </Card>
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
        <Doughnut style={{width : '300px !important'}}  data={bdatas} options={options} plugins={[ChartDataLabels]} />
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
        <Doughnut  data={bdatas} options={options} plugins={[ChartDataLabels]} />
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
          {rows.map((row,index) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>


       </Card>
       </div>
       </>
       }
      </div>
    </>
}