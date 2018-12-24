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
} from '@redux/biz/comment/keywords';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.commentKeywords,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class List extends React.Component {
    render() {
        const fields = [{
            field: 'content',
            title: '内容'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'comment_status',
            search: true
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
            pageCode: 628275
        });
    }
}

export default List;
