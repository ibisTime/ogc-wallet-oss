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
} from '@redux/biz/information/information';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat} from 'common/js/util';
import {Modal, message} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.bizInformation,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Information extends React.Component {
    render() {
        const fields = [{
            field: 'title',
            title: '标题',
            search: true
        }, {
            field: 'type',
            title: '分类',
            search: true,
            listCode: '629008',
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            params: {
                status: '1'
            },
            render(v, d) {
                return d.typeName;
            }
        }, {
            field: 'gradeCode',
            title: '所需等级',
            search: true,
            listCode: '805407',
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            render(v, d) {
                return d.gradeName;
            }
        }, {
            field: 'status',
            title: '状态',
            search: true,
            data: [{
                key: '1',
                value: '显示'
            }, {
                key: '0',
                value: '不显示'
            }],
            type: 'select',
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'isTop',
            title: '是否置顶',
            search: true,
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            type: 'select',
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'readCount',
            title: '阅读次数'
        }, {
            field: 'updaterName',
            title: '修改人'
        }, {
            field: 'updateDatetime',
            title: '最近修改时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 629023,
            deleteCode: '629021',
            btnEvent: {
                showHide: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        let sName = selectedRows[0].status === '0' ? '显示' : '隐藏';
                        confirm({
                            title: `${sName}资讯`,
                            content: `是否${sName}该资讯`,
                            onOk: () => {
                                let hasMsg = message.loading('');
                                fetch('629029', {
                                    code: selectedRowKeys[0]
                                }).then(() => {
                                    hasMsg();
                                    message.success('操作成功', 1, () => {
                                        this.props.getPageData();
                                    });
                                }, hasMsg);
                            },
                            okText: '确定',
                            cancelText: '取消'
                        });
                    }
                }
            }
        });
    }
}

export default Information;
