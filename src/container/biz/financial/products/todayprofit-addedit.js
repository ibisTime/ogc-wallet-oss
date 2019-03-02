import React from 'react';
import {Form} from 'antd';
import {
    getQueryString,
    moneyFormat,
    showSucMsg,
    getUserName,
    moneyParse
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
@Form.create()
class ProductsDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('productCode', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [
            {
                field: 'productCode',
                hidden: !this.isDetail
            }, {
                title: '收益',
                field: 'totalAmount',
                formatter: function (v, data) {
                    return moneyFormat(v.toString(), '', data.symbol);
                },
                required: true
            }, {
                title: '更新人',
                field: 'updater',
                hidden: !this.isDetail
            }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 625550,
            editCode: 625551,
            // beforeSubmit: (params) => {
            //     params.productCode = this.code;
            //     params.totalAmount = moneyFormat(params.totalAmount, '', this.symbol);
            //     return params;
            // },
            buttons: [{
                title: '保存',
                handler: (params) => {
                    params.code = this.code;
                    params.symbol = this.symbol;
                    params.totalAmount = moneyParse(params.totalAmount, '', this.symbol);
                    params.productCode = params.code;
                    this.doFetching();
                    fetch(625550, params).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                code: 'back',
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default ProductsDetail;
