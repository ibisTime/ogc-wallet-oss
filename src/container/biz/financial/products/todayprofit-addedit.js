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
      this.buttons = [{
        title: '保存',
        handler: (params) => {
            if(params.totalAmount) {
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
        }
      }, {
        code: 'back',
        title: '返回',
        handler: () => {
          this.props.history.go(-1);
        }
      }];
    }
    render() {
        const fields = [
            {
                field: 'productCode',
                hidden: true
            }, {
                title: '收益',
                field: 'totalAmount',
                required: true
            }, {
                title: '更新人',
                field: 'updater',
                hidden: true
            }];
        return this.buildDetail({
            fields,
            // key: 'ckey',
            code: this.code,
            view: this.view,
            buttons: this.buttons
        });
    }
}

export default ProductsDetail;
