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
} from '@redux/candy/earnings/earningsQuery';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';

@listWrapper(
  state => ({
      ...state.earningsQuery,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class EarningsQuery extends React.Component {
    render() {
        const fields = [{
            field: 'buyName',
            title: '购买人',
            render(v, d) {
                return `${d.buyUserRealName}-${d.buyUserMobile}`;
            }
        }, {
            field: 'buyUserId',
            title: '购买人',
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
            field: 'beneName',
            title: '收益人',
            render(v, d) {
                return `${d.benefitUserRealName}-${d.benefitUserMobile}`;
            }
        }, {
            field: 'userId',
            title: '收益人',
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
            field: 'type',
            title: '收益类型',
            type: 'select',
            key: 'candy_income_type ',
            search: true
        }, {
            field: 'income',
            title: '收益金额',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol) + data.symbol;
            }
        }, {
            field: 'status',
            title: '状态',
            render: () => '已结算'
        }, {
            field: 'incomeTime',
            title: '收益时间',
            type: 'datetime',
            search: true
        }];
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      rowKey: 'id',
                      pageCode: 610443
                  })
              }
          </div>
        );
    }
}

export default EarningsQuery;
