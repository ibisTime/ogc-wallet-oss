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
  }
  render() {
    const fields = [{
      field: 'name',
      title: '名称',
      required: true
    }, {
        field: 'type',
        title: '类型',
        required: true,
        type: 'select',
        listCode: '808007',
        keyName: 'code',
        valueName: 'name',
        params: {
            status: '1'
        }
    }, {
        field: 'userLevel',
        title: '用户专享等级',
        required: true,
        pageCode: '805403',
        type: 'select',
        keyName: 'code',
        valueName: 'name',
        params: {
          limit: 100
        }
    }, {
        field: 'advPic',
        title: ' 广告图',
        type: 'img',
        single: true,
        required: true
    }, {
        field: 'specsName1',
        title: ' 规格1',
        required: true
    }, {
        field: 'specsName2',
        title: ' 规格2',
        required: true
    }, {
        field: 'pic',
        title: ' 商品图片',
        type: 'img',
        required: true
    }, {
        field: 'video',
        title: ' 视频',
        type: 'file'
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
                title: '库存',
                field: 'quantity',
                number: true,
                required: true
            }, {
                title: '原价',
                field: 'originalPrice',
                amount: true,
                required: true
            }, {
                title: '折扣(0-1)',
                field: 'discount',
                required: true,
                help: '比如，0.1就是指打1折'
            }, {
                title: '运费',
                field: 'postFee',
                number: true,
                required: true
            }, {
                title: '发货地（省）',
                field: 'province',
                required: true
            }, {
                title: '规格1',
                field: 'specsVal1',
                required: true
            }, {
                title: '规格2',
                field: 'specsVal2',
                required: true
            }, {
                title: '重量(kg)',
                field: 'weight',
                required: true
            }, {
                title: '图片',
                field: 'pic',
                required: true,
                single: true,
                type: 'img'
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
        title: ' 标语'
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
      beforeSubmit(params) {
        params.storeCode = 'SYS_JINMI_YOUXUAN';
        return params;
      }
    });
  }
}

export default ShopMessageAddedit;
