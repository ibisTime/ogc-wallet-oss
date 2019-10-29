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
} from '@redux/biz/starLucky/starConfiguration';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString,
    findDsct
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.starLuckyStarConfiguration,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.starName = sessionStorage.getItem('starName') || '';
        this.starSymbol = sessionStorage.getItem('starSymbol') || '';
        this.type = getQueryString('type', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '星球名称',
            render: () => {
                return this.starName && `${this.starName}(${this.starSymbol})`;
            }
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
            field: 'remark',
            title: '配置'
        }, {
            field: 'value',
            title: '数值'
        }];
        return <div className="guessUpsDowns-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: '640060',
                    searchParams: {
                        starId: this.code
                    },
                    buttons: [{
                        code: 'goBack',
                        name: '返回',
                        handler() {
                            window.history.go(-1);
                        }
                    }, {
                        code: 'edit',
                        name: '修改'
                    }, {
                        code: 'goPlay',
                        name: '玩法介绍',
                        handler: (selectedRowKeys, selectedRows) => {
                            fetch(630045, {type: 'star', start: 1, limit: 100}).then(data => {
                                let arr = [];
                                for(let i = 0; i < data.list.length; i++) {
                                    arr.push({
                                        dkey: data.list[i].ckey,
                                        dvalue: data.list[i].id
                                    });
                                }
                                let id = findDsct(arr, 'star_instruction_textarea');
                                this.props.history.push(`/starLucky/configuration/addedit?code=${id}&type=type_card&cType=star_instruction_textarea`);
                            });
                        }
                    }]
                })
            }
        </div>;
    }
}

export default StarConfiguration;
