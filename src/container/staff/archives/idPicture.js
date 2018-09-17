import React from 'react';
import axios from 'axios';
import { Button, Select, Spin } from 'antd';
import { getQueryString, getUserId, showSucMsg, showWarnMsg } from 'common/js/util';
import { idPicture3 } from 'api/user';
import Hold from './hold.png';
import IDFRONT from './id-front.png';
import IDBACK from './id-back.png';
import './idPicture.css';

const {Option} = Select;

class IdPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      mediaStreamTrack: '',
      feat: '',
      video1: false,
      video2: false,
      video3: false,
      shot: true,
      pic1: '',
      pic2: '',
      pic3: '',
      deviceId: '',
      devices: [],
      label: '',
      fetching: false
    };
    this.curIdx = 1;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.code = getQueryString('code', this.props.location.search);
    this.ruzhi = getQueryString('ruzhi', this.props.location.search);
    this.idNo = getQueryString('idNo', this.props.location.search);
  }
  componentDidMount() {
    // 获取媒体方法（旧方法）
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMeddia || navigator.msGetUserMedia;
    this.context = this.canvas1.getContext('2d');
    this.mediaStreamTrack = '';
    this.getdeviceId();
  }
  next = () => {
    this.props.history.push(`/staff/jiandang/luru?ruzhi=${this.ruzhi}&code=${this.code}&idNo=${this.idNo}`);
  }
  getdeviceId = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          this.deviceArr = [];
          let tmpArr = devices.filter(device => device.kind === 'videoinput');
          this.setState({
            devices: tmpArr,
            deviceId: tmpArr.length ? tmpArr[0].deviceId : '',
            label: tmpArr.length ? tmpArr[0].label : ''
          });
          if (!tmpArr.length) {
            showWarnMsg('未发现摄像头');
          }
        }).catch(function(err) {
          console.log(err.name + ': ' + err.message);
        });
    }
  }
  // 直接调取高拍仪服务进行拍照
  getPicDirectly = (url, index) => {
    this.mediaStreamTrack && this.mediaStreamTrack.stop();
    this.stream.getTracks().map((item) => {
        item.stop();
      });
    this.setState({ fetching: true });
    axios.post(url).then((rs) => {
      let result = /"pic":"([^"]+)"}\)/.exec(rs.data);
      let currentCanvas = this[`canvas${index}`];
      let context = currentCanvas.getContext('2d');
      let canvas = currentCanvas;
      let img = new Image();
      img.onload = () => {
        currentCanvas.width = img.width;
        currentCanvas.height = img.height;
        context.drawImage(img, 0, 0);
      };
      img.src = result[1];
      this.setState({ [`pic${index}`]: result[1] });
      this.setState({ fetching: false });
    }).catch(() => { showWarnMsg('读取图像失败'); this.setState({ fetching: false }); });
  }
  // 打开摄像头
  openVideo1(deviceId) {
    // 使用新方法打开摄像头
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: { deviceId },
            audio: true
        }).then((stream) => {
            this.stream = stream;
            this.mediaStreamTrack = typeof (stream.stop) === 'function' ? stream : stream.getTracks()[1];
            if (this.video1.srcObject) {
                this.video1.srcObject = stream;
            } else {
                this.video1.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video1.play();
            }, 300);
        }).catch(function(err) {
            console.log(err);
        });
    } else if (navigator.getMedia) { // 使用旧方法打开摄像头
        navigator.getMedia({
            video: true
        }, (stream) => {
            this.stream = stream;
            this.mediaStreamTrack = stream.getTracks()[0];
            if (this.video1.srcObject) {
                this.video1.srcObject = stream;
            } else {
                this.video1.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video1.play();
            }, 300);
        }, function(err) {
            console.log(err);
        });
    }
  }
  openVideo2(deviceId) {
    // 使用新方法打开摄像头
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: { deviceId },
            audio: true
        }).then((stream) => {
            this.stream = stream;
            this.mediaStreamTrack = typeof (stream.stop) === 'function' ? stream : stream.getTracks()[1];
            if (this.video2.srcObject) {
                this.video2.srcObject = stream;
            } else {
                this.video2.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video2.play();
            }, 300);
        }).catch(function(err) {
            console.log(err);
        });
    } else if (navigator.getMedia) { // 使用旧方法打开摄像头
        navigator.getMedia({
            video: true
        }, (stream) => {
            this.stream = stream;
            this.mediaStreamTrack = stream.getTracks()[0];
            if (this.video2.srcObject) {
                this.video2.srcObject = stream;
            } else {
                this.video2.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video2.play();
            }, 300);
        }, function(err) {
            console.log(err);
        });
    }
  }
  openVideo3(deviceId) {
    // 使用新方法打开摄像头
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: { deviceId },
            audio: true
        }).then((stream) => {
            this.stream = stream;
            this.mediaStreamTrack = typeof (stream.stop) === 'function' ? stream : stream.getTracks()[1];
            if (this.video3.srcObject) {
                this.video3.srcObject = stream;
            } else {
                this.video3.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video3.play();
            }, 300);
        }).catch(function(err) {
            console.log(err);
        });
    } else if (navigator.getMedia) { // 使用旧方法打开摄像头
        navigator.getMedia({
            video: true
        }, (stream) => {
            this.stream = stream;
            this.mediaStreamTrack = stream.getTracks()[0];
            if (this.video3.srcObject) {
                this.video3.srcObject = stream;
            } else {
                this.video3.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            setTimeout(() => {
                this.video3.play();
            }, 300);
        }, function(err) {
            console.log(err);
        });
    }
  }
  // 截取图像
  cutImg = (index) => {
    this.setState({
        video1: false,
        video2: false,
        video3: false
    });
    if(this.state.label.toUpperCase().indexOf('E1100') !== -1) {
        this.getPicDirectly('http://127.0.0.1:8080/getmainpic', index);
        return;
      } else if(this.state.label.toUpperCase().indexOf('S520-2') !== -1) {
        this.getPicDirectly('http://127.0.0.1:8080/getauxpic', index);
        return;
      }
    let currentCanvas = this[`canvas${index}`];
    let currentVideo = this[`video${index}`];
    this.context = currentCanvas.getContext('2d');
    if(index === '1' || index === '2') {
      // this.context.drawImage(currentVideo, 0, 0, 1020, 720);
      this.context = currentCanvas.getContext('2d');
      currentCanvas.width = 338 * 3;
      currentCanvas.height = 238 * 3;
      let scaleH = currentVideo.videoHeight / 238;
      let scaleW = currentVideo.videoWidth / 338;
      if (scaleH > scaleW) {
        let sy = (currentVideo.videoHeight - 238 * scaleW) / 2;
        this.context.drawImage(currentVideo, 0, sy, currentVideo.videoWidth, 238 * scaleW, 0, 0, 338 * 3, 238 * 3);
      } else {
        let sx = (currentVideo.videoWidth - scaleH * 338) / 2;
        this.context.drawImage(currentVideo, sx, 0, scaleH * 338, currentVideo.videoHeight, 0, 0, 338 * 3, 238 * 3);
      }
    } else {
      // this.context.drawImage(currentVideo, 0, 0, 1020, 1536);
      this.context = currentCanvas.getContext('2d');
      currentCanvas.width = 340 * 3;
      currentCanvas.height = 512 * 3;
      let scaleH = currentVideo.videoHeight / 512;
      let scaleW = currentVideo.videoWidth / 340;
      if (scaleH > scaleW) {
        let sy = (currentVideo.videoHeight - 512 * scaleW) / 2;
        this.context.drawImage(currentVideo, 0, sy, currentVideo.videoWidth, 512 * scaleW, 0, 0, 340 * 3, 512 * 3);
      } else {
        let sx = (currentVideo.videoWidth - scaleH * 340) / 2;
        this.context.drawImage(currentVideo, sx, 0, scaleH * 340, currentVideo.videoHeight, 0, 0, 340 * 3, 512 * 3);
      }
    }
    this.getBase64(currentCanvas, index);
  }
  getBase64(canvas, index) {
    let base64 = canvas.toDataURL('image/jpeg');
    this.setState({ [`pic${index}`]: base64 });
  }
  handleShotClick = () => {
      let currentVideo = this.state.video1 ? '1' : this.state.video2 ? '2' : '3';
      this.cutImg(currentVideo);
  }
  shot = (index, deviceId) => {
    deviceId = deviceId || this.state.deviceId;
    if(index === 1) {
        this.setState({
            video1: true,
            video2: false,
            video3: false
        });
        this.openVideo1(deviceId);
    } else if(index === 2) {
        this.setState({
            video1: false,
            video2: true,
            video3: false
        });
        this.openVideo2(deviceId);
    } else {
        this.setState({
            video1: false,
            video2: false,
            video3: true
        });
        this.openVideo3(deviceId);
    }
    this.curIdx = index;
  }
  cancel() {
    this.setState({
        vedio: true,
        shot: true
    });
    this.openVideo(this.state.deviceId);
  }
  handleSubmit(e) {
    e.preventDefault();
    var info = {
        pic1: this.state.pic1,
        pic2: this.state.pic2,
        pic3: this.state.pic3,
        updater: getUserId(),
        code: this.code
    };
    this.setState({ fetching: true });
    idPicture3(info).then((res) => {
      this.setState({ fetching: false });
      if(res.isSuccess) {
          showSucMsg('提交成功');
          this.props.history.push(`/staff/jiandang/luru?ruzhi=${this.ruzhi}&code=${this.code}&idNo=${this.idNo}`);
      }
    }).catch(() => { this.setState({ fetching: false }); });
  }
  deviceChange = (deviceId) => {
    let device = this.state.devices.find(v => v.deviceId === deviceId);
    this.setState({deviceId, label: device.label});
    if (deviceId) {
      this.shot(this.curIdx, deviceId);
    }
  }
  render() {
    return (
        <Spin spinning={this.state.fetching}>
            <div className="id-total">
            <div className="id-title"><i></i><span>证件采集</span></div>
            <div style={{textAlign: 'left', marginTop: -30}}>
                <label>摄像头</label>
                <Select style={{
                marginBottom: 20,
                marginLeft: 20,
                width: 300
                }} onChange={this.deviceChange}
                value={this.state.deviceId}>
                {this.state.devices.map(v => <Option value={v.deviceId}>{v.label}</Option>)}
                </Select>
            </div>
            <div className="out">
                <div className="left">
                <div className="top">
                    <div className="id-video-box" style={{ display: this.state.video1 ? 'block' : 'none' }} onClick={ this.handleShotClick }>
                    <div className="border">
                        <span></span><span></span><span></span><span></span>
                    </div>
                    <video ref={video => this.video1 = video} className="id-video"></video>
                    </div>
                    <div className="id-img-box" style={{ display: this.state.video1 ? 'none' : 'block' }} onClick={ () => { this.shot(1); }}>
                    <div className="border">
                        <span></span><span></span><span></span><span></span>
                        <img src={IDFRONT} className="userImg3" id="userImg"/>
                    </div>
                    <div className="tips">
                        <span>身份证正面</span><br/>
                        <span>点击拍摄</span>
                    </div>
                    <canvas ref={canvas => this.canvas1 = canvas} className="inner-item" style={{ width: '340px', height: '240px' }} width="1020" height="720"></canvas>
                    </div>
                </div>
                <div className="bottom">
                    <div className="id-video-box" style={{ display: this.state.video2 ? 'block' : 'none' }} onClick={ this.handleShotClick }>
                    <div className="border">
                        <span></span><span></span><span></span><span></span>
                    </div>
                    <video ref={video => this.video2 = video} className="id-video"></video>
                    </div>
                    <div className="id-img-box" style={{ display: this.state.video2 ? 'none' : 'block' }} onClick={ () => { this.shot(2); }}>
                    <div className="border">
                        <span></span><span></span><span></span><span></span>
                        <img src={IDBACK} className="userImg3" id="userImg"/>
                    </div>
                    <div className="tips">
                        <span>身份证反面</span><br/>
                        <span>点击拍摄</span>
                    </div>
                    <canvas ref={canvas => this.canvas2 = canvas} className="inner-item" style={{ width: '340px', height: '240px' }} width="1020" height="720"></canvas>
                    </div>
                </div>
                </div>
                <div className="right">
                <div className="id-video-box" style={{ display: this.state.video3 ? 'block' : 'none' }} onClick={ this.handleShotClick }>
                    <video ref={video => this.video3 = video} className="id-video"></video>
                </div>
                <div className="id-img-box" style={{ display: this.state.video3 ? 'none' : 'block' }} onClick={ () => { this.shot(3); }}>
                    <div className="border">
                    <span></span><span></span><span></span><span></span>
                    <img src={Hold} className="userImg3" id="userImg"/>
                    </div>
                    <div className="tips">
                    <span>点击拍摄</span><br/>
                    <span>请保持正脸在线框之内</span>
                    </div>
                    <canvas ref={canvas => this.canvas3 = canvas} className="inner-item" style={{ width: '340px', height: '512px' }} width="1020" height="1536"></canvas>
                </div>
                </div>
                <div className="button">
                    <Button type="primary" onClick={ this.handleSubmit }>下一步</Button>
                    <Button onClick={ this.next }>跳过</Button>
                </div>
            </div>
            </div>
        </Spin>
    );
  }
}

export default IdPicture;
