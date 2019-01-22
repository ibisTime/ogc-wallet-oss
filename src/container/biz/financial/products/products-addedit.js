import React from 'react';
import {Form, message} from 'antd';
import {
    getQueryString,
    moneyFormat,
    dateTimeFormat,
    getUserName,
    showSucMsg,
    addDate,
    dateFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
let setSymbol = getQueryString('coin');
@Form.create()
class ProductsAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isEdit = !!getQueryString('isEdit', this.props.location.search);
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        this.api = null;
        if(!this.view && this.isEdit) {
          this.api = 625501;
        }else if(!this.view) {
          this.api = 625500;
        }
        if(!this.view) {
          this.buttons = [{
            title: '保存',
            handler: (param) => {
              param.isPublish = '0';
              param.creator = getUserName();
              param.code = this.code;
              if(this.isEdit) {
                  param.symbol = param.symbol1;
                  delete param.symbol1;
              }
              fetch(this.api, param).then(() => {
                showSucMsg('操作成功');
                setTimeout(() => {
                  this.props.history.go(-1);
                }, 1000);
              }).catch(this.props.cancelFetching);
            },
            check: true,
            type: 'primary'
          }, {
            title: '提交',
            handler: (param) => {
              param.isPublish = '1';
              param.code = this.code;
              if(this.isEdit) {
                param.symbol = param.symbol1;
                delete param.symbol1;
              }
              param.creator = getUserName();
              fetch(this.api, param).then(() => {
                showSucMsg('操作成功');
                setTimeout(() => {
                  this.props.history.go(-1);
                }, 1000);
              }).catch(this.cancelFetching);
            },
            check: true,
            type: 'primary'
          }, {
            title: '返回',
            handler: (param) => {
              this.props.history.go(-1);
            }
          }];
        }else {
          this.buttons = [{
            title: '返回',
            handler: (param) => {
              this.props.history.go(-1);
            }
          }];
        }
    }

    render() {
        function getElementFn(el) {
          return document.getElementById(el).children[0].children[0];
        }
        const fields = [{
            title: '名称（中文简体）',
            field: 'nameZhCn',
            required: true
        }, {
            title: '名称（英文）',
            field: 'nameEn',
            required: true
        }, {
            title: '币种',
            field: 'symbol',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            required: true,
            readonly: !!this.code,
            onChange: () => {
                if(!this.isEdit && !this.isCheck && !this.view) {
                  setTimeout(() => {
                    setSymbol = document.querySelector('.ant-select-search__field').value.split('-')[0];
                  }, 1000);
                }
            }
        }, {
            title: '币种',
            field: 'symbol1',
            formatter: function (v, data) {
                return data.symbol;
            },
            hidden: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'product_type',
            required: true,
            readonly: !!this.code
        }, {
            title: '产品期限（天）',
            field: 'limitDays',
            required: true,
            number: true,
            isPositive: true,
            'Z+': true
        }, {
            title: '预期年化收益率(%)',
            field: 'expectYield',
            required: true,
            number: true,
            range: [0, 100],
            rate: true,
            formatter: function (v, data) {
              if(v) {
                return v * 100;
              }
              return '';
            }
        }, {
            title: '总募集金额',
            field: 'amount',
            coinAmount: true,
            required: true,
            coin: setSymbol,
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            title: '募集成功金额',
            field: 'successAmount',
            coinAmount: true,
            required: true,
            coin: setSymbol,
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            title: '总份数',
            field: 'totalFen',
            'Z+': true,
            required: true
        }, {
            title: '限购份数',
            field: 'limitFen',
            'Z+': true,
            required: true
        }, {
          title: '募集开始时间',
          field: 'startDatetime',
          type: 'datetime',
          required: true
        }, {
          title: '募集结束时间',
          field: 'endDatetime',
          type: 'datetime',
          required: true,
          onChange(data) {
            let limitDay = +(document.getElementById('limitDays').value.trim());
            let startTime = new Date(getElementFn('startDatetime').value).getTime();
            if(new Date(data._d).getTime() < startTime) {
              message.warning('请选择大于募集开始的时间');
              return;
            }
            if(!limitDay) {
              message.warning('请选择产品期限');
              return;
            }
            // 起息时间
            getElementFn('incomeDatetime').value = addDate(data._d, 1);
            getElementFn('arriveDatetime').value = addDate(data._d, limitDay);
            getElementFn('repayDatetime').value = dateFormat(addDate(data._d, limitDay + 1));
          }
        }, {
            title: '起息时间',
            field: 'incomeDatetime',
            type: 'datetime',
            required: true
        }, {
            title: '到期时间',
            field: 'arriveDatetime',
            type: 'datetime',
            required: true
        }, {
            title: '还款日',
            field: 'repayDatetime',
            type: 'datetime',
            required: true
        }, {
            title: '回款方式',
            field: 'paymentType',
            value: '0',
            required: true,
            hidden: true
        }, {
            title: '购买属性（中文简体）',
            field: 'buyDescZhCn',
            type: 'textarea',
            required: true
        }, {
            title: '购买属性（英文）',
            field: 'buyDescEn',
            type: 'textarea',
            required: true
        }, {
            title: '赎回属性（中文简体）',
            field: 'redeemDescZhCn',
            type: 'textarea',
            required: true
        }, {
            title: '赎回属性（英文）',
            field: 'redeemDescEn',
            type: 'textarea',
            required: true
        }, {
            title: '说明书（中文简体）',
            field: 'directionsZhCn',
            type: 'textarea',
            required: true
        }, {
            title: '说明书（英文）',
            field: 'directionsEn',
            type: 'textarea',
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625511',
            buttons: this.buttons
        });
    }
}

export default ProductsAddedit;