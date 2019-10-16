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
} from '@redux/guessUpsDowns/scenePreview';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, showSucMsg, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.GuessUpsDownsScenePreview,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ScenePreview extends React.Component {
    code = getQueryString('code', this.props.location.search);
    render() {
        const fields = [{
            field: 'name',
            title: '名称'
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'period',
            title: '期数'
        }, {
            field: 'bettingStartTime',
            title: '投注开始时间',
            type: 'datetime'
        }, {
            field: 'closeStartTime',
            title: '封闭开始时间',
            type: 'datetime'
        }, {
            field: 'openTime',
            title: '开奖时间',
            type: 'datetime'
        }];
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 620010,
                        searchParams: {
                            'code': this.code
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

export default ScenePreview;