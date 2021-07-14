import { Typography, Grid } from "@material-ui/core";
import react from "react";
import RoomCard from "./RoomCard";
export default function CreateRoom(props) {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h3">Create/Edit Rooms</Typography>
      </Grid>

      <Grid item container>
        <Grid sm={2} item></Grid>
        <Grid item container direction="column" sm={8} xs={12} spacing={2}>
          <Grid item xs={12}>
            <RoomCard />
          </Grid>
        </Grid>
        <Grid sm={2} item></Grid>
      </Grid>

      <Grid item>
        <Typography variant="h3">Existing Rooms : 0 </Typography>
      </Grid>
      <Grid item container direction="row">
        <Grid sm={2} item></Grid>
        <Grid item container direction="column" sm={8} xs={12} spacing={2}>
          <Grid item xs={12}>
            <RoomCard />
          </Grid>
          <Grid item xs={12}>
            <RoomCard />
          </Grid>
          <Grid item xs={12}>
            <RoomCard />
          </Grid>
          <Grid item xs={12}>
            <RoomCard />
          </Grid>
        </Grid>
        <Grid sm={2} item></Grid>
      </Grid>
    </Grid>
  );
}
