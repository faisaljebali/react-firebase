import React, { useContext, useState } from "react";
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { openAuth,registerAuth } from "../actions/auth";
import { Form, Input, Button,Spin } from 'antd';
import C from "../constants";

const SignUp = props => {

  const isLogin = localStorage.getItem('username');

  const [email,setEmail] = useState('');
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');

  const onFinish = values => {
    //console.log('Success:', values);
    const fullname = values.firstname+' '+values.lastname;
    props.registerAuth(values.email, values.password,fullname)
    setLastname(values.lastname);
    setFirstname(values.firstname);
    setEmail(values.email);

  };


  switch (props.auth.status) {

    case C.AUTH_AWAITING_RESPONSE:
      return (
        <div>
           <Spin size="large" />
        </div>
      );
    default:

  return (
    (isLogin !== null) ? 
    <Redirect to={"/"} />
    :
    <div className="form_center">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      

      <Form
            name="basic"
            onFinish={onFinish}
            initialValues={{
              firstname: firstname,
              lastname: lastname,
              email: email,
            }}
            >

            <Form.Item
                name="firstname"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder="First name" />
            </Form.Item>

            <Form.Item
                name="lastname"
                rules={[{ required: true , message: 'Please input your username!' }]}
            >
                <Input   placeholder="Last name"/>
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
            >
                <Input type="email"  placeholder="Email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>


            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
                <Input.Password placeholder="Repeat Password" />
            </Form.Item>

            
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form>

            <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">

              <div className="hr-div"><div className="hr-text">Or</div></div>
              {/* <button
                onClick={() => {
                  try {
                    props.openAuth();
                  } catch (error) {
                    console.error("Error signing in with Google", error);
                  }
                }}
                className="google-signup text-white"
              >
                Sign up with Google
              </button> */}
              <div className="text-center mt-20">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-600">
                  Sign in here
                </Link>
              </div>
            </div>
    </div>
    );
  }
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  openAuth,
  registerAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);