import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/TOKEN-finance/platformDivideNext/platformDivideNext';
import {showSucMsg, dateFormat} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.TOKENFinancePlatformDivideNext,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class PlatformDivideNext extends React.Component {
    render() {
        const fields = [{
            field: 'id',
            hidden: true
        }, {
            title: '内容',
            field: 'cvalue',
            type: 'datetime',
            render: (v, data) => {
              return dateFormat(v, 'yyyy-MM-dd hh:00');
            },
            required: true
        }, {
            field: 'remark',
            hidden: true,
            value: '下次分红日设置'
        }];
        return this.props.buildDetail({
            fields,
            key: 'ckey',
            code: 'reg_protocol',
            detailCode: 630047,
            editCode: 630042,
            buttons: [{
                title: '保存',
                check: true,
                handler: (params) => {
                    this.props.doFetching();
                    fetch(630042, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }]
        });
    }
}

export default PlatformDivideNext;
