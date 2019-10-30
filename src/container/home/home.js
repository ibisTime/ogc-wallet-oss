import React from 'react';
import {Link} from 'react-router-dom';
import {message} from 'antd';
import {
    getUserName,
    getRoleCode,
    dateFormat,
    setSystem
} from 'common/js/util';
import {getRoleList} from 'api/company';
import {getCoinList} from 'api/coin';
import {getPageMyNotice, getPageMyCompanysystem} from 'api/home';
import './home.css';
import userPhoto from '../../images/home-userPhoto.png';
import iconLi from '../../images/home-icon-li.png';
import noData from '../../images/noData.png';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: null,
            noticeData: [],
            companysystemData: []
        };
    }

    componentDidMount() {
        getCoinList().then(data => {
            let coinList = [];
            let coinData = {};
            data.map(d => {
                coinData[d.symbol] = {
                    coin: d.symbol,
                    unit: '1e' + d.unit,
                    name: d.cname,
                    type: d.type,
                    status: d.status
                };
                coinList.push({
                    key: d.symbol,
                    value: d.cname
                });
            });
            window.sessionStorage.setItem('coinData', JSON.stringify(coinData));
            window.sessionStorage.setItem('coinList', JSON.stringify(coinList));
        });
        const hasMsg = message.loading('');
        Promise.all([
            getRoleList(),
            getPageMyNotice()
            // getPageMyCompanysystem()
        ]).then(([roleData, noticeData, companysystemData]) => {
            this.getUserRole(roleData);
            this.setState({
                roleData: roleData,
                noticeData: noticeData.list,
                companysystemData: companysystemData ? companysystemData.list : []
            });
            hasMsg();
        }).catch(() => this.setState({fetching: false}));
        setSystem();
    }

    getUserRole = (roleData) => {
        let roleCode = getRoleCode();
        roleData.map(v => {
            if (v.code === roleCode) {
                this.setState({role: v.name});
                return false;
            }
        });
    }

    render() {
        const {noticeData} = this.state;
        return (
            <div className="home-wrap">
                <div className="top-wrap">
                    <div className="card user-wrap">
                        <div className="card-top">
                            <div className="photo">
                                <img src={userPhoto}/>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="user-name">{getUserName()}</div>
                            <div className="user-role">{this.state.role}</div>
                        </div>
                    </div>
                    <div className="card top-right notice-wrap">
                        <div className="card-top">
                            <div className="title">公司公告</div>
                        </div>
                        <div className="card-content">
                            { noticeData && noticeData.length > 0 ? noticeData.map(d => (
                                <div className="content-item" key={d.code}>
                                    <Link to={'/public/noticesystem/addedit?v=1&code=' + d.code}>
                                        <img className="icon" src={iconLi}/>
                                        <p className="txt">{d.title}</p>
                                        <samp className="date">{dateFormat(d.updateDatetime)}</samp>
                                    </Link>
                                </div>
                            )) : <div className="noData"><img src={noData}/>
                            <p>暂无公司公告</p>
                            </div>}
                        </div>
                    </div>
                </div>
                {/* <div className="below-wrap">
                    <div className="card companysystem-wrap">
                        <div className="card-top">
                            <div className="title">公司制度</div>
                        </div>
                        <div className="card-content">
                            { this.state.companysystemData && this.state.companysystemData.length >= 1 ? this.state.companysystemData.map(d => (
                                <div className="content-item" key={d.regime.code}>
                                    <Link to={'/home/companysystemDetail?code=' + d.regime.code}>
                                        <img className="icon" src={iconLi}/>
                                        <p className="txt">{d.regime.content}</p>
                                        <samp className="date">{dateFormat(d.regime.updateDatetime)}</samp>
                                    </Link>
                                </div>
                            )) : <div className="noData"><img src={noData}/><p>暂无公司制度</p></div>}
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default Home;
