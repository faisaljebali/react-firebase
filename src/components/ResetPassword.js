import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetPass } from "../actions/auth";
import { Form, Input, Button, Checkbox,Spin,Skeleton } from 'antd';

const ResetPassword = props => {

    const isLogin = localStorage.getItem('username');
    //console.log(isLogin);


    const onFinish = values => {
      props.resetPass(values.email)
    };
    

  switch (props.auth.status) {
    default:
      return (
        (isLogin !== null) ? <Skeleton /> :
        <div className="form_center">
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            >
            <h1>Reset password</h1>
            <p>Enter your email and we'll send you a link to get back into your account.</p>

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

            <div class="flex-remember">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Link to="/login" className="text-blue-500 hover:text-blue-600">
                Back To Login
              </Link>
            </div>
            </Form>

            </div>

      );
        
  }
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  resetPass,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);