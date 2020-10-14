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
} from '@redux/business/purchase/purchaseRecordTwo';
import {listWrapper} from 'common/js/build-list';
import {moneyFormat, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.purchaseRecordTwo,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class PurchaseRecordTwo extends React.Component {
    constructor(props) {
        super(props);
        this.type = getQueryString('type', this.props.location.search);
        this.purchaseProductCode = getQueryString('purchaseProductCode', this.props.location.search);
        this.buttons = [{
            name: '返回',
            handler: () => {
                this.props.history.go(-1);
            }
        }];
    }
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种名称',
            listCode: '802013',
            type: 'select',
            keyName: 'symbol',
            valueName: 'symbol',
            search: true,
            params: {
                purchaseFlag: 1
            }
        }, {
            field: 'mobile',
            title: '申请人',
            render(v, d) {
                return d && d.user.loginName;
            }
        }, {
            field: 'amount',
            title: '申购总数量'
        }, {
            field: 'price',
            title: '申购价格'
        }, {
            field: 'payAmount',
            title: '支付金额'
        }, {
            field: 'buyDatetime',
            title: '申购时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            rowKey: 'id',
            fields,
            pageCode: '650308',
            searchParams: {
                purchaseProductCode: this.type === 'prs' ? this.purchaseProductCode : ''
            },
            buttons: this.buttons
        });
    }
}

export default PurchaseRecordTwo;
