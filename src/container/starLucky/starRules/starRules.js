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
} from '@redux/biz/starLucky/starRules';
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
        ...state.starLuckyStarRules,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarRules extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '星球名称'
        }, {
            field: 'starId',
            title: '星球名称',
            search: true,
            type: 'select',
            pageCode: '640003',
            keyName: 'id',
            valueName: '{{name.DATA}}-{{symbol.DATA}}',
            searchName: 'starId',
            noVisible: true
        }, {
            field: 'rulesName',
            title: '规则名称',
            render(v, d) {
                return d && `${d.symbol}第${d.batch}场`;
            }
        }, {
            field: 'startTime',
            title: '开始时间'
        }, {
            field: 'endTime',
            title: '结束时间'
        }, {
            field: 'openDatetime',
            title: '开奖时间'
        }, {
            field: 'fitRate',
            title: '中奖人数比例'
        }, {
            field: 'randomRange',
            title: '中奖金额的随机数'
        }];
        return <div className="superNode-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: '640025',
                    noSelect: true,
                    searchParams: {
                        starId: this.code
                    },
                    buttons: [{
                        code: 'editAll',
                        name: '配置规则',
                        handler: () => {
                            this.props.history.push(`/starLucky/starRules/addedit?starId=${this.code}`);
                        }
                    }]
                })
            }
        </div>;
    }
}

export default StarRules;