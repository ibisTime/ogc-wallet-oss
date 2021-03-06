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
} from '@redux/otcmanage/comment';
import {listWrapper} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.OtcManageComment,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Comment extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '针对订单号',
            search: true
        }, {
            field: 'starLevel',
            title: '评论星级',
            key: 'comment_star_level',
            search: true,
            type: 'select'
        }, {
            field: 'content',
            title: '内容'
        }, {
            field: 'fromUser',
            title: '评论人',
            render: (v, d) => {
                return d.fromUserInfo ? d.fromUserInfo.nickname : '';
            }
        }, {
            field: 'toUser',
            title: '被评论人',
            render: (v, d) => {
                return d.toUserInfo ? d.toUserInfo.nickname : '';
            }
        }, {
                title: '评论时间',
                field: 'createDatetime',
                type: 'date'
            }];
        return this.props.buildList({
            fields,
            pageCode: 628275
        });
    }
}

export default Comment;
