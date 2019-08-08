import React from 'react';
import {Row, Col} from 'antd';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';

import './userPanel.css';

class userPanel extends React.Component {
    render() {
        return(
            <div className="upContainer">
                <Row></Row>
            </div>
        );
    }
}

export default userPanel;
