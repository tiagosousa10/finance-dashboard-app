import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery } from '@/state/api'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

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
    </DashboardBox>
  )
}


export default Predictions;
