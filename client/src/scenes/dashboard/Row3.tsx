import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { Cell, Pie, PieChart } from 'recharts'



const Row3 = () => {
  const {palette} = useTheme()
  const pieColors = [palette.primary[800], palette.primary[500]] // two colors
  const {data: kpiData} = useGetKpisQuery()
  const {data: productData } = useGetProductsQuery()
  const {data: transactionData } = useGetTransactionsQuery()

  const pieChartData = useMemo(() => {
    if(kpiData) {
      const totalExpenses = kpiData[0].totalExpenses; // get totalExpenses from kpiData
      return Object.entries(kpiData[0].expensesByCategory).map( // map over expensesByCategory
        ([key, value]) => { // destructure key and value
          return [
            {
              name: key,
              value:value
           },
           {
              name: `${key} of Total`,
              value: totalExpenses - value
           }
          ]
        }
      )
    }
  }, [kpiData])

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1, // make the column take up 1/3 of the width
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5, 
      renderCell: (params: GridCellParams) => `$${params.value}`
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5, 
      renderCell: (params: GridCellParams) => `$${params.value}` // renderCell means to render the value of the cell
    },
  ]

  const transactionsColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1, // make the column take up 1/3 of the width
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67, 
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35, 
      renderCell: (params: GridCellParams) => `$${params.value}` // renderCell means to render the value of the cell
    }, 
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.35, 
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length 
    },
  ]

  return (
    <>
          {/* gridArea g */}
      <DashboardBox gridArea="g">
        <BoxHeader title='List of Products' sideText={`${productData?.length} products`} />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",           
            }
          }}
        >

        <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter={true}
          rows={productData || []}
          columns={productColumns}
        />
        </Box>

      </DashboardBox>

          {/* gridArea h */}
      <DashboardBox gridArea="h">

      <BoxHeader title='Recent Orders' sideText={`${transactionData?.length} latest transactions`} />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            }, 
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",           
            }
          }}
        >

        <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter={true}
          rows={transactionData || []}
          columns={transactionsColumns}
        />
        </Box>
      </DashboardBox>

          {/* gridArea i */}
      <DashboardBox gridArea="i">
          <BoxHeader title="Expenses Breakdown by Category" sideText='+4%' />
          <FlexBetween mt={"0.5rem"} gap={"0.5rem"} p="0 1rem" textAlign={"center"} >
            {pieChartData?.map((data,i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart
                width={110}
                height={100}
                
              >
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='h5'>{data[0].name} </Typography>
            </Box>
            ))}
            
          </FlexBetween>
      </DashboardBox>

          {/* gridArea j */}
      <DashboardBox gridArea="j">

      </DashboardBox>
    </>
  )
}

export default Row3
