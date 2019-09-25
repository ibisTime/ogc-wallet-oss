import React from 'react';
import {Modal, message, Form, Input} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/rightsInterests/bonusPools/bonusWeight';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.rightsInterestsBonusWeight,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RightsInterestsBonusWeight extends React.Component {
    state = {
        ...this.state,
        weightObj: {}
    };
    componentDidMount() {
        fetch(805512).then(data => {
            this.setState({
                weightObj: data
            });
        });
    }
    render() {
        const fields = [{
            field: 'refereeUser',
            title: '用户',
            render(v, d) {
                return d.nickname && `${d.nickname}-${d.mobile}`;
            }
        }, {
            field: 'nickname',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'nickname',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            params: {
                kind: 'C'
            },
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            noVisible: true
        }, {
            field: 'gradeCode',
            title: '用户等级'
        }, {
            field: 'refereeName',
            title: '推荐人',
            render(v, d) {
                return d.refereeUser && (`${d.refereeUser.nickname}-${d.refereeUser.mobile}`);
            }
        }, {
            field: 'userReferee',
            title: '推荐人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            params: {
                kind: 'C'
            },
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            noVisible: true
        }, {
            field: 'selfWeight',
            title: '自身权重'
        }, {
            field: 'teamWeight',
            title: '团队权重'
        }, {
            field: 'giftWeight',
            title: '馈赠权重'
        }];
        const {weightObj} = this.state;
        return <div>
            <div style={{color: '#666', fontSize: '17px', 'display': 'flex'}}>
                <p style={{'margin-right': '30px'}}>自身权重总数：<span style={{color: '#1890ff'}}>{weightObj.totalSelfWeight}</span></p>
                <p style={{'margin-right': '30px'}}>团队权重总数：<span style={{color: '#1890ff'}}>{weightObj.totalTeamWeight}</span></p>
                <p>馈赠权重总数：<span style={{color: '#1890ff'}}>{weightObj.totalGiftWeight}</span></p>
            </div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'userId',
                    pageCode: '805120'
                })
            }
        </div>;
    }
}

export default RightsInterestsBonusWeight;
