import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserInfo } from '@redux/user';
import cookies from 'browser-cookies';

@withRouter
class AuthRoute extends React.Component {
  componentDidMount() {
      if (cookies.get('userId')) {
          return;
      }
      this.props.history.push('/login');
  }
  render() {
    return null;
  }
}

export default AuthRoute;
