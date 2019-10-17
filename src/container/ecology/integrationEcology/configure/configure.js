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
} from '@redux/ecology/integrationEcology/configure/configure';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.IntegrationEcologyConfigure,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Configure extends React.Component {
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
            search: true
        }, {
            field: 'name',
            title: '名称'
        }, {
            field: 'value',
            title: '数值'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625013,
            rowKey: 'id'
        });
    }
}

export default Configure;