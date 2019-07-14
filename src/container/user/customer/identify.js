import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/user/customer/identify';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import { PIC_PREFIX } from 'common/js/config';
import fetch from 'common/js/fetch';
import {Modal} from 'antd';

@listWrapper(
  state => ({
      ...state.userCustomerIdentify,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class CustomerIdentify extends React.Component {
    state = {
        ...this.state,
        visible: false,
        title: '',
        picList: []
    };
    handleOk = e => {
        this.setState({
            visible: false
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false
        });
    };
    render() {
        const fields = [{
            field: 'userId',
            title: '手机号',
            render: (v, d) => d && d.user ? d.user.mobile : '',
            type: 'select',
            pageCode: 805120,
            keyName: 'userId',
            valueName: 'mobile',
            searchName: 'mobile',
            search: true
        }, {
            field: 'realName',
            title: '姓名'
        }, {
            field: 'idNo',
            title: '身份证号'
        }, {
            field: 'frontImage',
            title: '身份证照片',
            render: (v, d) => (
              <div style={{textAlign: 'center', margin: '0px'}} onClick={(e) => {
                  e.stopPropagation();
                  this.setState({
                      title: `${d.realName}(${d.idNo})`,
                      visible: true,
                      picList: [{
                          pic: PIC_PREFIX + v
                      }, {
                          pic: PIC_PREFIX + d.backImage
                      }, {
                          pic: PIC_PREFIX + d.faceImage
                      }]
                  });
              }}>
                  <img src={PIC_PREFIX + v} alt="" style={{width: '10%'}}/>
                  <img src={PIC_PREFIX + d.backImage} alt="" style={{width: '10%', margin: '0 20px'}}/>
                  <img src={PIC_PREFIX + d.faceImage} alt="" style={{width: '10%'}}/>
              </div>
            )
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                dkey: '2',
                dvalue: '待人工认证'
            }, {
                dkey: '3',
                dvalue: '通过'
            }, {
                dkey: '4',
                dvalue: '失败'
            }],
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            field: 'createDatetime',
            title: '申请时间',
            type: 'datetime'
        }];
        const {title, visible, picList} = this.state;
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      pageCode: '805203',
                      singleSelect: false,
                      searchParams: {
                          statusList: ['2']
                      },
                      btnEvent: {
                          // 审核
                          check: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else if (selectedRows[0].status !== '0' && selectedRows[0].status !== '2') {
                                  showWarnMsg('该记录不是待人工认证节点');
                              } else {
                                  this.props.history.push(`/user/identify/addedit?code=${selectedRowKeys[0]}&check=1&v=1`);
                              }
                          },
                          batchCheck: (selectedRowKeys) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else {
                                  Modal.confirm({
                                      title: '批量审核',
                                      okText: '通过',
                                      cancelText: '不通过',
                                      onOk: () => {
                                          this.props.doFetching();
                                          fetch(805207, {
                                              codeList: selectedRowKeys,
                                              verifyFlag: 1
                                          }).then(() => {
                                              this.props.cancelFetching();
                                              showSucMsg('操作成功');
                                              this.props.getPageData();
                                          }).catch(this.props.cancelFetching);
                                      },
                                      onCancel: () => {
                                          this.props.doFetching();
                                          fetch(805207, {
                                              codeList: selectedRowKeys,
                                              verifyFlag: 0
                                          }).then(() => {
                                              this.props.cancelFetching();
                                              showSucMsg('操作成功');
                                              this.props.getPageData();
                                          }).catch(this.props.cancelFetching);
                                      }
                                  });
                                  setTimeout(() => {
                                      let spHtml = document.createElement('span');
                                      let modalContent = document.querySelector('.ant-modal-content');
                                      if(modalContent) {
                                          spHtml.innerText = '×';
                                          spHtml.style.display = 'block';
                                          spHtml.style.fontSize = '24px';
                                          spHtml.style.padding = '14px';
                                          spHtml.classList.add('ant-modal-close');
                                          modalContent.appendChild(spHtml);
                                          spHtml.addEventListener('click', function() {
                                              let mask = document.querySelector('.ant-modal-mask');
                                              let warp = document.querySelector('.ant-modal-wrap');
                                              mask.parentNode.removeChild(mask);
                                              warp.parentNode.removeChild(warp);
                                          });
                                      }
                                  }, 500);
                              }
                          }
                      }
                  })
              }
              <Modal
                title={title}
                width={1300}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
              >
                  <div>
                      {
                          picList.map(item => (
                            <img src={item.pic} alt="" style={{width: '30%', marginRight: '20px'}}/>
                          ))
                      }
                  </div>
              </Modal>
          </div>
        );
    }
}

export default CustomerIdentify;
