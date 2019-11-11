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
} from '@redux/public/giftCard';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.publicGiftCard,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class GiftCard extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '630045',
            searchParams: {
                type: 'card_share_img'
            },
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => { // 置顶
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/configuration/configuration-addedit?code=${selectedRows[0].id}&ctype=${selectedRows[0].ckey}&type=card_share_img`);
                    }
                }
            }
        });
    }
}

export default GiftCard;
