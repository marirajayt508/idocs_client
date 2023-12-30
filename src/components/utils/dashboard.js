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
import Badge from "@mui/material/Badge";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard()
{
  // rgba(75, 192, 192, 0.2)',
  // 'rgba(255, 206, 86, 0.2)',
  let role = sessionStorage.getItem('role');
    const datas = {
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
        <div className="col-md-3" style={{clear : 'right'}}>
        <Card sx={{ minWidth: 200 }} className="alert alert-warning">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <i class="fa-solid fa-clock"></i>  Submission Pending
        </Typography>
        <Typography  component="div" style={{width: '300px'}} className="text-warning">
          1
        </Typography>
      </CardContent>
    </Card>
        </div>
        <div className="col-md-3" style={{clear : 'right'}}>
        <Card sx={{ minWidth: 200 }} className="alert alert-primary">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <i class="fa-solid fa-clock"></i>  Approval Pending
        </Typography>
        <Typography  component="div"  style={{width: '300px'}} className="text-primary">
          1
        </Typography>
      </CardContent>
    </Card>
        </div>
        <div className="col-md-3" style={{clear : 'right'}}>
        <Card sx={{ minWidth: 200 }} className="alert alert-danger">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <i class="fa-solid fa-xmark"></i> Documents Rejected
        </Typography>
        <Typography  component="div" style={{width: '300px'}} className="text-danger">
          1
        </Typography>
      </CardContent>
    </Card>
        </div>
        <div className="col-md-3" style={{clear : 'center'}}>        <Card sx={{ minWidth: 210 }} className="alert alert-success">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <i class="fa-solid fa-check"></i> Approved
        </Typography>
        <Typography  component="div" style={{width: '300px'}} className="text-success">
          1
        </Typography>
      </CardContent>
    </Card></div>
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
        <Doughnut style={{width : '300px !important'}}  data={datas} options={options} plugins={[ChartDataLabels]} />
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
        <Doughnut  data={datas} options={options} plugins={[ChartDataLabels]} />
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