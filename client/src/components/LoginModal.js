import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  FormControl,
  Grid,
  InputLabel,
  Typography,
  Input,
  FormHelperText,
  Button,
  Container,
  TextField,
} from "@material-ui/core";

let useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px",
  },
}));

export default function LoginForm(props) {
  let classes = useStyles();
  return (
    <Grid container direction="column" xs={12} spacing={2} >
      <Grid item xs={12} justifyContent="center" container>
        <Grid item xs={12}><Typography variant="h4" align='center'>Login</Typography></Grid>
        <hr/>
      </Grid>
      
      <Grid item xs={12} container>
          <Grid item container xs={12}>
        <FormControl>
          
          <Grid item xs={12} ><TextField
            autoComplete='off'
            fullWidth={true}
            name='email'
            variant='outlined'
            id="emailaddr"
            label='email'
            //placeholder="email"
            helperText='*Incorrect email'
            className={classes.root}
          /></Grid>
          

          
          <Grid item xs={12}><TextField
            autoComplete='off'
            fullWidth={true}
            name='password'
            id="password"
            type="password"
            label="password"
            variant='outlined'
            helperText='*Incorrect password'
            //placeholder="password"
            className={classes.root}

          /></Grid>
          
          <Grid item container xs={12} justifyContent='center'>
            <Grid item xs={12}>
              <Button
              fullWidth={false}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.root}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </FormControl></Grid>
      </Grid>
      
    </Grid>
  );
}
