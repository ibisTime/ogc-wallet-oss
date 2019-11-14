import React from 'react';
import {
    Spin, Button
} from 'antd';
import {Link} from 'react-router-dom';
import {
    getQueryString,
    dateTimeFormat
} from 'common/js/util';
import {getRoleList} from 'api/company';
import fetch from 'common/js/fetch';
import './myNotice.css';

class myNoticeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            noticeData: null
        };
        this.code = getQueryString('code', this.props.location.search);
    }
    componentDidMount() {
        this.setState({fetching: true});
        fetch(805307, {code: this.code}).then((data) => {
            this.setState({noticeData: data, fetching: false});
        }).catch(this.setState({fetching: false}));
    }
    render() {
        const {noticeData, fetching} = this.state;
        return (
            <Spin spinning={fetching}>
                <div className="detail-wrap">
                    <div className="title">{noticeData ? noticeData.title : ''}</div>
                    <div className="datetime">{noticeData
                        ? dateTimeFormat(noticeData.updateDatetime
                            ? noticeData.updateDatetime
                            : noticeData.createDatetime)
                        : ''}</div>
                    <div className="content" dangerouslySetInnerHTML={{ __html: noticeData ? noticeData.content : '' }}/>
                    <div className="button">
                        <Button onClick={() => {
                            this.props.history.go(-1);
                        }}>返回</Button>
                    </div>
                </div>
            </Spin>
        );
    }
}

export default myNoticeDetail;
