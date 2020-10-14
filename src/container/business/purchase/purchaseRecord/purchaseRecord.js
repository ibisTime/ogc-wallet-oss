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
} from '@redux/business/purchase/purchaseRecord';
import {listWrapper} from 'common/js/build-list';
import {moneyFormat, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.purchasePurchaseRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class PurchaseRecord extends React.Component {
    constructor(props) {
        super(props);
        this.type = getQueryString('type', this.props.location.search);
        this.purchaseProductCode = getQueryString('purchaseProductCode', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'purchaseProductCode',
            title: '标的编号'
        }, {
            field: 'purchaseProductType',
            title: '申购类型',
            type: 'select',
            key: 'purchase_product_type'
        }, {
            field: 'symbol',
            title: '币种名称',
            listCode: '802013',
            type: 'select',
            keyName: 'symbol',
            valueName: 'symbol',
            search: true,
            params: {
                status: 0
            }
        }, {
            title: '申购人',
            field: 'userId',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            field: 'loginName',
            title: '申购人',
            render(v, d) {
                return d && d.user.loginName;
            }
        }, {
            field: 'amount',
            title: '申购总数量'
        }, {
            field: 'payAmount',
            title: '支付总额'
        }, {
            field: 'price',
            title: '币单价(USDT)'
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
            }
        });
    }
}

export default PurchaseRecord;
