import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '@redux/user';
import {setSystem} from 'common/js/util';
import './login.css';
import loginLeft from '../../images/login-left.png';

const FormItem = Form.Item;

@connect(
    state => state.user,
    {login}
)
class Login extends React.Component {
    state = {
        ...this.state,
        loginPic: ''
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    };
    async componentDidMount() {
        await setSystem();
        const loginPic = localStorage.getItem('loginPic');
        this.setState({
            loginPic
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {loginPic} = this.state;
        return (
            <div className="login-body">
                <div className="login-wrapper">
                    <div className='login-left'><img src={loginLeft} /></div>
                    <div className="login-wrap">
                        <div className="title"><img style={{height: '60px'}} src={loginPic} /></div>
                        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem className="form-item">
                                {getFieldDecorator('loginName', {
                                    rules: [{
                                        required: true,
                                        message: '请输入用户名!'
                                    }]
                                })(
                                    <Input placeholder="用户名"/>
                                )}
                            </FormItem>
                            <FormItem className="form-item">
                                {getFieldDecorator('loginPwd', {
                                    rules: [{
                                        required: true,
                                        message: '请输入密码!'
                                    }]
                                })(
                                    <Input type="password"
                                           placeholder="密码"/>
                                )}
                            </FormItem>
                            <div className="remember-wrap">
                            </div>
                            <FormItem className="button-wrap">
                                <Button type="primary" htmlType="submit" loading={this.props.fetching}
                                        className="login-form-button">
                                    立即登录
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);
