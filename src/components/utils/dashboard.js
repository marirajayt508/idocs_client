import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie  } from "react-chartjs-2";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard()
{
  // rgba(75, 192, 192, 0.2)',
  // 'rgba(255, 206, 86, 0.2)',
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
    return <>
    <br/>
    <Grid container  rowSpacing={2} sx={{textAlign : 'center'}} alignContent='center' columnSpacing={{ xs: 10, sm: 20, md: 30 }}>
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
</Box>
    </>
}