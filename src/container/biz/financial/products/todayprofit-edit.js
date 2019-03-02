import React from 'react';
import {Form} from 'antd';
import {
    getQueryString,
    moneyFormat,
    moneyParse,
    showSucMsg,
    getUserName
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class ProductsDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('id', this.props.location.search);
        // this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [
            {
                field: 'id',
                hidden: true
            }, {
                title: '产品编号',
                field: 'productCode',
                readonly: true
            }, {
                title: '收益',
                field: 'totalAmount',
                required: true,
                formatter: function (v, data) {
                    return moneyFormat(v.toString(), '', data.totalAmount);
                }
            }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '625555',
            editCode: 625551,
            beforeSubmit: (params) => {
                params.id = this.code();
                return params;
            },
            buttons: [ {
                title: '保存',
                handler: (params) => {
                    params.totalAmount = moneyParse(params.totalAmount, '', this.symbol);
                    this.doFetching();
                    fetch(625551, params).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching(); setTimeout(() => {
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
