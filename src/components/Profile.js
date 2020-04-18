import React, { useContext } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { logoutUser } from "../actions/auth";
const Profile = props => {
  const isLogin = JSON.parse(localStorage.getItem('username'));

  
  if(isLogin){
  return ( 
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      {isLogin && isLogin.fullname} {isLogin && isLogin.email} login
    </div>
  ) 
  }else{
    return ( 
        <Redirect to={"/login"} /> 
    ) 
  }
};


const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
