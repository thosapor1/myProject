import { CardMedia, Grid, Paper } from "@material-ui/core";
import React, { useState } from "react";
import noImage from "../image/noImageFound.jpg";
import ModalExpandedImage3 from "./report/ModalExpandedImage3";

export default function ImageAWMonitorPage(props) {
  const { imageCrop, imageFull } = props;
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  // const mocpic = 0;
  return (
    <Paper style={{ marginTop: 10, padding: 5 }}>
      <Grid container spacing={1}>
        <Grid item xl={6} lg={6} md={6}>
          <CardMedia
            style={{
              height: "140px",
              width: "100%",
              border: "1px solid lightgray",
              marginRight: "auto",
              marginLeft: "auto",
              cursor: "pointer",
            }}
            component="img"
            src={
              imageCrop !== 0 ? `data:image/png;base64, ${imageCrop}` : noImage
            }
            onClick={() => setOpen1(true)}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6}>
          <CardMedia
            style={{
              height: "140px",
              width: "100%",
              border: "1px solid lightgray",
              marginRight: "auto",
              marginLeft: "auto",
              cursor: "pointer",
            }}
            component="img"
            src={
              imageFull !== 0 ? `data:image/png;base64, ${imageFull}` : noImage
            }
            onClick={() => setOpen2(true)}
          />
        </Grid>
      </Grid>
      <ModalExpandedImage3
        dataList={imageFull}
        open={open2}
        onClose={() => setOpen2(false)}
      />
      <ModalExpandedImage3
        dataList={imageCrop}
        open={open1}
        onClose={() => setOpen1(false)}
      />
    </Paper>
  );
}
