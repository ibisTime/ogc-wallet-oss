import React from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import {message, Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/vpnDown/home';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, formatImg, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.vpnDownHome,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Home extends React.Component {
    confirmModal = (obj, params) => {
        Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: obj.content,
            onOk: () => {
                this.props.doFetching();
                return fetch(obj.code, params).then(() => {
                    this.props.getPageData();
                    showSucMsg('操作成功');
                }).catch(() => {
                    this.props.cancelFetching();
                });
            }
        });
    };
    render() {
        const fields = [{
            field: 'name',
            title: '名称',
            search: true,
            noVisible: true
        }, {
            field: 'nameZh',
            title: '中文名称'
        }, {
            field: 'nameEn',
            title: '英文名称'
        }, {
            field: 'type',
            title: '类型',
            key: 'down_type',
            type: 'select',
            search: true
        }, {
            field: 'icon',
            title: '图标',
            type: 'img'
        }, {
            field: 'client',
            title: '客户端',
            type: 'select',
            data: [{
                key: '1',
                value: 'android'
            }, {
                key: '0',
                value: 'ios'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'readNum',
            title: '阅读数量'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                key: '1',
                value: '上架'
            }, {
                key: '0',
                value: '下架'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'orderNo',
            title: '排序'
        }];
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        rowKey: 'id',
                        pageCode: 628222,
                        buttons: [{
                            code: 'add',
                            name: '新增'
                        }, {
                            code: 'edit',
                            name: '修改'
                        }, {
                            code: 'upDown',
                            name: '上架/下架',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    const tit = selectedRows[0].status === '1' ? '下架' : '上架';
                                    this.confirmModal({
                                        content: `是否${tit}`,
                                        code: 628225
                                    }, {
                                        id: selectedRowKeys[0]
                                    });
                                }
                            }
                        }, {
                            code: 'detail',
                            name: '详情'
                        }]
                    })
                }
            </div>
        );
    }
}

export default Home;
