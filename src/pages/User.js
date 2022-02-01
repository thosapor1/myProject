import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  Switch,
  TableBody,
  TableRow,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalEdit from "../components/ModalEdit";
import ModalAdd from "../components/ModalAdd";
import Swal from "sweetalert2";
import { deleteUsers, getDataUsers, updateUsers } from "../service/allService";

const tableHeader = [
  { id: "user_id", label: "user_id" },
  { id: "username", label: "username" },
  { id: "fname", label: "ชื่อ" },
  { id: "lname", label: "นามสกุล" },
  { id: "position", label: "ตำแหน่ง" },
  { id: "department", label: "แผนก" },
  { id: "command", label: "คำสั่ง" },
  { id: "status", label: "สถานะ" },
];

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
    root: { backgroundColor: "#f9f9f9", paddingTop: "1rem" },
    paper: { padding: theme.spacing(1) },
    btn: {
      marginTop: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#46005E",
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    modal: {
      width: "50%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modalTextField: {
      margin: theme.spacing(1, 0, 0),
      width: 300,
    },
    btn2: {
      margin: theme.spacing(1, 1, 0, 0),
      backgroundColor: "#46005E",
      "&:hover": {
        backgroundColor: "#6a008f",
      },
    },
    header: {
      backgroundColor: "#7C85BFff",
      border: "1px solid white",
      color: "white",
    },
    active: {
      color: "green",
      fontSize: 11,
    },
    inactive: {
      color: "red",
      fontSize: 11,
    },
    tableCell: {
      padding: "6px",
      height: 28,
    },
  };
});

export default function User() {
  const classes = useStyles();

  const [state, setState] = useState({});

  const [open, setOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [dataForEdit, setDataForEdit] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataForEdit(null);
  };

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleChangeSwitch = async (event, index) => {
    const status = event.target.checked;
    let status1 = 1;
    if (status === false) {
      status1 = 0;
    }

    const sendData = {
      user_id: state.user_list[index].id,
      status: status1,
    };
    let items = [...state.user_list];
    items[index].status = status;
    setState(items);

    const res = await updateUsers(sendData);
    if (!!res) {
      fetchData();
    }

    console.log("click", sendData, typeof status1);
  };

  const handleDelete = async (item) => {
    const userId = item.id;
    const sendData = { user_id: userId };

    const result = await Swal.fire({
      title: "ต้องการลบข้อมูลนี้?",
      text: "ไม่สามารถเรียกข้อมูลคืนได้หากยืนยันแล้ว",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
    });

    const res = await deleteUsers(sendData);
    console.log(res);
    if (result.isConfirmed) {
      if (!!res && res.data.stauts === true) {
        // Swal.close();
        await Swal.fire({
          title: "Success!",
          text: "ข้อมูลของท่านถูกลบแล้ว",
          icon: "success",
        });
      }
      await fetchData();
    }
  };

  const handlegetDataForEdit = (item) => {
    setDataForEdit(item);
    console.log(item);
  };

  const fetchData = async () => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const res = await getDataUsers();

    if (!!res && !!res.data.user_list) {
      setState(res.data);
      Swal.close();
    }

    if (!!res && !res.data.status) {
      Swal.fire({
        icon: "error",
        text: "ไม่มีข้อมูล",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Body Modal

  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
          ตั้งค่า : ผู้ใช้งาน
        </Typography>
        <Paper className={classes.paper}>
          <div style={{ textAlign: "right" }}>
            <Button
              className={classes.btn}
              startIcon={<AddTwoToneIcon />}
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              เพิ่มผู้ใช้งาน
            </Button>
          </div>

          {/* Table */}
          <TableContainer component={Paper} style={{ height: "80vh" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {tableHeader.map((header) => (
                    <TableCell
                      key={header.id}
                      align="center"
                      className={classes.header}
                    >
                      {header.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!!state.user_list
                  ? state.user_list.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell align="center" className={classes.tableCell}>
                          {item.id}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          {item.username}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          {item.fname}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          {item.lname}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          {item.position}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          {item.department}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          <Tooltip title="edit">
                            <IconButton
                              onClick={() => {
                                handleOpenModalEdit();
                                handlegetDataForEdit(item);
                              }}
                            >
                              <EditTwoToneIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="delete">
                            <IconButton
                              onClick={() => handleDelete(item)}
                              color="secondary"
                            >
                              <DeleteForeverTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>
                          {item.status === 1 ? (
                            <Switch
                              checked={true}
                              onChange={(e) => handleChangeSwitch(e, index)}
                              name={`switch${index}`}
                              color="primary"
                            />
                          ) : (
                            <Switch
                              checked={false}
                              onChange={(e) => handleChangeSwitch(e, index)}
                              name={`switch${index}`}
                              color="secondary"
                            />
                          )}
                          <Typography
                            className={
                              item.status === 1
                                ? classes.active
                                : classes.inactive
                            }
                          >
                            {item.status === 1 ? "active" : "inactive"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  : state.user_list}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <ModalAdd
          open={open}
          onClose={() => handleClose()}
          onClick={() => handleClose()}
        />

        <ModalEdit
          dataForEdit={dataForEdit}
          open={openModalEdit}
          onClose={() => handleCloseModalEdit()}
          onClick={() => handleCloseModalEdit()}
        />
      </Container>
    </>
  );
}
