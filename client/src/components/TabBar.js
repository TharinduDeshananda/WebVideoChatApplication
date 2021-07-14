import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter as Router,Link,Switch,Route,withRouter } from 'react-router-dom';

function DisabledTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    let navs = ['/','/rooms','/session'];
    props.history.push(navs[newValue]);
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Home"/>
        <Tab label="Rooms"/>
        <Tab label="Session"/>
      </Tabs>
    </Paper>
  );
}

export default withRouter(DisabledTabs);