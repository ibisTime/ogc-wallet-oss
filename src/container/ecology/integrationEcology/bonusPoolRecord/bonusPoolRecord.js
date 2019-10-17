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
} from '@redux/ecology/integrationEcology/bonusPoolRecord/bonusPoolRecord';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, getQueryString, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.IntegrationEcologyBonusPoolRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class BonusPoolRecord extends React.Component {
    constructor(props) {
        super(props);
        this.direction = getQueryString('direction', this.props.location.search);
        this.dappPoolId = getQueryString('dappPoolId', this.props.location.search);
        this.dappPoolIdFlag = !!getQueryString('dappPoolId', this.props.location.search);
        this.buttons = [{
            code: 'export',
            name: '导出'
        }];
        if(this.direction) {
            this.buttons = this.buttons.concat([{
                code: 'goBack',
                name: '返回',
                check: false,
                handler: () => {
                    this.props.history.go(-1);
                }
            }]);
        }
    }

    render() {
        const fields = [{
            field: 'dappname',
            title: '应用名称',
            render: (v, data) => {
                return data.openDapp.name;
            }
        }, {
            field: 'dappId',
            title: '应用',
            type: 'select',
            pageCode: '625455',
            keyName: 'id',
            valueName: '{{name.DATA}}',
            searchName: 'name',
            noVisible: true,
            search: !this.dappPoolIdFlag
        }, {
            field: 'symbol',
            title: '币池',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            render: (v, data) => v,
            search: true
        }, {
            field: 'remark',
            title: '业务说明'
        }, {
            field: 'count',
            title: '转账数量',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625043,
            rowKey: 'id',
            searchParams: {
                direction: this.direction,
                dappPoolId: this.dappPoolId
            },
            beforeSearch(data) {
                if (data.direction === '' || !data.direction) {
                   delete data.direction;
                }
                if (data.dappPoolId === '' || !data.dappPoolId) {
                    delete data.dappPoolId;
                }
                return data;
            },
            buttons: this.buttons
        });
    }
}

export default BonusPoolRecord;