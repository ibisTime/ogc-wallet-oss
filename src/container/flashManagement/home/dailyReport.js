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
} from '@redux/flashManagement/dailyReport';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateFormat} from 'common/js/util';
import './home.css';

@listWrapper(
    state => ({
        ...state.dailyReport,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class dailyReport extends React.Component {
    render() {
        const fields = [{
            field: 'symbolPair',
            title: '交易对'
        }, {
            field: 'countOutTotal',
            title: '总兑出数量'
        }, {
            field: 'fee',
            title: '手续费'
        }, {
            field: 'countOut',
            title: '实际兑出数量'
        }, {
            field: 'countIn',
            title: '兑入数量'
        }, {
            field: 'createDate1',
            title: '创建时间',
            render(v, d) {
                return d && dateFormat(d.createDate);
            }
        }, {
            field: 'createDate',
            title: '创建时间',
            type: 'date',
            rangedate: ['createDateStart', 'createDateEnd'],
            search: true,
            noVisible: true
        }];
        return (
            <div className="superNode-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        rowKey: 'id',
                        pageCode: '800022',
                        buttons: [{
                            code: 'export',
                            name: '导出'
                        }]
                    })
                }
            </div>
        );
    }
}

export default dailyReport;
