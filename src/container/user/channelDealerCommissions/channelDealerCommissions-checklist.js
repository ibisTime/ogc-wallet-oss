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
} from '@redux/user/channelDealerCommissions/channelDealerCommissions-checklist';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, moneyFormat, dateTimeFormat, showWarnMsg, dateFormat, showSucMsg} from 'common/js/util';
import {CION_FMVP} from 'common/js/config';
import CommissionsSettlement from 'component/commissions-settlement/commissions-settlement';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.userChannelDealerCommissionsChecklist,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ChannelDealerCommissionsChecklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 窗口是否显示
            isVisible: false,
            // code
            idList: []
        };
        this.userId = getQueryString('userId', this.props.location.search);
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
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'Q'
            },
            keyName: 'userId',
            valueName: '{{realName.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            render: (v, data) => {
                return data.user ? data.user.realName ? data.user.realName : data.user.nickname : '';
            },
            search: true
        }, {
            field: 'mobile',
            title: '手机号',
            render: (v, data) => {
                return data.user ? data.user.mobile : '-';
            }
        }, {
            field: 'email',
            title: '邮箱',
            render: (v, data) => {
                return data.user ? data.user.email : '-';
            }
        }, {
            field: 'count',
            title: '佣金',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'currency',
            title: '币种'
        }, {
            field: 'refType',
            title: '佣金类型',
            type: 'select',
            key: 'award_ref_type'
        }, {
            field: 'refNote',
            title: '佣金说明'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                key: '0',
                value: '待结算'
            }, {
                key: '1',
                value: '已结算'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'createDatetime',
            title: '产生时间',
            type: 'date',
            rangedate: ['dateStart', 'dateEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            field: 'handleDatetime',
            title: '结算时间',
            type: 'datetime'
        }, {
            field: 'refCode',
            title: '关联单号'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return (<div>
            {this.props.buildList({
                fields,
                rowKey: 'id',
                pageCode: '802395',
                searchParams: {
                    status: '0',
                    userId: this.userId
                },
                btnEvent: {
                    settlement: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                            showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else {
                            let idList = [];
                            for (let i = 0, len = selectedRows.length; i < len; i++) {
                                if (selectedRows[i].status !== '0') {
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

export default ChannelDealerCommissionsChecklist;
