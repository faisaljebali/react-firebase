import React, { useState } from "react";
import { connect } from "react-redux";
import { Link,Redirect } from "react-router-dom";
import { loginAuth, logoutUser,openAuth } from "../actions/auth";
import C from "../constants";
import { Form, Input, Button, Checkbox,Spin,Skeleton } from 'antd';

const SignIn = props => {

    const isLogin = localStorage.getItem('username');
    console.log(isLogin);


    const onFinish = values => {
      //console.log('Success:', values);
      props.loginAuth(values.email, values.password)
    };
    

  switch (props.auth.status) {
    case C.AUTH_LOGGED_IN:
      return (
            <Redirect to={"/"} />
      );
    case C.AUTH_AWAITING_RESPONSE:
      return (
        <div>
           <Spin size="large" />
        </div>
      );
    default:
      return (
        (isLogin !== null) ? <Redirect to={"/"} /> :
        <div className="form_center">
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            >
            <h1>Connexion</h1>

            <Form.Item
                name="email"
                rules={[{ required: true,type: 'email' , message: 'Please input your username!' }]}
            >
                <Input type="email"  placeholder="Email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <div className="flex-remember">
              <Form.Item  name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/resetpassword" className="text-blue-500 resetpassword-login">
                Forgot password?
              </Link>
            </div>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>


            </Form>

            <div className="hr-div"><div className="hr-text">Or</div></div>

                {/* <button
            className="google-signup text-white"
            onClick={() => {
                props.openAuth();
            }}
            >
            Sign in with Google
            </button> */}
            <div className="text-center mt-20">
              <Link to="/signup" className="text-blue-500 hover:text-blue-600">
                Create an account
              </Link>
            </div>
            </div>

      );
        
  }
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  loginAuth,
  openAuth,
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);