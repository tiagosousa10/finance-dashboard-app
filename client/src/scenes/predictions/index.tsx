import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery } from '@/state/api'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Props = {}

const Predictions = (props: Props) => {
   const {palette} = useTheme()
   const [isPredictions,setIsPredictions] = useState(false) 
   const {data: kpiData} = useGetKpisQuery()


  return (
    <DashboardBox 
      width={"100%"}
      height={"100%"}
      padding={"1rem"}
      overflow={"hidden"}
    > 
      <FlexBetween m="1rem 2.5rem" gap={"1rem"}>
         <Box>
            <Typography variant='h3' >
               Revenue and Predictions
            </Typography>
            <Typography variant='h6'>
               charted revenue and predicted revenue based on a simple linear regression model
            </Typography>
         </Box>
         <Button 
            onClick={() => setIsPredictions(!isPredictions)}
            sx={{
               color: palette.grey[900],
               backgroundColor: palette.grey[700],
               boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)",
            }}
         >
            Show Predicted Revenue for Next Year
         </Button>
      </FlexBetween>

       <ResponsiveContainer width="100%" height="100%">
         <LineChart              
            data={formattedData}
            margin={{
               top: 20,
               right: 75,
               left: 20,
               bottom: 80,
            }}
         >
            <CartesianGrid strokeDasharray="3 3"  stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{fontSize: "10px"}} > 
               <Label value ="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis  
               domain={[12000, 26000]}
               tickLine={false} 
               axisLine={{strokeWidth : '0'}} 
               style={{fontSize: "10px"}}
               tickFormatter={(value) => `$${value}`}
            > 
               <Label value="Revenue in USD" offset={-5} position="insideLeft" angle={-90} />
            </YAxis>
            <Tooltip  />
            <Legend verticalAlign='top' />
            <Line 
               type="monotone"
               dataKey="Actual Revenue"
               stroke={palette.primary.main}
               strokeDasharray={0}
               dot={{strokeWidth:5}}
            />
            <Line 
               type="monotone"
               dataKey="Regression Line"
               stroke="#8884d8"
               dot={false}
            />
         </LineChart>
       </ResponsiveContainer>
    </DashboardBox>
  )
}


export default Predictions;
