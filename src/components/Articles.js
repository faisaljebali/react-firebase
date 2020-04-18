import React, { useState } from "react";
import { connect } from "react-redux";
import { submitArticle } from "../actions/articles";
import C from "../constants";
import { Form, Input, Button, Checkbox,Spin,Skeleton } from 'antd';

const Articles = props => {

    const isLogin = localStorage.getItem('username');

      const onFinish = values => {
        props.submitArticle(values.content)
      };
    
      const articlesList = Object.values(props.articles.data).map((qid,index) => {
        return (
            <div key={index}>{qid.username} : {qid.content}</div>
        );
      });
    

      return (
        <div className="form-sign">
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            >
            <h1>Add article</h1>

            <Form.Item
                name="content"
                rules={[{ required: true , message: 'Please input your username!' }]}
            >
                <Input placeholder="Email"/>
            </Form.Item>


                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form>
            {
                    props.articles.hasReceivedData
                    ? articlesList
                    : "Loading articles..."
            }
            </div>
        
      );
        
  
};

const mapStateToProps = state => ({ articles: state.articles });

const mapDispatchToProps = {
    submitArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);