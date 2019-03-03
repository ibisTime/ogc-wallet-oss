import React from 'react';
import {Form, message} from 'antd';
import {
    getQueryString,
    moneyFormat,
    showSucMsg,
    getUserName,
    moneyParse
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
let ele = document.createElement('span');
let divEle = document.createElement('div');

@Form.create()
class ProductsDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('productCode', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.saleNum = 0;
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
            }else {
                message.warning('请填写收益');
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
    componentWillMount() {
      fetch(625511, {code: this.code}).then(data => {
          this.saleNum = data.saleNum;
      });
    }
    render() {
        const fields = [
            {
                field: 'productCode',
                hidden: true
            }, {
                title: '名称（中文简体）',
                field: 'nameZhCn',
                required: true,
                readonly: !!this.code
            }, {
                title: '币种',
                field: 'symbol',
                type: 'select',
                required: true,
                readonly: !!this.code
            }, {
                title: '已售金额',
                field: 'saleAmount',
                amount: true,
                required: true,
                readonly: !!this.code,
                formatter: (v) => {
                    return moneyFormat(v.toString(), '', this.symbol);
                }
            }, {
                title: '收益',
                field: 'totalAmount',
                required: true,
                'Z+': true,
                onChange: (v) => {
                  setTimeout(() => {
                    let totalAmountDiv = document.getElementById('totalAmount').parentNode.parentNode;
                    if(v && totalAmountDiv && ele) {
                      ele.style.marginLeft = '10px';
                      ele.innerHTML = '每份收益：' + (v / this.saleNum);
                      totalAmountDiv.appendChild(ele);
                    }
                  });
                }
            }, {
                title: '更新人',
                field: 'updater',
                hidden: true
            }];
        return this.buildDetail({
            fields,
            editCode: 630042,
            detailCode: 625511,
            code: this.code,
            buttons: this.buttons
        });
    }
}

export default ProductsDetail;
