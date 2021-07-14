import { Typography, Grid, TextField, Button } from "@material-ui/core";
import react from "react";
import MainVideoComponent from "./mainHolder";
export default function Room(props) {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      xs={12}
      style={{ margin: "20px 0px" }}
    >
        <Grid item></Grid>


      <Grid item container xs={12}>
        <Grid item sm={2}></Grid>
        <Grid item container sm={8} xs={12} spacing={2}>
          <Grid item xs={10}>
            {/* <TextField
              id="outlined-full-width"
              label="Label"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            /> */}
          </Grid>
          <Grid item xs={2} style={{marginTop:'5px'}}>
            {/* <Button variant='contained' color='primary'>Join Session</Button> */}
          </Grid>
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>
      <MainVideoComponent/>
    </Grid>
  );
}
