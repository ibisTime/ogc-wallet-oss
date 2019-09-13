import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import {getUserName, showSucMsg} from 'common/js/util';

class CustomerEditAmount extends React.Component {
    render() {
        let {setModalVisible, coin} = this.props;
        const options = {
            fields: [{
                field: 'direction',
                title: '调账方向',
                type: 'select',
                data: [{
                    key: '0',
                    value: '红冲'
                }, {
                    key: '1',
                    value: '蓝补'
                }],
                keyName: 'key',
                valueName: 'value',
                required: true
            }, {
                field: 'amount',
                title: '金额',
                coin: coin,
                coinAmount: true,
                required: true
            }],
            buttons: [{
                title: '确定',
                handler: (param) => {
                    setModalVisible(false, {
                        result: '1',
                        ...param
                    });
                },
                check: true,
                type: 'primary'
            }]
        };
        return (
            <ModalDetail
                title='调账'
                visible={this.props.isVisible}
                coin={this.props.coin}
                hideModal={() => this.props.setModalVisible(false)}
                options={options}/>
        );
    }
}

export default CustomerEditAmount;
