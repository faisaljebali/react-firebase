import React,{useEffect} from 'react';
import { Route,Switch, BrowserRouter as Router } from 'react-router-dom';
import store from "./store";
import { listenToAuth } from "./actions/auth";
import { listenToArticles } from "./actions/articles";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Feedback from "./components/Feedback";
import Articles from "./components/Articles";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword"
import { Layout } from 'antd';
const { Content, Footer } = Layout;

function App() {
  useEffect(()=>{
    store.dispatch(listenToAuth());
    store.dispatch(listenToArticles());
    
  },[])

  return (
    <div className="App">
      <Layout className="layout">
      <Router>
        <Navbar />
        <Content style={{ padding: '0 50px' }}>
          <div className="container site-layout-content">
              <Switch>
              <Route  path="/signup" exact component={SignUp}/>
              <Route exact path="/login" component={SignIn}/>
              <Route exact path="/resetpassword" component={ResetPassword}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/" component={Articles}/>
              </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Router>
      </Layout>
      <Feedback />
    </div>
  );
}

export default App;
