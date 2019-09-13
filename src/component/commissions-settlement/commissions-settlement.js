import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import {getUserName, showSucMsg} from 'common/js/util';

class CommissionsSettlement extends React.Component {
    render() {
        let {setModalVisible} = this.props;
        const options = {
            fields: [{
                field: 'note',
                title: '处理说明',
                required: true
            }],
            buttons: [{
                title: '结算',
                handler: (param) => {
                    setModalVisible(false, {
                        result: '1',
                        ...param
                    });
                },
                check: true,
                type: 'primary'
            }, {
                title: '不结算',
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
                title='结算'
                visible={this.props.isVisible}
                hideModal={() => this.props.setModalVisible(false)}
                options={options}/>
        );
    }
}

export default CommissionsSettlement;
