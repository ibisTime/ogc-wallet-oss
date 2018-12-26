import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Button,
    Table
} from 'antd';
import {
    noop,
    isUndefined,
    dateTimeFormat,
    dateFormat,
    monthFormat,
    moneyFormat,
    tempString,
    showWarnMsg
} from 'common/js/util';
import {
    formItemLayout,
    MONTH_FORMAT,
    PIC_PREFIX
} from 'common/js/config';
import cityData from 'common/js/lib/city';
import fetch from 'common/js/fetch';
import {
    getWorkbook
} from 'common/js/xlsx-util';
import {
    getDictList
} from 'api/dict';
import ModalDetail from 'common/js/build-modal-detail';
class Customer extends React.Component {
    render() {

        return (
            <div>
        <h1>客户管理</h1>
      </div>
        )
    }
}
export default Customer;