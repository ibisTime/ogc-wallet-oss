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
} from '@redux/BTC-finance/TBAddress/TBAddress';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

let currency = 'ETH';

@listWrapper(
    state => ({
        ...state.BTCFinanceTBAddress,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TBAddress extends React.Component {
    componentDidMount() {
        let clearParams = document.getElementById('clearParams');
        let symInputList = document.querySelectorAll('.ant-select-search__field');
        let symPloList = document.querySelectorAll('.ant-select-selection__placeholder');
        setTimeout(() => {
            symInputList.forEach((item, index) => {
                if (item.id === 'symbol') {
                    item.value = currency + '-以太坊';
                    symPloList[index].style.display = 'none';
                }
            });
        }, 4000);
        clearParams.addEventListener('click', () => {
            currency = 'ETH';
        });
    }

    render() {
        const fields = [{
            field: 'symbol',
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
                        currency = 'ETH';
                    });
                }, 0);
                currency = v;
            }
        }, {
            field: 'address',
            title: '地址'
        }, {
            field: 'balanceString',
            title: '余额',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
            // title: '余额',
            // field: 'balanceString',
            // render: (v, data) => {
            //     return moneyFormat(Number(data.useAmount), '', data.currency);
            // }
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'maddress_status',
            search: true
        }, {
            title: '创建日期',
            field: 'createDatetime',
            type: 'datetime'
        }];
        // }, {
        // title: '使用次数',
        // field: 'useCount'
        // }, {
        //     field: 'useAmountString',
        //     title: '提币金额',
        //     render: (v, data) => {
        //         return moneyFormat(Number(data.useAmount), '', data.currency);
        //     }
        // }, {
        //     title: '余额',
        //     field: 'balanceString',
        //     render: (v, data) => {
        //         return moneyFormat(Number(data.useAmount), '', data.currency);
        //     }
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802515',
            searchParams: {
                symbol: currency
            },
            btnEvent: {
                add: (selectedRowKeys, selectedRows) => {
                    let selectHtml = document.createElement('select');
                    selectHtml.id = 'symSelect';
                    selectHtml.style.height = '30px';
                    selectHtml.style.width = '80%';
                    selectHtml.style.borderRadius = '4px';
                    selectHtml.style.borderColor = '#ccc';
                    selectHtml.style.paddingLeft = '5px';
                    selectHtml.style.backgroundColor = '#fff';
                    fetch(802005, {limit: 20, start: 1}).then((data) => {
                        data.list.forEach((item, index) => {
                            selectHtml.options[index] = new Option(item.symbol, item.symbol);
                        });
                    });
                    setTimeout(() => {
                        document.querySelector('.ant-modal-confirm-content').appendChild(selectHtml);
                    }, 0);
                    Modal.confirm({
                        title: '请选择币种',
                        okText: '确认',
                        cancelText: '取消',
                        content: '',
                        onOk: () => {
                            this.props.doFetching();
                            let symbol = document.getElementById('symSelect').value;
                            fetch(802510, {symbol}).then(() => {
                                this.props.getPageData();
                                showSucMsg('操作成功');
                            }).catch(() => {
                                this.props.cancelFetching();
                            });
                        }
                    });
                },
                flowQuery: (selectedRowKeys, selectedRows) => {
                    if(!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    }else if(selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    }else if(selectedRows[0].symbol === 'BTC') {
                        // 测试：https://testnet.blockexplorer.com/address/
                        // 正式：https://btc.com/
                        window.open('https://btc.com/' + selectedRows[0].address, '_bank');
                    }else if(selectedRows[0].symbol === 'TRX') {
                        // 测试：https://shasta.tronscan.org/#/address/TVcaZYGf94J5K6WkPsfSDVUu5cWreZz1h9/token-balances
                        // 正式：https://tronscan.org/#/address/TVcaZYGf94J5K6WkPsfSDVUu5cWreZz1h9/token-balances
                        window.open('https://tronscan.org/#/address/' + selectedRows[0].address + '/token-balances', '_bank');
                    }else if(selectedRows[0].symbol === 'ETH' || selectedRows[0].symbol === 'KCC') {
                        // 正式: https://rinkeby.etherscan.io/address/0x8a37b79e54d69e833d79cac3647c877ef72830e1
                        // 测试: https://etherscan.io/address/0x8a37b79e54d69e833d79cac3647c877ef72830e1
                        window.open('https://etherscan.io/address/' + selectedRows[0].address, '_bank');
                    }else if(selectedRows[0].symbol === 'USDT') {
                        window.open('https://omniexplorer.info/address/' + selectedRows[0].address, '_bank');
                    }
                }
            }
        });
    }
    }

    export
    default
    TBAddress;
