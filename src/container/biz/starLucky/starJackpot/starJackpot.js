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
} from '@redux/biz/starLucky/starJackpot';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.starLuckyStarJackpot,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarJackpot extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '星球',
            search: true
        }, {
            field: 'userName',
            title: '余额'
        }, {
            field: 'userName1',
            title: '遗留总额'
        }, {
            field: 'userName2',
            title: '调整总额'
        }, {
            field: 'userName3',
            title: '进池总额'
        }, {
            field: 'updateName4',
            title: '出池总额'
        }];
        return this.props.buildList({
            fields,
            pageCode: '623010',
            searchParams: {
                redPacketCode: this.code
            },
            btnEvent: {
                recordInto: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/starLucky/starJackpotRecord`);
                    }
                }
            }
        });
    }
}

export default StarJackpot;