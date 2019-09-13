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
} from '@redux/BTC-finance/offlineRecharge/offlineRecharge';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
import OfflineRechargeCheck from 'component/offlineRecharge-check/offlineRecharge-check';
import fetch from 'common/js/fetch';

let currency = '';
@listWrapper(
    state => ({
        ...state.BTCFinanceOfflineRecharge,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class OfflineRecharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 窗口是否显示
            isVisible: false,
            // code
            codeList: []
        };
    }

      componentDidMount() {
        let clearParams = document.getElementById('clearParams');
        clearParams.addEventListener('click', () => {
          currency = '';
        });
      }

    setModalVisible = (flag, param) => {
        // 操作
        if (!flag && param) {
            let data = {};
            data.payResult = param.result;
            data.payNote = param.note;
            data.codeList = this.state.codeList;
            data.payUser = getUserName();
            this.props.doFetching();
            fetch(802341, data).then(() => {
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
    };
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
          field: 'currency',
          title: '币种类型',
          type: 'select',
          pageCode: '802005',
          params: {
            status: '0'
          },
          keyName: 'symbol',
          valueName: '{{symbol.DATA}}-{{cname.DATA}}',
          searchName: 'symbol',
          render: (v, data) => v,
          search: true,
          onChange: (v) => {
            setTimeout(() => {
              let clearSpan = document.querySelector('.ant-select-selection__clear');
              clearSpan.addEventListener('click', () => {
                currency = '';
              });
            }, 0);
            currency = v;
          }
        }, {
            field: 'accountName',
            title: '户名',
            render: (v, data) => {
                return data.payer ? data.payer.nickname : '';
            }
        }, {
            title: '充值用户',
            field: 'userId',
            type: 'select',
            pageCode: '805120',
            params: {
                updater: ''
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            field: 'loginName',
            title: '手机号/邮箱',
            render: (v, data) => {
                return data.payer ? data.payer.loginName : '-';
            }
        }, {
            field: 'amount',
            title: '充值金额',
            render: (v, data) => {
                return moneyFormat(Number(v), '', data.currency);
            }
        }, {
            field: 'bizNote',
            title: '充值说明'
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'date',
            rangedate: ['applyDateStart', 'applyDateEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'charge_status',
            search: true
        }];
        return (<div>
            {this.props.buildList({
            fields,
            pageCode: '802345',
            searchParams: {
                channelType: '90',
                currency
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let codeList = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            if(selectedRows[i].status === '0') {
                                showWarnMsg(selectedRows[i].code + '不是待审核的状态！');
                                codeList = [];
                                return;
                            }
                            codeList.push(selectedRows[i].code);
                        }
                        if (codeList.length > 0) {
                            this.setState({isVisible: true, codeList});
                        }
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/BTC-finance/offlineRecharge/detail?v=1&code=${selectedRowKeys[0]}&coin=${selectedRows[0].currency}`);
                    }
                },
                add: (selectedRowKeys, selectedRows) => {
                  this.props.history.push(`/BTC-finance/offlineRecharge/addedit?isapply=${this.state.currency}`);
                }
            }
        })}
            <OfflineRechargeCheck
                isVisible={this.state.isVisible}
                setModalVisible={this.setModalVisible}
                onOk={() => {
                    this.setModalVisible(false);
                }}/>
        </div>);
    }
}

export default OfflineRecharge;
