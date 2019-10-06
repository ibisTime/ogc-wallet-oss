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
} from '@redux/guessUpsDowns/sceneRecord';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, showSucMsg} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.GuessUpsDownsSceneRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SceneRecord extends React.Component {
    render() {
        const fields = [{
            field: 'planName',
            title: '场次',
            search: true
        }, {
            field: 'batch1',
            title: '币种',
            render: (v, data) => {
                return data.batch;
            },
            search: true
        }, {
            field: 'batch',
            title: '投注用户',
            type: 'select',
            pageCode: '610601',
            keyName: 'batch',
            valueName: '{{batch.DATA}}',
            searchName: 'batch',
            noVisible: true
        }, {
            field: 'status',
            title: '方向',
            type: 'select',
            key: 'snode_plan_status',
            search: true
        }, {
            field: 'divideCycle',
            title: '下注额'
        }, {
            field: 'startDate',
            title: '下注时间',
            type: 'datetime'
        }, {
            field: 'endDate',
            title: '赚取数量',
            type: 'datetime'
        }, {
            field: 'stepAmount',
            title: '备注',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC');
            }
        }];
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610601,
                        buttons: [{
                            code: 'goBack',
                            name: '返回',
                            handler: () => {
                                this.props.history.go(-1);
                            }
                        }, {
                            code: 'detail',
                            name: '详情',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/scene-record/addedit?v=1&code=${selectedRowKeys[0]}`);
                                }
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default SceneRecord;