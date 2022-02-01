import {
  Box,
  CardMedia,
  Grid,
  makeStyles,
  Modal,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import noImage from "../image/noImageFound.jpg";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";

const useStyle = makeStyles((theme) => {
  return {
    root: {},
    bodyModal: {
      // display: "flex",
      height: "auto",
      width: "50%",
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid lightgray",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      //   [theme.breakpoints.only("md")]: {
      //     marginTop: "90%",
      //   },
      //   [theme.breakpoints.only("sm")]: {
      //     marginTop: "120%",
      //   },
    },
    head: {
      display: "flex",
      justifyContent: "space-between",
    },
    imageWrap: {
      height: "0",
      paddingBottom: "45%",
      position: "relative",
      overflow: "hidden",
    },
    image: {
      height: "100%",
      Width: "100%",
      border: "1px solid lightgray",
      position: "absolute",
      objectFit: "cover",
    },
  };
});

export default function ImageModal(props) {
  const classes = useStyle();
  const { open, onClose, dataList } = props;

  const body = (
    <div className={classes.bodyModal}>
      <div style={{ float: "right" }}>
        <Tooltip title="close">
          <CancelTwoToneIcon
            fontSize="small"
            color="secondary"
            onClick={props.onClick}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              paddingTop: 5,
              color: "red",
            }}
          />
        </Tooltip>
      </div>
      <Grid container spacing={1} justifyContent="center" justifyItem="center">
        <Grid item lg={6} md={6}>
          <div className={classes.imageWrap}>
            <CardMedia
              component="img"
              src={
                !!dataList.picFull
                  ? `data:image/png;base64, ${dataList.picFull}`
                  : noImage
              }
              className={classes.image}
            />
          </div>
        </Grid>
        <Grid item lg={6} md={6}>
          <div className={classes.imageWrap}>
            <CardMedia
              component="img"
              src={
                !!dataList.picCrop
                  ? `data:image/png;base64, ${dataList.picCrop}`
                  : noImage
              }
              className={classes.image}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          overflow: "scroll",
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
