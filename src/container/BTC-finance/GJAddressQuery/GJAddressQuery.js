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
} from '@redux/BTC-finance/GJAddressQuery/GJAddressQuery';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    getCoinType
} from 'common/js/util';

let currency = '';

@listWrapper(
    state => ({
        ...state.BTCFinanceGJAddressQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class GJAddressQuery extends React.Component {
    componentDidMount() {
        let clearParams = document.getElementById('clearParams');
        clearParams.addEventListener('click', () => {
            currency = '';
        });
    }

    render() {
        const fields = [{
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
            field: 'amount',
            title: '交易数量',
            render: (v, data) => {
                // console.log(data.currency);
                return moneyFormat(data.amount, '', data.currency);
            }
        }, {
            field: 'fromAddress',
            title: '来方归集'
        }, {
            title: '矿工费',
            field: 'txFee',
            render: (v, data) => {
                // console.log(data.currency);
                return moneyFormat(data.txFee, '', data.minerSymbol);
            }
        }, {
            field: 'confirmDatetime',
            title: '区块确认时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '802365',
            searchParams: {
                currency
            },
            btnEvent: {
                flowQuery: (selectedRowKeys, selectedRows) => {
                    let type = getCoinType(selectedRows[0].symbol);
                    //    0 ETH  1 BTC  2 WAN  3 USDT  4 TRX
                    //    OT  ETHTOKEN   2T WANTOKEN
                    if(!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    }else if(selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    }else if(type === '1') {
                        // 测试：https://testnet.blockexplorer.com/address/
                        window.open('https://testnet.blockexplorer.com/address/' + selectedRows[0].address, '_bank');
                        // 正式：https://blockexplorer.com/address/
                        // window.open('https://blockexplorer.com/address/' + selectedRows[0].address, '_bank');
                    }else if(type === '4') {
                        // 测试：https://shasta.tronscan.org/#/address/TVcaZYGf94J5K6WkPsfSDVUu5cWreZz1h9/token-balances
                        window.open('https://shasta.tronscan.org/#/address/' + selectedRows[0].address + '/token-balances', '_bank');
                        // 正式：https://tronscan.org/ #/address/TVcaZYGf94J5K6WkPsfSDVUu5cWreZz1h9/token-balances
                        // window.open('https://tronscan.org/#/address/' + selectedRows[0].address + '/token-balances', '_bank');
                    }else if(type === '0' || type === '0T') {
                        // 测试: https://etherscan.io/address/0x8a37b79e54d69e833d79cac3647c877ef72830e1
                        window.open('https://etherscan.io/address/' + selectedRows[0].address, '_bank');
                        // 正式: https://rinkeby.etherscan.io/address/0x8a37b79e54d69e833d79cac3647c877ef72830e1
                        // window.open('https://rinkeby.etherscan.io/address/' + selectedRows[0].address, '_bank');
                    }else if(type === '3') {
                        window.open('https://omniexplorer.info/address/' + selectedRows[0].address, '_bank');
                    }
                }
            }
        });
    }
}

export default GJAddressQuery;
