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
} from '@redux/marketingManagement/regularActivities/releasePlan';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat, getQueryString } from 'common/js/util';
import { Link } from 'react-router-dom';

@listWrapper(
    state => ({
        ...state.marketReleasePlan,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ReleasePlan extends React.Component {
    state = {
        ...this.state
    };
    rightCode = getQueryString('rightCode');
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            title: '用户',
            field: 'userName',
            render() {
                return sessionStorage.getItem('userName') || '-';
            }
        }, {
            title: '币种',
            field: 'currency',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            search: true,
            noVisible: true
        }, {
            title: '币种',
            field: 'currency1',
            render(v, d) {
                return d && d.currency;
            }
        }, {
            title: '数量',
            field: 'amount'
        }, {
            title: '发放时间',
            field: 'releaseDatetime',
            type: 'datetime'
        }, {
            title: '发放说明',
            field: 'note',
            render(v, d) {
                return d.rights && d.rights.note;
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'right_plan_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: '670025',
            searchParams: {
                rightCode: this.rightCode
            },
            buttons: [{
                code: 'goBack',
                name: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }, {
                code: 'export',
                name: '导出'
            }]
        });
    }
}

export default ReleasePlan;
