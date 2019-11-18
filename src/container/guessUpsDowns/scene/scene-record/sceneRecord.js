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
import {showWarnMsg, dateTimeFormat, moneyFormat, showSucMsg, getQueryString} from 'common/js/util';

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
    code = getQueryString('code', this.props.location.search);
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{loginName.DATA}}-{{mobile.DATA}}',
            search: true,
            searchName: 'keyword',
            noVisible: true
        }, {
            field: 'userName',
            title: '投注用户'
        }, {
            field: 'type',
            title: '投注类型',
            type: 'select',
            key: 'betting_record_type',
            search: true
        }, {
            field: 'direction',
            title: '投注方向',
            type: 'select',
            data: [{
                key: '1',
                value: '涨'
            }, {
                key: '0',
                value: '跌'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'betAmount',
            title: '投注金额'
        }, {
            field: 'betDatetime',
            title: '投注时间',
            type: 'datetime'
        }, {
            field: 'winAmount',
            title: '赚取金额'
        }, {
            field: 'fee',
            title: '手续费'
        }, {
            field: 'feeRate',
            title: '手续费率'
        }];
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 620017,
                        searchParams: {
                            userId: this.code
                        },
                        buttons: [{
                            code: 'goBack',
                            name: '返回',
                            handler: () => {
                                this.props.history.go(-1);
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default SceneRecord;