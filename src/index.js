/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {BackTop, ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import asyncComponent from 'component/async-component/async-component';
import reducers from './reducer';
import AuthRoute from 'component/authroute/authroute';
import './index.css';

const store = createStore(reducers, compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
const Login = asyncComponent(() => import('container/login/login'));
const Dashboard = asyncComponent(() => import('component/dashboard/dashboard'));

// 集成生态-超级节点
// const SuperNode = asyncComponent(() => import('container/superNode/superNode'));
// <Route path='/superNode' component={SuperNode}/>

// 集成生态-闪兑
// const FlashExchange = asyncComponent(() => import('container/flashManagement/flashManagement'));
// <Route path='/flashManagement' component={FlashExchange}/>

// 集成生态-猜涨跌
const GuessUpsDowns = asyncComponent(() => import('container/guessUpsDowns/guessUpsDowns'));

// 集成生态-星球
const StarLucky = asyncComponent(() => import('container/starLucky/starLucky'));

// 卡卷
// const Card = asyncComponent(() => import('container/card/card'));
// <Route path='/card' component={Card}/>
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <BrowserRouter>
                <div style={{height: '100%'}}>
                    <AuthRoute/>
                    <Switch>
                        <Route
                            path='/login'
                            component={Login}
                        />
                        <Route path='/guessUpsDowns' component={GuessUpsDowns}/>
                        <Route path='/starLucky' component={StarLucky}/>
                        <Route component={Dashboard}/>
                    </Switch>
                    <BackTop/>
                </div>
            </BrowserRouter>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);
