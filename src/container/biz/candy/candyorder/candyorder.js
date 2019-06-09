import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/candy/candyorder/candyorder';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import {Modal, message, Input} from 'antd';

@listWrapper(
  state => ({
      ...state.candyCandyOrder,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Candyorder extends React.Component {
    state = {
        visible: false,
        code: '',
        xyCount: null
    };
    render() {
        const fields = [{
            field: 'loginName',
            title: '购买用户',
            render(v, d) {
                return d.user && d.user.nickname + '-' + d.user.loginName;
            }
        }, {
            field: 'userId',
            title: '购买用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            noVisible: true
        }, {
            field: 'candyName',
            title: '糖果名称'
        }, {
            field: 'price',
            title: '价格',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol) + data.symbol;
            }
        }, {
            field: 'rate',
            title: '甜度'
        }, {
            field: 'orderNo',
            title: '购买次序'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'candy_order_status',
            search: true
        }, {
            field: 'incomeTime',
            title: '预计收益时间',
            type: 'datetime'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      pageCode: 610435,
                      deleteCode: '610421'
                  })
              }
          </div>
        );
    }
}

export default Candyorder;
