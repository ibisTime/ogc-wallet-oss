import React from 'react';
import axios from 'axios';
import './jiandang.css';
import { Form, Input, Button } from 'antd';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';
import { jiandang, getUserId } from 'api/user';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import Avatar from './touxiang.png';

const FormItem = Form.Item;

class Jiandang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'realName': '',
            'sex': '',
            'idNation': '',
            'birthday': '',
            'idNo': '',
            'idAddress': '',
            'idStartDate': '',
            'idEndDate': '',
            'idPolice': '',
            'idPic': '',
            'spanText': '',
            'spanTi': ''
        };
        this.openVideo = this.openVideo.bind(this);
        this.getCard = this.getCard.bind(this);
        // this.submitBtn = this.submitBtn.bind(this);
        this.cut = this.cut.bind(this);
        // this.getFeat = this.getFeat.bind(this);
        this.upload = this.upload.bind(this);
        this.inputValueName = this.inputValueName.bind(this);
        this.inputValueSex = this.inputValueSex.bind(this);
        this.inputValueidNation = this.inputValueidNation.bind(this);
        this.inputValuebirthday = this.inputValuebirthday.bind(this);
        this.inputValueidNo = this.inputValueidNo.bind(this);
        this.inputValueidAddress = this.inputValueidAddress.bind(this);
        this.inputValueidStartDate = this.inputValueidStartDate.bind(this);
        this.inputValueidEndDate = this.inputValueidEndDate.bind(this);
        this.inputValueidPolice = this.inputValueidPolice.bind(this);
      }
    componentDidMount() {
    // 获取媒体方法（旧方法）
        navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMeddia || navigator.msGetUserMedia;
        this.canvas = document.getElementById('canvas');
        // this.context = this.canvas.getContext('2d');
        this.video = document.getElementById('video');
        // this.feat = '';
        this.mediaStreamTrack = '';
        this.openVideo();
    };
    // 打开摄像头
    openVideo(argument) {
        // 使用新方法打开摄像头
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then(function(stream) {
                this.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
                if (this.video.srcObject) {
                    this.video.srcObject = stream;
                } else {
                    this.video.src = (window.URL || window.webkitURL).createObjectURL(stream);
                }
                setTimeout(function() {
                    this.video.play();
                }, 100);
            }).catch(function(err) {
                console.log(err);
            });
        } else if (navigator.getMedia) { // 使用旧方法打开摄像头
            navigator.getMedia({
                video: true
            }, function(stream) {
                this.mediaStreamTrack = stream.getTracks()[0];
                if (this.video.srcObject) {
                    this.video.srcObject = stream;
                } else {
                    this.video.src = (window.URL || window.webkitURL).createObjectURL(stream);
                }
                setTimeout(function() {
                    this.video.play();
                }, 100);
            }, function(err) {
                console.log(err);
            });
        }
    };
    // 获取身份证信息
    getCard (e) {
        e.preventDefault();
        document.getElementById('getCard').setAttribute('disabled', true);
        this.setState({ spanText: '读取中...' });
        axios.get('/getIdInfo').then((data) => {
            document.getElementById('getCard').setAttribute('disabled', false);
            this.setState({ spanText: '读取身份证' });
            if (!data) {
                alert('身份证信息读取失败，请把身份证放置准确后再次读取');
                return;
            }
            data = data.data;
            this.setState({
                realName: data.realName,
                sex: data.sex,
                idNation: data.idNation,
                birthday: data.birthday,
                idNo: data.idNo,
                idAddress: data.idAddress,
                idStartDate: data.idStartDate,
                idEndDate: data.idEndDate,
                idPolice: data.idPolice
            });
            let val = /^data:image/.test(data.idPic) ? data.idPic : 'data:image/bmp;base64,' + data.idPic;
            this.setState({
                idPic: val,
                isIdpic: true
            });
            // for (var k in this.state) {
            //     if (k === 'idPic') {
            //         var val = /^data:image/.test(data[k]) ? data[k] : 'data:image/bmp;base64,' + data[k];
            //         document.getElementById('idPicImg').setAttribute('src', val);
            //         document.getElementById('idPicImg').style.display = 'block';
            //         document.getElementById('idPicSlib').style.display = 'none';
            //         document.getElementById('leftInner').className = 'active';
            //         this.idPic = val;
            //     } else {
            //         document.getElementById(k).value(data[k]);
            //     }
            // }
        }).catch(() => {
            document.getElementById('getCard').setAttribute('disabled', false);
            this.setState({ spanText: '读取身份证' });
            alert('身份证信息读取失败，请把身份证放置准确后再次读取');
        });
    };
    // 提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                jiandang(
                    values.birthday,
                    values.idAddress,
                    values.idEndDate,
                    values.idNation,
                    values.idNo,
                    this.state.idPic,
                    values.idPolice,
                    values.idStartDate,
                    values.realName,
                    this.state.sex,
                    getUserId()
                    ).then((res) => {
                        if(res.code) {
                            showSucMsg('建档成功');
                            setTimeout(() => {
                                this.props.history.push(`/staff/jiandang/mianguanRead?code=${res.code}`);
                            }, 300);
                        }else {
                            showWarnMsg('建档失败');
                        }
                    });
            }
        });
        // var params = [
        //     { realName: this.state.realName },
        //     { sex: this.state.sex },
        //     { idNation: this.state.idNation },
        //     { birthday: this.state.birthday },
        //     { idNo: this.state.idNo },
        //     { idAddress: this.state.idAddress },
        //     { idStartDate: this.state.idStartDate },
        //     { idEndDate: this.state.idEndDate },
        //     { idPolice: this.state.idPolice }
        // ];
        // var info = {};
        // for (var i = 0; i < params.length; i++) {
        //     var val = params[i].value;
        //     if (val === 'undefined' || val === '') {
        //         alert(params[i].name + '不能为空');
        //         return;
        //     }
        //     info[params[i].name] = params[i].value;
        // }
        // if (this.state.idPic) {
        //     // info.feat = this.feat;
        //     info.idPic = this.state.idPic;
        //     info.pic1 = this.canvas.toDataURL('image/jpeg');
        //     this.upload(info);
        // } else if (!this.state.idPic) {
        //     alert('请先读取身份证信息');
        // } else {
        //     alert('请进行人脸信息采集');
        // }
    }
    // 截取图像
    cut() {
        document.getElementById('userImg').style.display = 'none';
        document.getElementById('canvas').style.display = 'display';
        this.context.drawImage(this.video, 0, 0, 200, 150);
    };
    // 获取特征值
    // getFeat() {
    //     document.getElementById('getFeat').setAttribute('disabled', true).getElementsByTagName('span').innerHTML = '获取中...';
    //     axios.post('/getfeature', this.canvas.toDataURL('image/jpeg'))
    //         .then(function(rs) {
    //             document.getElementById('getFeat').setAttribute('disabled', false).getElementsByTagName('span').innerHTML = '读取特征值';
    //             var result = /getFaceFeature\({data:([^]+)}\)/.exec(rs);
    //             if (!result || result[1] === 'NOFACE') {
    //                 alert('请对准人脸');
    //                 return;
    //             }
    //             this.feat = result[1];
    //         });
    // };
    // 提交建档数据
    upload(info) {
        info.idKind = 1;
        document.getElementById('submitBtn')[0].setAttribute('disabled', true);
        this.state({
            spanTi: '提交中...'
        });
        axios.post('/api', {
            code: 631410,
            json: JSON.stringify(info)
        }).then(rs => {
            document.getElementById('submitBtn').setAttribute('disabled', false);
            this.state({
                spanTi: '提交'
            });
            if (rs.errorCode === '0') {
                alert('建档成功');
                this.props.history.push(`/staff/J/mianguanRead`);
            } else {
                alert(rs.errorInfo || '建档失败');
            }
        });
    };
    inputValueName() {
        let value = document.getElementById('realName').value;
        this.setState({
            name: value
        });
    };
    inputValueSex() {
        let value = document.getElementById('sex').value;
        this.setState({
            sex: value
        });
    };
    inputValueidNation() {
        let value = document.getElementById('idNation').value;
        this.setState({
            idNation: value
        });
    };
    inputValuebirthday() {
        let value = document.getElementById('birthday').value;
        this.setState({
            birthday: value
        });
    };
    inputValueidNo() {
        let value = document.getElementById('idNo').value;
        this.setState({
            idNo: value
        });
    };
    inputValueidAddress() {
        let value = document.getElementById('idAddress').value;
        this.setState({
            idAddress: value
        });
    };
    inputValueidStartDate() {
        let value = document.getElementById('idStartDate').value;
        this.setState({
            idStartDate: value
        });
    };
    inputValueidEndDate() {
        let value = document.getElementById('idEndDate').value;
        this.setState({
            idEndDate: value
        });
    };
    inputValueidPolice() {
        let value = document.getElementById('idPolice').value;
        this.setState({
            idPolice: value
        });
    };
  render() {
    const { idPic } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="SectionContainer">
        <div className="section">
            <div style={{ display: 'table-cell', verticalAlign: 'middle', width: '100%' }}>
                <div className="comparison-main">
                    <div className="left-wrapper">
                        <div className="left-top">
                            <div className="head-wrap"><i></i>身份证头像</div>
                            <div className="left-cont">
                                <div className={idPic ? 'active' : 'left-inner'} id="leftInner">
                                {
                                idPic
                                    ? <img className="idImg" id="idPicImg" src={idPic} style={{ margin: '0 100px' }}/>
                                    : <div id="idPicSlib">
                                        <div className="img"><img src={Avatar}/></div>
                                        <div>上传身份证</div>
                                      </div>
                                }
                                </div>
                            </div>
                            <button id="getCard" className="ant-btn ant-btn-primary ant-btn-lg" onClick={ this.getCard }><span>{ this.state.spanText || '读取身份证' }</span></button>
                        </div>
                    </div>
                    <div className="right-wrapper">
                        <div className="head-wrap"><i></i>人脸信息采集</div>
                        <div className="right-bottom">
                            <Form className="ant-form ant-form-horizontal" id="formId" onSubmit={this.submitBtn}>
                                <FormItem label="姓名" {...formItemLayout}>
                                    {getFieldDecorator('realName', {
                                        rules: [{
                                            required: true,
                                            message: '必填字段'
                                        }],
                                        initialValue: this.state.realName
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="性别" {...formItemLayout}>
                                    {getFieldDecorator('sex', {
                                        rules: [{
                                            required: true,
                                            message: '必填字段'
                                        }],
                                        initialValue: this.state.sex
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="民族" {...formItemLayout}>
                                    {getFieldDecorator('idNation', {
                                        rules: [{
                                            required: true,
                                            message: '必填字段'
                                        }],
                                        initialValue: this.state.idNation
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="出生日期" {...formItemLayout}>
                                    {getFieldDecorator('birthday', {
                                        rules: [{
                                            required: true,
                                            message: '必填字段'
                                        }],
                                        initialValue: this.state.birthday
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="身份证号码" {...formItemLayout}>
                                    {getFieldDecorator('idNo', {
                                        rules: [{
                                            required: true,
                                            message: '必填字段'
                                        }],
                                        initialValue: this.state.idNo
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="地址" {...formItemLayout}>
                                    {getFieldDecorator('idAddress', {
                                        rules: [{
                                            required: true,
                                            message: '必填字段'
                                        }],
                                        initialValue: this.state.idAddress
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="有效开始日期" {...formItemLayout}>
                                    {getFieldDecorator('idStartDate', {
                                        rules: [{
                                            required: true,
                                            message: '必填字段'
                                        }],
                                        initialValue: this.state.idStartDate
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="有效截止日期" {...formItemLayout}>
                                    {getFieldDecorator('idEndDate', {
                                        rules: [{
                                            required: true,
                                            message: '必填字段'
                                        }],
                                        initialValue: this.state.idEndDate
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="签发机关" {...formItemLayout}>
                                    {getFieldDecorator('idPolice', {
                                        rules: [{
                                            required: true,
                                            message: '必填字段'
                                        }],
                                        initialValue: this.state.idPolice
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem key='btns' {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit} >下一步</Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default Form.create()(Jiandang);