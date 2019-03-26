import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/user/commissionsHistoryList/commissionsHistoryList';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, dateFormat, showSucMsg} from 'common/js/util';
import {activateUser} from 'api/user';
import {CION_FMVP} from 'common/js/config';
import CommissionsSettlement from 'component/commissions-settlement/commissions-settlement';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.userCommissionsHistoryList,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CommissionsHistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 窗口是否显示
            isVisible: false,
            // code
            idList: []
        };
    }

    setModalVisible = (flag, param) => {
        // 操作
        if (!flag && param) {
            var data = {
                idList: this.state.idList,
                handleResult: param.result,
                handleNote: param.note
            };
            this.props.doFetching();
            fetch(802390, data).then(() => {
                this.setState({
                    isVisible: flag
                });
                showSucMsg('操作成功');
                this.props.cancelFetching();
                setTimeout(() => {
                    this.props.getPageData();
                }, 1000);
            }).catch(this.props.cancelFetching);
        } else {
            // 显示
            this.setState({
                isVisible: flag
            });
        }
    }
    render() {
        const fields = [{
            field: 'id',
            title: 'id'

        }, {
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            render: (v, data) => {
                return data.user ? data.user.realName ? data.user.realName : data.user.nickname : '';
            }
        }, {
            field: 'mobile',
            title: '手机号',
            render: (v, data) => {
                return data.user ? data.user.mobile : '-';
            }
        }, {
            field: 'settleCount',
            title: '结算金额',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'unsettleCount',
            title: '未结算金额',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'nosettleCount',
            title: '不结算金额',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'nextUnsettleCount',
            title: '下月未结算数量',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'date',
            title: '时间',
            render: (v, data) => {
                return dateFormat(data.startDate) + '至' + dateFormat(data.endDate);
            }
        }];
        return (<div>
            {this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802396',
            searchParams: {
                userKind: 'C'
            },
            btnEvent: {
                commissions: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/commissionsHistoryList/commissions`);
                    }
                },
                settle: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let idList = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            if(selectedRows[i].status !== '0') {
                                showWarnMsg('id: ' + selectedRows[i].id + ' 不是待结算的状态！');
                                idList = [];
                                return;
                            }
                            idList.push(selectedRows[i].id);
                        }
                        if (idList.length > 0) {
                            this.setState({isVisible: true, idList});
                        }
                    }
                }
            }
        })}
            <CommissionsSettlement
                isVisible={this.state.isVisible}
                setModalVisible={this.setModalVisible}
                onOk={() => {
                    this.setModalVisible(false);
                }}/>
        </div>);
    }
}

export default CommissionsHistoryList;
