import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";
import { Layout,Menu,Dropdown,Avatar   } from 'antd';
const { Header } = Layout;

const Navbar = props => {
    const isLogin = JSON.parse(localStorage.getItem('username'));
    const menu = (  isLogin &&
        <Menu>
          <Menu.Item key="0"><Link to={'/profile'} >{isLogin.fullname}</Link></Menu.Item>
          <Menu.Item key="1">
              2nd menu item
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={props.logoutUser}>
            Logout
          </Menu.Item>
        </Menu>
      );
    return (
        <Header>
            <div className="container flex-menu">
            <div className="menu-left">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]} className="menu-left">
                  <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                  <Menu.Item key="10">Post</Menu.Item>
                </Menu>
                </div>

                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]} className="text-right">

                {isLogin !== null ? (
                    <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{isLogin.fullname ? isLogin.fullname.substring(0,1) : ''}</Avatar> {isLogin.fullname}
                    </a>
                  </Dropdown>
                )
                :
                (
                  <Menu.Item key="2"><Link to="/signup" className="">Signup</Link></Menu.Item>
                )
                }
                {isLogin === null && (<Menu.Item key="3"><Link to="/login" className="">Signin</Link></Menu.Item>)}


                </Menu>
            </div>
        </Header>
    )
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
