import {
  Backdrop,
  Box,
  CardMedia,
  Fade,
  Grid,
  makeStyles,
  Modal,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import noImage from "../image/noImageFound.jpg";

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
      padding: theme.spacing(1, 1),
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
      paddingBottom: "40%",
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

export default function ModalExpandedImage(props) {
  const classes = useStyle();
  const { open, onClose, dataList } = props;

  const body = (
    <div className={classes.bodyModal}>
      <Box>
        <div className={classes.imageWrap}>
          <CardMedia
            component="img"
            src={!!dataList ? `data:image/png;base64, ${dataList}` : noImage}
            className={classes.image}
          />
        </div>
      </Box>
    </div>
  );
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          overflow: "scroll",
        }}
      >
        <Fade in={open}>{body}</Fade>
      </Modal>
    </div>
  );
}
