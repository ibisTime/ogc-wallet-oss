import React from 'react';
import {Form, message} from 'antd';
import {
    getQueryString,
    moneyFormat,
    dateTimeFormat,
    getUserName,
    showSucMsg,
    addDate,
    HhMmSsDate,
    H0M0S0Date,
    dateFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
let setSymbol = getQueryString('coin');
let ele = document.createElement('span');
let divEle = document.createElement('div');
let dateData = {};
function getElementFn(el) {
  return document.getElementById(el).children[0].children[0];
}
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
              if(getElementFn('repayDatetime').value) {
                param.repayDatetime = getElementFn('repayDatetime').value;
              }
              if(getElementFn('incomeDatetime').value) {
                param.incomeDatetime = getElementFn('incomeDatetime').value;
              }
              if(getElementFn('arriveDatetime').value) {
                param.arriveDatetime = getElementFn('arriveDatetime').value;
              }
              param.expectYield = +param.expectYield / 100;
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
              if(getElementFn('repayDatetime').value) {
                param.repayDatetime = getElementFn('repayDatetime').value;
              }
              if(getElementFn('incomeDatetime').value) {
                param.incomeDatetime = getElementFn('incomeDatetime').value;
              }
              if(getElementFn('arriveDatetime').value) {
                param.arriveDatetime = getElementFn('arriveDatetime').value;
              }
              param.expectYield = +param.expectYield / 100;
              if(!param.repayDatetime || !param.incomeDatetime || !param.arriveDatetime) {
                message.warning('请填写完整');
              }
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
                let parElement = document.getElementById('successAmount').parentNode.parentNode;
                divEle.style.fontSize = '14px';
                divEle.innerText = '(募集的数量大于或等于此数值，即满标)';
                parElement.appendChild(divEle);
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            title: '总份数',
            field: 'totalFen',
            'Z+': true,
            required: true,
            onChange(v) {
              let allValue = document.getElementById('amount').value.trim();
              let parElement = document.getElementById('totalFen').parentNode.parentNode;
              if(allValue) {
                ele.style.marginLeft = '10px';
                ele.innerText = '每份：' + (+allValue / +v).toFixed(2);
                parElement.appendChild(ele);
              }
            }
        }, {
            title: '单人限购份数',
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
            // 改变起息时间
            setTimeout(() => {
              getElementFn('arriveDatetime').style.width = '200px';
              getElementFn('incomeDatetime').style.width = '200px';
              getElementFn('incomeDatetime').value = H0M0S0Date(data._d, 1);
              getElementFn('arriveDatetime').value = HhMmSsDate(data._d, limitDay);
              getElementFn('repayDatetime').value = dateFormat(addDate(data._d, limitDay + 1));
            }, 0);
          }
        }, {
            title: '起息时间',
            field: 'incomeDatetime',
            type: 'date',
            onChange(v) {
              setTimeout(() => {
                let limitDay = +(document.getElementById('limitDays').value.trim());
                getElementFn('incomeDatetime').value = H0M0S0Date(v._d, 0);
                getElementFn('arriveDatetime').value = HhMmSsDate(v._d, limitDay - 1);
                getElementFn('repayDatetime').value = dateFormat(addDate(v._d, limitDay));
                if(dateData) {
                  dateData.incomeDatetime = H0M0S0Date(v._d, 0);
                  dateData.arriveDatetime = HhMmSsDate(v._d, limitDay - 1);
                }
              }, 0);
            }
        }, {
            title: '到期时间',
            field: 'arriveDatetime',
            type: 'date',
            onChange(v) {
              setTimeout(() => {
                getElementFn('arriveDatetime').value = HhMmSsDate(v._d, 0);
                getElementFn('repayDatetime').value = dateFormat(addDate(v._d, 1));
                if(dateData && dateData.incomeDatetime) {
                  getElementFn('incomeDatetime').value = dateData.incomeDatetime;
                }else if(dateData) {
                  dateData.arriveDatetime = HhMmSsDate(v._d, 0);
                }
              }, 0);
            }
        }, {
            title: '还款日',
            field: 'repayDatetime',
            type: 'date',
            onChange() {
              setTimeout(() => {
                if(dateData && dateData.incomeDatetime) {
                  getElementFn('incomeDatetime').value = dateData.incomeDatetime;
                }
                if(dateData && dateData.arriveDatetime) {
                  getElementFn('arriveDatetime').value = dateData.arriveDatetime;
                }
              }, 0);
            }
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