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
} from '@redux/parkingSpace/parkingRecord/parkingRecord';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.parkingSpaceParkingRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ParkingRecord extends React.Component {
    render() {
        const fields = [{
            field: 'carCode',
            title: '车编号'
        }, {
            field: 'carUserId',
            title: '车主人',
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
                return v && d.carUser ? `${d.carUser.nickname}-${d.carUser.loginName}` : '-';
            }
        }, {
            field: 'carName',
            title: '车名称',
            render(v, d) {
                return d && d.car.name;
            }
        }, {
            field: 'parkCode',
            title: '车位编号'
        }, {
            field: 'parkUserId',
            title: '车位主人',
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
                return v && d.parkUser ? `${d.parkUser.nickname}-${d.parkUser.loginName}` : '-';
            }
        }, {
            field: 'parkOrderNo',
            title: '车位号',
            render(v, d) {
                return d && d.park.orderNo;
            }
        }, {
            title: '停车时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '停车时间起',
            field: 'dateStart',
            type: 'datetime',
            search: true,
            noVisible: true
        }, {
            title: '停车时间止',
            field: 'dateEnd',
            type: 'datetime',
            search: true,
            noVisible: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 200123
        });
    }
}

export default ParkingRecord;
