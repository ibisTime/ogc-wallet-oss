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
} from '@redux/parkingSpace/vehicleManagement/userVehicle';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.parkingSpaceUserVehicle,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class UserVehicle extends React.Component {
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render(v, d) {
                return v && d.user ? `${d.user.nickname}-${d.user.loginName}` : '-';
            }
        }, {
            field: 'source',
            title: '来源',
            data: [{
                key: '0',
                value: '购买'
            }, {
                key: '1',
                value: '组装'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select'
        }, {
            field: 'symbolPrice',
            title: '标价币种'
        }, {
            field: 'symbolIncome',
            title: '收益币种'
        }, {
            field: 'name',
            title: '产品名称'
        }, {
            field: 'pic',
            title: '产品图片',
            type: 'img'
        }, {
            field: 'level',
            title: '车辆等级',
            key: 'car_park_level_limit',
            type: 'select',
            search: true
        }, {
            field: 'status',
            title: '车辆状态',
            key: 'car_status',
            type: 'select'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 200043
        });
    }
}

export default UserVehicle;
