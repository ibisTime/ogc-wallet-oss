import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { addUserMap } from '@redux/message';
import { getQueryString, moneyFormat, showSucMsg, getUserId, formatImg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import ChatBox from 'component/chat-box/chat-box';

@connect(
  state => ({ ...state.message }),
  { addUserMap }
)
class ArbitrationOrderResolve extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const { pageData } = this.state;
    const fields = [
      {
        field: 'remark',
        title: '备注',
        hidden: true,
        value: '0'
      }, {
      field: 'code',
      title: '编号',
      readonly: true
    }, {
      title: '被告',
      field: 'sellUser',
        formatter: (v, data) => {
          if (data.accused.userId !== data.buyUserInfo.userId) {
            // 卖家
            return data.accused.nickname + '-卖家';
          }else {
            return data.accused.nickname + '-买家';
          }
        },
      readonly: true
    }, {
      title: '原告',
      field: 'buyUser',
        formatter: (v, data) => {
          if (data.plaintiff.userId !== data.buyUserInfo.userId) {
            // 卖家
            return data.plaintiff.nickname + '-卖家';
          }else {
            return data.plaintiff.nickname + '-买家';
          }
        },
      readonly: true
    }, {
      title: '交易对',
      type: 'select',
      formatter: (v, data) => {
        return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
      },
      search: true,
      readonly: true
    }, {
      field: 'tradePrice',
      title: '涉案金额',
      readonly: true,
      formatter: (v, d) => {
        return d.tradeAmount + '-' + d.tradeCurrency;
      }
    }, {
      title: '申请原因',
      field: 'arbitrateReason',
      readonly: true
    }, {
      field: 'arbitrateCreateDatetime',
      title: '申请时间',
      type: 'datetime',
      readonly: true
    }, {
      title: '处理说明',
      field: 'arbitrateResult',
      type: 'textarea',
      normalArea: true,
      required: true
    }];
    return (
      <Row gutter={16}>
        <Col span={14}>
          {
            this.buildDetail({
                  fields,
                  code: this.code,
                  view: this.view,
                  detailCode: '625266',
                  buttons: [{
                      title: '通过',
                      handler: (param) => {
                          param.result = '1';
                          param.updater = getUserId();
                          this.doFetching();
                          fetch(625260, param).then(() => {
                              showSucMsg('操作成功');
                              this.cancelFetching();
                              setTimeout(() => {
                                  this.props.history.go(-1);
                              }, 1000);
                          }).catch(this.cancelFetching);
                      },
                      check: true,
                      type: 'primary'
                  }, {
                      title: '不通过',
                      handler: (param) => {
                          param.result = '0';
                          param.updater = getUserId();
                          this.doFetching();
                          fetch(625260, param).then(() => {
                              showSucMsg('操作成功');
                              this.cancelFetching();
                              setTimeout(() => {
                                  this.props.history.go(-1);
                              }, 1000);
                          }).catch(this.cancelFetching);
                      },
                      check: true
                  }, {
                      title: '返回',
                      handler: (param) => {
                          this.props.history.go(-1);
                      }
                  }],
                  afterDetail: () => {
                    const { pageData } = this.state;
                    let sellNickname = pageData.sellUser;
                    let sellPhoto = '';
                    if (pageData.sellUserInfo) {
                      sellNickname = pageData.sellUserInfo.nickname;
                      sellPhoto = pageData.sellUserInfo.photo;
                    }
                    this.props.addUserMap(pageData.sellUser, {
                      nickname: sellNickname,
                      photo: formatImg(sellPhoto)
                    });

                    let buyNickname = pageData.buyUser;
                    let buyPhoto = '';
                    if (pageData.buyUserInfo) {
                      buyNickname = pageData.buyUserInfo.nickname;
                      buyPhoto = pageData.buyUserInfo.photo;
                    }
                    this.props.addUserMap(pageData.buyUser, {
                      nickname: buyNickname,
                      photo: formatImg(buyPhoto)
                    });
                  }
              })
          }
        </Col>
        <Col span={10}>
          { pageData ? <ChatBox chatId={this.code} /> : null }
        </Col>
      </Row>
    );
  }
}

export default Form.create()(ArbitrationOrderResolve);
