import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class ShopOrderAddedit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        field: 'code',
        title: '订单号'
    }, {
        field: 'loginName',
        title: '下单人',
        formatter(v, d) {
            return d.user && d.user.loginName;
        }
    }, {
        field: 'amount',
        title: '订单总额',
        formatter(v, d) {
            return v && moneyFormat(v, '', d.priceSymbol) + `(${d.priceSymbol})`;
        }
    }, {
        field: 'postFee',
        title: '邮费',
        formatter(v, d) {
            return v && moneyFormat(v, '', d.priceSymbol) + `(${d.priceSymbol})`;
        }
    }, {
        field: 'paySymbol',
        title: '支付币种'
    }, {
        field: 'market',
        title: '支付时行情'
    }, {
        field: 'payAmount',
        title: '实际支付金额',
        formatter(v, d) {
            return v && moneyFormat(v, '', d.paySymbol) + `(${d.paySymbol})`;
        }
    }, {
        field: 'payDatetime',
        title: '支付时间',
        type: 'datetime'
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        type: 'datetime'
    }, {
        field: 'status',
        title: '订单状态',
        type: 'select',
        key: 'mall_order_status',
        search: true
    }, {
        title: '订单商品列表',
        field: 'mallProductOrderList',
        type: 'o2m',
        options: {
            add: true,
            edit: true,
            delete: true,
            fields: [{
                title: '商品名称',
                field: 'productName'
            }, {
                title: '商品规格',
                field: 'productSpecsName'
            }, {
                title: '所属类别',
                field: 'productType',
                type: 'select',
                listCode: '808007',
                keyName: 'code',
                valueName: 'name',
                params: {
                    status: '1'
                }
            }, {
                title: '数量',
                field: 'count',
                number: true
            }, {
                title: '折扣',
                field: 'discount'
            }, {
                title: '价格(USDT)',
                field: 'specsPrice',
                amount: true
            }, {
                title: '运费(USDT)',
                field: 'postFee',
                number: true,
                required: true
            }, {
                title: '发货地',
                field: 'province'
            }, {
                title: '规格1',
                field: 'specsVal1',
                required: true,
                render(v, d) {
                    return v && `${v}/${d.specsName1}`;
                }
            }, {
                title: '规格2',
                field: 'specsVal2',
                required: true,
                render(v, d) {
                    return v && `${v}/${d.specsName2}`;
                }
            }, {
                title: '重量(kg)',
                field: 'weight',
                required: true
            }, {
                title: '规格图片',
                field: 'specsPic',
                required: true,
                single: true,
                type: 'img'
            }]
        },
        required: true
    }, {
        field: 'receiver',
        title: '收货人'
    }, {
        field: 'reMobile',
        title: '收货人电话'
    }, {
        field: 'reAddress',
        title: '收货地址'
    }, {
        field: 'pdf',
        title: '物流单',
        type: 'file'
    }, {
        field: 'logisticsCode',
        title: '物流单号'
    }, {
        field: 'logisticsCompany',
        title: '物流公司',
        type: 'select',
        key: 'kd_company'
    }, {
        field: 'signerName',
        title: '签收人'
    }, {
        field: 'signDatetime',
        title: '签收时间',
        type: 'datetime'
    }, {
        field: 'remark',
        title: '备注'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: '808066'
    });
  }
}

export default ShopOrderAddedit;
