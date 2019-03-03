import React from 'react';
import {Form, message} from 'antd';
import {
    getQueryString,
    moneyFormat,
    moneyParse,
    showSucMsg,
    getUserName
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
let ele = document.createElement('span');
@Form.create()
class ProductsDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('productCode', this.props.location.search);
        this.id = getQueryString('id', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search);
        this.saleNum = '';
    }
    componentWillMount() {
      fetch(625555, {id: this.id}).then(data => {
        this.saleNum = data.product.saleNum;
      });
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
            title: '名称（中文简体）',
            field: 'nameZhCn',
            readonly: true,
            formatter(v, data) {
                return data.product.nameZhCn;
            }
          }, {
            title: '币种',
            field: 'symbol',
            readonly: true,
            formatter(v, data) {
              return data.product.symbol;
            }
          }, {
            title: '已售金额',
            field: 'saleAmount',
            amount: true,
            readonly: true,
            formatter: (v, data) => {
              return moneyFormat(data.product.saleAmount.toString(), '', this.symbol);
            }
          }, {
                title: '总收益',
                field: 'totalAmount',
                required: true,
                formatter: (v) => {
                    return moneyFormat(v.toString(), '', this.symbol);
                },
                onChange: (v) => {
                  setTimeout(() => {
                    let totalAmountDiv = document.getElementById('totalAmount').parentNode.parentNode;
                    if(totalAmountDiv && ele) {
                      ele.style.marginLeft = '10px';
                      if(v && this.saleNum) {
                        ele.innerHTML = '每份收益：' + (v / this.saleNum);
                        totalAmountDiv.appendChild(ele);
                      }
                    }
                  }, 100);
                }
            }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.id,
            view: this.view,
            detailCode: '625555',
            editCode: 625551,
            beforeSubmit: (params) => {
                params.id = this.id;
                return params;
            },
            buttons: [ {
                title: '保存',
                handler: (params) => {
                    if(params.totalAmount) {
                    params.totalAmount = moneyParse(params.totalAmount, '', this.symbol);
                    this.doFetching();
                    fetch(625551, params).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching(); setTimeout(() => {
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
            }]
        });
    }
}

export default ProductsDetail;
