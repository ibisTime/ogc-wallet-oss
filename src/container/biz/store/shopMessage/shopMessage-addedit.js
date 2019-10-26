import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class ShopMessageAddedit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = getQueryString('v', this.props.location.search);
    this.firstUpdate = true;
    this.shopKind = '';
    this.state = {
      ...this.state,
      shopLocation: ''
    };
    this.timer = null;
  }
  render() {
    const fields = [{
      field: 'code',
      title: '产品编号',
      hidden: !this.view
    }, {
      field: 'name',
      title: '产品名称',
      required: true
    }, {
      field: 'type',
      title: '所属类别',
      required: true,
      type: 'select',
      listCode: '808007',
      keyName: 'code',
      valueName: 'name',
      params: {
        status: '1'
      }
    }, {
      field: 'kind',
      title: '产品类型',
      required: true,
      type: 'select',
      key: 'mall_product_kind',
      onChange: (v) => {
        this.shopKind = v;
        this.setState({
          shopLocation: v
        });
      },
      formatter: (v) => {
        if(v && this.code) {
          if(this.firstUpdate) {
            this.firstUpdate = false;
            this.shopKind = v;
            this.setState({
              shopLocation: v
            });
          }
        }
        return v;
      }
    }, {
      field: 'video',
      title: '产品视频',
      type: 'file'
    }, {
      field: 'orderNo',
      title: '展示顺序',
      required: true
    }, {
      field: 'location',
      title: '展示位置',
      type: 'select',
      key: 'product_location',
      required: true,
      hidden: this.state.shopLocation === '2'
    }, {
      field: 'advPic',
      title: '列表展示图',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'pic',
      title: '商品详情介绍图(多)',
      type: 'img',
      required: true
    }, {
      field: 'specsName1',
      title: '规格名称1',
      required: true
    }, {
      field: 'specsName2',
      title: '规格名称2'
    }, {
      field: 'tag',
      title: '标签',
      type: 'select',
      key: 'mall_product_tag',
      multiple: true
    }, {
      title: '产品规格列表',
      field: 'productSpecsList',
      type: 'o2m',
      options: {
        add: true,
        edit: true,
        delete: true,
        fields: [{
          title: '次序',
          field: 'orderNo',
          required: true
        }, {
          title: '名称',
          field: 'name',
          required: true
        }, {
          title: '图片',
          field: 'pic',
          required: true,
          single: true,
          type: 'img'
        }, {
          title: '库存',
          field: 'quantity',
          number: true,
          required: true
        }, {
          title: '原价(USDT)',
          field: 'originalPrice',
          required: true,
          readonly: this.shopKind === '2',
          render: (v) => {
            return this.shopKind === '2' ? '0' : v;
          },
          formatter: (v) => {
            return this.shopKind === '2' ? '0' : v;
          },
          onKeyUp: (v) => {
            if(this.timer) {
              clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
              const discountTipEle = document.getElementById('discountTipEle');
              const discount = document.getElementById('discount').value;
              if((!isNaN(+v) && v !== '') && (!isNaN(+discount) && discount !== '')) {
                const price = (Math.floor(+discount * +v * 100) / 100).toFixed(2);
                discountTipEle.innerText = `售价：${price} = ${v} * ${discount}`;
              }else {
                discountTipEle.innerText = '';
              }
            }, 500);
          }
        }, {
          title: '折扣(0-1)',
          field: 'discount',
          required: true,
          help: '比如，0.1就是指打1折',
          readonly: this.shopKind === '2',
          render: (v) => {
            return this.shopKind === '2' ? '0' : v;
          },
          formatter: (v) => {
            return this.shopKind === '2' ? '0' : v;
          },
          tipEle: {
            id: 'discountTipEle',
            style: {
              color: '#1890ff'
            }
          },
          onKeyUp: (v) => {
            if(this.timer) {
              clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
              const discountTipEle = document.getElementById('discountTipEle');
              const originalPrice = document.getElementById('originalPrice').value;
              if((!isNaN(+v) && v !== '') && (!isNaN(+originalPrice) && originalPrice !== '')) {
                const price = (Math.floor(+originalPrice * v * 100) / 100).toFixed(2);
                discountTipEle.innerText = `售价：${price} = ${originalPrice} * ${v}`;
              }else {
                discountTipEle.innerText = '';
              }
            }, 500);
          }
        }, {
          title: '运费(USDT)',
          field: 'postFee',
          number: true,
          required: true
        }, {
          title: '发货地（省）',
          field: 'province',
          type: 'provSelect'
        }, {
          title: '重量(kg)',
          field: 'weight'
        }, {
          title: '规格1',
          field: 'specsVal1',
          required: true
        }, {
          title: '规格2',
          field: 'specsVal2'
        }]
      },
      required: true
    }, {
      title: '产品描述',
      field: 'description',
      type: 'textarea',
      required: true
    }, {
      field: 'slogan',
      title: ' 标语',
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: '808026',
      addCode: '808010',
      editCode: '808012',
      beforeSubmit: (params) => {
        params.storeCode = 'SYS_JINMI_YOUXUAN';
        if(this.shopKind === '2') {
          params.productSpecsList.forEach(item => {
            item.originalPrice = '0';
            item.discount = '0';
          });
          params.location = '0';
        }
        return params;
      }
    });
  }
}

export default ShopMessageAddedit;
