import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Input, InputAdornment, Paper, TableBody, TableCell, TableRow, TextField, Toolbar } from "@material-ui/core";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { AccessTime, ArrowUpward, Search } from "@material-ui/icons";
import useTable from "components/Table/useTable";
import { getAllTableData } from "services/dataTableService";
import ChartistGraph from "react-chartist";
import CardFooter from "components/Card/CardFooter";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";
import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";



// const styles = {
//   cardCategoryWhite: {
//     "&,& a,& a:hover,& a:focus": {
//       color: "rgba(255,255,255,.62)",
//       margin: "0",
//       fontSize: "14px",
//       marginTop: "0",
//       marginBottom: "0"
//     },
//     "& a,& a:hover,& a:focus": {
//       color: "#FFFFFF"
//     }
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none",
//     "& small": {
//       color: "#777",
//       fontSize: "65%",
//       fontWeight: "400",
//       lineHeight: "1"
//     }
//   }
// };

// const useStyles = makeStyles(styles);

// export default function TableList() {
//   const classes = useStyles();
//   return (
//     <GridContainer>
//       <GridItem xs={12} sm={12} md={12}>
//         <Card>
//           <CardHeader color="primary">
//             <h4 className={classes.cardTitleWhite}>Simple Table</h4>
//             <p className={classes.cardCategoryWhite}>
//               Here is a subtitle for this table
//             </p>
//           </CardHeader>
//           <CardBody>
//             <Table
//               tableHeaderColor="primary"
//               tableHead={["Name", "Country", "City", "Salary"]}
//               tableData={[
//                 ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
//                 ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
//                 ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
//                 ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
//                 ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
//                 ["Mason Porter", "Chile", "Gloucester", "$78,615"]
//               ]}
//             />
//           </CardBody>
//         </Card>
//       </GridItem>
//       <GridItem xs={12} sm={12} md={12}>
//         <Card plain>
//           <CardHeader plain color="primary">
//             <h4 className={classes.cardTitleWhite}>
//               Table on Plain Background
//             </h4>
//             <p className={classes.cardCategoryWhite}>
//               Here is a subtitle for this table
//             </p>
//           </CardHeader>
//           <CardBody>
//             <Table
//               tableHeaderColor="primary"
//               tableHead={["ID", "Name", "Country", "City", "Salary"]}
//               tableData={[
//                 ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
//                 ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
//                 ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
//                 [
//                   "4",
//                   "Philip Chaney",
//                   "$38,735",
//                   "Korea, South",
//                   "Overland Park"
//                 ],
//                 [
//                   "5",
//                   "Doris Greene",
//                   "$63,542",
//                   "Malawi",
//                   "Feldkirchen in Kärnten"
//                 ],
//                 ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
//               ]}
//             />
//           </CardBody>
//         </Card>
//       </GridItem>
//     </GridContainer>
//   );
// }


const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    overflow: 'auto',
  },
  searchInput: {
    width: '75%'
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  }
}))


const headCells = [
  { id: 'id', label: ' ID' },
  { id: 'name', label: 'Product Name' },
  { id: 'dateAdded', label: 'Date Added' },
  { id: 'dateSold', label: 'Date Sold' },
  { id: 'views', label: 'No of Views' },
  // { id: 'department', label: 'Department', disableSorting: true },
]

export default function TableList() {

  // async function fetchData() {
  //   const data = await getAllTableData();
  //   console.log(data);
  //   return data;
  // }

  const classes = useStyles();
  const [records, setRecords] = useState([])
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })


  useEffect(() => {
    async function fetchData() {
      const data = await getAllTableData();
      // console.log(data);
      setRecords(data)

    }

    fetchData();


  }, [])

  console.log(records, 'records');





  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells, filterFn);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value == "")
          return items;
        else
          return items.filter(x => x.name.toLowerCase().includes(target.value))
      }
    })
  }



  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Paper className={classes.pageContent}>
            {/* <EmployeeForm /> */}
            <Toolbar>
              <TextField
                variant='outlined'
                label="Search Products"
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (<InputAdornment position="start">
                    <Search />
                  </InputAdornment>)
                }}
                onChange={handleSearch}
              />
            </Toolbar>
            <TblContainer>
              <TblHead />
              <TableBody>
                {
                  recordsAfterPagingAndSorting().map(item =>
                  (<TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.address.geo.lat}</TableCell>
                    <TableCell>{item.address.geo.lng}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                  </TableRow>)
                  )
                }
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Paper>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>

        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
        <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Monthly Sales</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  )
}