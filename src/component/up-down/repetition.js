import React from 'react';
import { getQueryString, showSucMsg, getUserName } from 'common/js/util';
import ModalDetail from 'common/js/build-modal-detail';

class UpDown extends React.Component {
    render() {
        let { code, key = 'code', biz, onOk, approveNote } = this.props;
        console.log(approveNote);
        let locationField = {
            title: '严重等级',
            required: true,
            type: 'select',
            data: [{
            key: '1',
            value: '严重'
        }, {
            key: '2',
            value: '一般'
        }, {
            key: '3',
            value: '优化'
        }],
            keyName: 'key',
            valueName: 'value',
            field: 'level'
        };
        const options = {
            fields: [{
                field: key,
                value: code,
                hidden: true
            }, locationField, {
                field: 'repairVersionCode',
                title: '修复版本号',
                required: true,
                maxlength: 30
            }],
            addCode: 805101,
            beforeSubmit: (data) => {
                    data.code = data.code;
                    data.approveResult = 1;
                    data.approveUser = getUserName();
                    data.approveNote = approveNote;
                return data;
            }
        };
        if (onOk) {
            options.onOk = () => onOk();
        }
        return (
            <ModalDetail
                title='复现'
                visible={this.props.updownVisible}
                hideModal={() => this.props.setModalVisible(false)}
                options={options} />
        );
    }
}

export default UpDown;
