import React from 'react';
import {Modal, Form} from 'antd';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/BTC-finance/GJManually/GJManually-addedit';
import {getQueryString, moneyFormat, showSucMsg, showMsgfirm} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail';
let symbol = '';
@Form.create()
class GJManuallyAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
  render() {
    let fields = [{
      field: 'symbol',
      title: '币种类型',
      type: 'select',
      pageCode: '802005',
      params: {
        status: '0'
      },
      keyName: 'symbol',
      valueName: '{{symbol.DATA}}-{{cname.DATA}}',
      searchName: 'symbol',
      search: true,
      render: (v) => v,
      required: true,
      onChange: (v) => {
        symbol = v;
      }
    }, {
      title: '被归集地址',
      field: 'address',
      type: 'select',
      required: true,
      pageCode: '802300',
      keyName: 'accountNumber',
      valueName: '{{currency.DATA}}-{{address.DATA}}',
      onChange: (v) => {
        if (v && symbol) {
          fetch(802300, {
            currency: symbol,
            limit: '10',
            start: '1',
            orderColumn: 'amount',
            orderDir: 'desc'
          }).then((data) => {
            this.setState({
              selectData: {
                ...this.state.selectData,
                address: data
              }
            });
          }).catch(() => {});
        }else if(!symbol) {
          Modal.confirm({
            title: '',
            content: '请先选择币种类型',
            onOk() {},
            onCancel() {}
          });
        }
      }
    }];
    return this.buildDetail({
      fields,
      buttons: [{
        title: '归集',
        handler: (param) => {
          Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: `该地址将进行归集，确定进行操作吗？`,
            onOk: () => {
              this.doFetching();
              fetch(802360, param).then(() => {
                showSucMsg('操作成功');
                this.props.form.setFieldsValue({
                  'balanceStart': ''
                });
                this.cancelFetching();
              }).catch(this.cancelFetching);
            }
          });
        },
        check: true,
        type: 'primary'
      }]
    });
  }
}

export default GJManuallyAddedit;
