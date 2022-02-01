import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  IconButton,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import Swal from "sweetalert2";
import axios from "axios";
import ModalAddTabFee from "./ModalAddTabFee";
import ModalEditTabFee from "./ModalEditTabFee";

const apiURL = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL_PROD_V1}`
      : `${process.env.REACT_APP_BASE_URL_V1}`,
});

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.3em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px  lightgray",
      },
    },
    container: {
      maxHeight: "65vh",
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
    btn: {
      height: "40px",
      width: "150",
      marginTop: "2rem",
      marginBottom: "1rem",
      backgroundColor: "#46005E",
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
  };
});

const headerCells = [
  {
    id: "order",
    label: "ลำดับ",
  },
  {
    id: "class",
    label: "รหัสประเภทรถ",
  },
  {
    id: "class_name",
    label: "ชื่อประเภทรถ",
  },
  {
    id: "fee",
    label: "ค่าผ่านทาง",
  },
  {
    id: "action",
    label: "action",
  },
];

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableFeeTab(props) {
  const [dataForEdit, setDataForEdit] = useState(null);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataForEdit(null);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleGetDataForEdit = (item) => {
    setDataForEdit(item);
    console.log(item);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
    // console.log("hello");
  };

  const handleDelete = async (item) => {
    const vehicle_id = item.id;
    const sendData = { vehicle_id: vehicle_id };
    console.log(sendData);
    Swal.fire({
      text: "คุณต้องการลบข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        apiURL
          .post("/delete-vehicle_type", sendData)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === true) {
              Swal.fire({
                title: "Success",
                text: "ข้อมูลของท่านถูกลบแล้ว",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              Swal.fire({
                title: "Fail",
                text: "ลบข้อมูลไม่สำเร็จ",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          })
          .then(() => handleClose())
          .then(() => props.onFetchData());
      }
    });
  };

  const classes = useStyles();
  const { dataList } = props;

  return (
    <>
      <Container maxWidth="xl">
        <div style={{ display: "flex", justifyContent: "right" }}>
          {/* <Pagination
          count={dataList.totalPages}
          color="primary"
          page={page}
          onChange={onChange}
          style={{
            display: "inline",
            margin: "2rem",
            position: "sticky",
            top: 0,
          }}
        /> */}

          <Button
            className={classes.btn}
            startIcon={<AddTwoToneIcon />}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            เพิ่มประเภทรถ
          </Button>
        </div>
        <TableContainer className={classes.container}>
          <Table stickyHeader>
            <TableHead>
              <StyledTableRow>
                {headerCells.map((headerCell) => (
                  <TableCell
                    align="center"
                    key={headerCell.id}
                    className={classes.header}
                  >
                    {headerCell.label}
                  </TableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {!!dataList
                ? dataList.vehicle_list.map((data, index) => (
                    <StyledTableRow key={index}>
                      <TableCell align="center">{index + 1} </TableCell>
                      <TableCell align="center">{data.vehicleClass}</TableCell>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.fee}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            handleOpenModalEdit();
                            handleGetDataForEdit(data);
                          }}
                        >
                          <EditTwoToneIcon color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(data)}
                          color="secondary"
                        >
                          <DeleteForeverTwoToneIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))
                : dataList}
            </TableBody>
          </Table>
        </TableContainer>

        <ModalAddTabFee
          open={open}
          onClose={() => handleClose()}
          onClick={() => handleClose()}
          onFetchData={props.onFetchData}
        />

        <ModalEditTabFee
          dataForEdit={dataForEdit}
          open={openModalEdit}
          onClose={() => handleCloseModalEdit()}
          onClick={() => handleCloseModalEdit()}
          onFetchData={props.onFetchData}
        />
      </Container>
    </>
  );
}
