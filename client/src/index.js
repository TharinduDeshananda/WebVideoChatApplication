import React from "react";
import ReactDom from "react-dom";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import Home from "./components/Home";
import Room from './components/Room';
import CreateRoom from "./components/CreateRoom";
import { BrowserRouter as Router, Route } from "react-router-dom";
ReactDom.render(<App />, document.getElementById("root"));

function App(props) {
  return <div>
    <Header />

    <Router>
      <TabBar />
      <Route path='/' exact><Home /></Route>
      <Route path="/rooms" exact><CreateRoom /></Route>
      <Route path='/Session' exact><Room/></Route>
      
    </Router>
  </div>;
}
