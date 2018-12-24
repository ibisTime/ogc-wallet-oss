import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import {getUserName, showSucMsg} from 'common/js/util';

class OfflineRechargeCheck extends React.Component {
    render() {
        let {setModalVisible} = this.props;
        const options = {
            fields: [{
                field: 'note',
                title: '审核意见',
                required: true
            }],
            buttons: [{
                title: '通过',
                handler: (param) => {
                    setModalVisible(false, {
                        result: '1',
                        ...param
                    });
                },
                check: true,
                type: 'primary'
            }, {
                title: '不通过',
                handler: (param) => {
                    setModalVisible(false, {
                        result: '0',
                        ...param
                    });
                },
                check: true
            }]
        };
        return (
            <ModalDetail
                title='批量审核'
                visible={this.props.isVisible}
                hideModal={() => this.props.setModalVisible(false)}
                options={options}/>
        );
    }
}

export default OfflineRechargeCheck;
