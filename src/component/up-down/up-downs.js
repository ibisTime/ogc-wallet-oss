import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';

class UpDowns extends React.Component {
    render() {
        let {codeList, key = 'codeList', hideLoc, locKey, biz, onOk} = this.props;
        let locationField = {
            field: 'result',
            title: '是否通过',
            type: 'select',
            hidden: hideLoc,
            required: true
        };
        if (locKey) {
            locationField.key = locKey;
        } else {
            locationField.data = [{
                key: '0',
                value: '不通过'
            }, {
                key: '1',
                value: '通过'
            }];
            locationField.keyName = 'key';
            locationField.valueName = 'value';
        }
        const options = {
            fields: [{
                field: 'status',
                title: '审核说明',
                value: 1,
                required: true,
                hidden: true
            }, {
                field: key,
                value: codeList,
                hidden: true
            }, locationField, {
                field: 'approveNote',
                title: '审核说明',
                required: true,
                maxlength: 30
            }],
        // {
        //     field: 'approveUser',
        //         title: '审核人',
        //     required: true,
        //     maxlength: 30
        // }
            beforeSubmit: (params) => {
                params.approveUser = params.updater;
                // params.updater = this.approveUser;
                return params;
            },
            addCode: biz
        };
        if (onOk) {
            options.onOk = () => onOk();
        }
        return (
            <ModalDetail
                title='审核'
                visible={this.props.updownVisible}
                hideModal={() => this.props.setModalVisible(false)}
                options={options}/>
        );
    }
}

export default UpDowns;
