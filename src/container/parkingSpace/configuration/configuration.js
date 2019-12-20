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
} from '@redux/parkingSpace/configuration/configuration';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.parkingSpaceConfiguration,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Configuration extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值'
        }];
        return (<div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: '630045',
                    searchParams: {
                        type: 'car'
                    },
                    btnEvent: {
                        edit: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.props.history.push(`/public/publicConfiguration/addedit?code=${selectedRowKeys[0]}&ctype=${selectedRows[0].ckey}&type=car`);
                            }
                        }
                    }
                })
            }
        </div>);
    }
}

export default Configuration;
