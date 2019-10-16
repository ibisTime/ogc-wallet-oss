import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/public/pointpostion';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName,
    dateTimeFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import UpDowns from 'component/up-down/pay';
@listWrapper(
    state => ({
        ...state.publicPointPostion,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class publicPointPostion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updownVisible: false,
            code: '',
            biz: '',
            data: [],
            level: []
        };
    }
    componentDidMount() {
        // 直接请求
        this.props.doFetching();// loading显示
        Promise.all([
            fetch(805105, {
                start: 1,
                limit: 10
                // type: 'B'
            })
        ]).then(([data]) => {
            this.setState({
                data: data.commitUserInfo
            });
            this.props.cancelFetching();// loading隐藏
        }).catch(this.props.cancelFetching);
    }
    setModalVisible = (updownVisible) => {
        this.setState({ updownVisible });
    }
    render() {
        const {data} = this.state;
        const fields = [
            {
            title: '账户',
            field: 'commitUser',
            render: (v, d) => {
                return d.commitUserInfo ? d.commitUserInfo.nickname + '(' + (d.commitUserInfo.mobile ? d.commitUserInfo.mobile : (d.commitUserInfo.email ? d.commitUserInfo.email : '暂无账户信息')) + ')' : '';
            },
            search: true
        }, {
            title: '所在端',
            field: 'deviceSystem',
            search: true
        }, {
            title: '严重等级',
            search: true,
            type: 'select',
            key: 'bug_level',
            field: 'level'
        }, {
            title: '状态',
            type: 'select',
            field: 'status',
            data: [{
                key: '0',
                value: '待审核'
            }, {
                key: '1',
                value: '处理中'
            }, {
                key: '2',
                value: '复现不成功'
            }, {
                key: '3',
                value: '已处理'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '更新时间',
            field: 'commitDatetime',
            rangedate: ['commitDatetimeStart', 'commitDatetimeEnd'],
            type: 'date',
            render: dateTimeFormat,
            search: true
        }, {
            title: '备注',
            field: 'commitNote'
        }];
        return (
            <div>
                {this.props.buildList({
            fields,
            pageCode: '805105',
            beforeSubmit: (data) => {
                return data;
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是可以审核的状态');
                    } else {
                        this.props.history.push(`/public/pointpostion/addedit?code=${selectedRows[0].code}&v=1`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/public/pointpostion/addedit?code=${selectedRows[0].code}&v=1&isAdd=1`);
                    }
                },
                zf: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是可以修复完成的状态');
                    } else {
                        this.setState({
                            updownVisible: true,
                            code: selectedRows[0].code,
                            payUser: getUserName(),
                            biz: 805102
                        });
                    }
                }
            }
        })}
                <UpDowns
                    updownVisible={this.state.updownVisible}
                    setModalVisible={this.setModalVisible}
                    biz={this.state.biz}
                    code ={this.state.code}
                    onOk={() => {
                        this.setModalVisible(false);
                        this.props.getPageData();
                    }} />
            </div>
        );
    }
}

export default publicPointPostion;
