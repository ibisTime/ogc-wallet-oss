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
} from '@redux/parkingSpace/vehicleManagement/vehicleManagement';
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
        ...state.parkingSpaceVehicleManagement,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class VehicleManagement extends React.Component {
    render() {
        const fields = [{
            field: 'name',
            title: '产品名称',
            search: true
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
            field: 'symbolPrice',
            title: '标价币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            search: true
        }, {
            field: 'price',
            title: '购买单价'
        }, {
            title: '收益币种',
            field: 'symbolIncome'
        }, {
            title: '寿命（天）',
            field: 'daysLimit'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'car_product_status',
            search: true
        }, {
            field: 'orderNo',
            title: '显示顺序'
        }, {
            field: 'creatorName',
            title: '创建人'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 200003,
            deleteCode: '200001'
        });
    }
}

export default VehicleManagement;
