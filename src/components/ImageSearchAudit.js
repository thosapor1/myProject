import { CardMedia, Grid, Paper } from "@material-ui/core";
import React from "react";
import noImage from "../image/noImageFound.jpg";

export default function ImageSearchAudit(props) {
  const { imageCrop, imageFull } = props;
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
            }}
            component="img"
            src={
              imageCrop !== 0 ? `data:image/png;base64, ${imageCrop}` : noImage
            }
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
            }}
            component="img"
            src={
              imageFull !== 0 ? `data:image/png;base64, ${imageFull}` : noImage
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
