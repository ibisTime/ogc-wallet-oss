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
} from '@redux/biz/comment/check';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.commentCheck,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Check extends React.Component {
    render() {
        const fields = [{
            field: 'content',
            title: '内容'
        }, {
            field: 'nickname',
            title: '评论人',
            render: (v, data) => {
                return data.user.nickname;
            }
        }, {
            field: 'objUser',
            title: '评论对象',
            render: (v, data) => {
                return data.objectUser.nickname;
            }
        }, {
            field: 'commentDatetime',
            title: '评论时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 628275,
            searchParams: {
                status: 'A'
            },
            btnEvent: {
                check: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (items[0].status !== 'A') {
                        showWarnMsg('该记录不是待审核状态');
                    } else {
                        this.props.history.push(`/comment/check/addedit?code=${keys[0]}&v=1&check=1`);
                    }
                }
            }
        });
    }
}

export default Check;
