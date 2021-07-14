import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Grid, Modal,Button } from "@material-ui/core";
import LoginForm from "./LoginModal";
import CreateUserForm from "./CreateAcc";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 576,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid lavender",
    boxShadow: theme.shadows[10],
    borderRadius:'8px',
    // padding: theme.spacing(2, 4, 3),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
  userIcon: {
    transform: `scale(2)`,
  },
}));

export default function ProminentAppBar() {
  let [logMsg, setLogMsg] = useState(false);
  let [noAcc,setNoAcc]=useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  function handleClose() {
    setLogMsg(!logMsg);
  }

  function openModal() {
    setLogMsg(true);
  }
  function changeNoAcc(){
    setNoAcc(!noAcc);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h1" noWrap>
            Chat App
          </Typography>

          <Modal open={logMsg} onClose={handleClose}>
            <div className={classes.paper} style={modalStyle}>
              {noAcc?<CreateUserForm/>:<LoginForm/>}
              <Button variant='text'><Typography color='primary' onClick={changeNoAcc}>{noAcc?'Login using Form':'No Account? Create One'}</Typography></Button>
            </div>
          </Modal>

          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
            className={classes.userIcon}
            onClick={openModal}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
