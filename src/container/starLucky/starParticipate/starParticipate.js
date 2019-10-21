import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/starLucky/starParticipate';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString,
    dateFormat
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.starLuckyStarParticipate,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarParticipate extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search) || '';
        this.origin = getQueryString('origin', this.props.location.search) || '';
    }
    render() {
        const fields = [{
            field: 'starName',
            title: '星球名称',
            render(v, d) {
                return v && `${v}(${d.symbol})`;
            }
        }, {
            field: 'starId',
            title: '星球名称',
            search: true,
            type: 'select',
            pageCode: '640003',
            keyName: 'id',
            valueName: '{{name.DATA}}-{{symbol.DATA}}',
            searchName: 'starId',
            noVisible: true
        }, {
            field: 'sessionName',
            title: '场次',
            render(v, d) {
                return d && d.session ? `${d.session.symbol} ${dateFormat(d.session.date)} 第${d.session.batch}场` : '';
            }
        }, {
            field: 'userName',
            title: '用户'
        }, {
            field: 'userId',
            title: '必中用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            noVisible: true
        }, {
            field: 'frozenAmount',
            title: '数额',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '参与时间',
            type: 'datetime'
        }];
        return <div className="guessUpsDowns-listPage-wrapper">
            {
                this.origin === 'home' ? this.props.buildList({
                    fields,
                    pageCode: '640040',
                    buttons: [{
                        code: 'goBack',
                        name: '返回',
                        handler() {
                            window.history.go(-1);
                        }
                    }, {
                        code: 'export',
                        name: '导出'
                    }]
                }) : this.props.buildList({
                    fields,
                    pageCode: '640040',
                    searchParams: {
                        sessionId: this.code
                    },
                    buttons: [{
                        code: 'goBack',
                        name: '返回',
                        handler() {
                            window.history.go(-1);
                        }
                    }, {
                        code: 'export',
                        name: '导出'
                    }]
                })
            }
        </div>;
    }
}

export default StarParticipate;