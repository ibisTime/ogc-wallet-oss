import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Table } from 'antd';
import { noop, isUndefined, dateTimeFormat, dateFormat, monthFormat,
  moneyFormat, tempString, showWarnMsg } from 'common/js/util';
import { formItemLayout, MONTH_FORMAT, PIC_PREFIX } from 'common/js/config';
import cityData from 'common/js/lib/city';
import fetch from 'common/js/fetch';
import { getWorkbook } from 'common/js/xlsx-util';
import { getDictList } from 'api/dict';
import ModalDetail from 'common/js/build-modal-detail';

const FormItem = Form.Item;
const btnStyl = { marginRight: 20, marginBottom: 16 };

export default class CO2M extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oSelectData: {},
      modalVisible: false
    };
    this.fetchList = [];
    this.first = true;
  }
  componentDidMount() {
    let list = this.fetchList.map(f => {
      if (f.data) {
        return Promise.resolve(f.data);
      } else if (f.key) {
        return getDictList({parentKey: f.key, bizType: f.keyCode});
      } else if (f.listCode) {
        let param = f.params || {};
        return fetch(f.listCode, param);
      }
      return Promise.resolve([]);
    });
    this.getInfos(list);
    this.getOptionsBtn();
  }
  // 获取所有页面所需的数据
  getInfos(list) {
    let oSelectData = {};
    Promise.all(list).then(([...results]) => {
      results.forEach((data, i) => {
        oSelectData[this.fetchList[i].field] = data;
      });
      this.setState({ oSelectData });
    }).catch(() => {});
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.isPropsChange(nextProps) || this.isStateChange(nextState);
  }
  isPropsChange(nextProps) {
    const { field, readonly, hidden, inline, list, selectedRowKeys, options } = this.props;
    let listFlag = this.isListChange(list, nextProps.list);
    let keysFlag = this.isRowKeysChange(selectedRowKeys, nextProps.selectedRowKeys);
    let optFlag = this.isOptChange(options, nextProps.options);
    if (optFlag) {
      this.prevOpts = this.options = {
        ...this.options,
        ...nextProps.options
      };
    }
    return nextProps.field !== field || nextProps.readonly !== readonly ||
      nextProps.hidden !== hidden || listFlag || keysFlag || optFlag ||
      nextProps.inline !== inline;
  }
  // 列表数据是否改变
  isListChange(prevList, nowList) {
    if (prevList.length !== nowList.length) {
      return true;
    }
    const { options } = this.props;
    let key = options.rowKey || 'code';
    for (let i = 0; i < prevList.length; i++) {
      let v = prevList[i];
      for (let j = 0; j < options.fields.length; j++) {
        let f = options.fields[j];
        if (v[f.field] !== nowList[i][f.field]) {
          return true;
        }
      }
    }
    return false;
  }
  isRowKeysChange(prevKeys, nowKeys) {
    if (prevKeys.length !== nowKeys.length) {
      return true;
    }
    let flag = false;
    prevKeys.forEach((k, i) => {
      if (k !== nowKeys[i]) {
        flag = true;
      }
    });
    return flag;
  }
  isOptChange(prevOpts, nowOpts) {
    if (Object.keys(prevOpts).length !== Object.keys(nowOpts).length) {
      return true;
    }
    if (isUndefined(prevOpts) || isUndefined(nowOpts)) {
      return isUndefined(prevOpts) && isUndefined(nowOpts) ? false : prevOpts !== nowOpts;
    } else {
      if (prevOpts.title !== nowOpts.title || nowOpts.view !== prevOpts.view ||
        prevOpts.code !== nowOpts.code || prevOpts.key !== nowOpts.key ||
        prevOpts.rowKey !== nowOpts.rowKey) {
        return true;
      }
      let flag;
      if (isUndefined(prevOpts.useData) || isUndefined(nowOpts.useData)) {
        flag = !(isUndefined(prevOpts.useData) && isUndefined(nowOpts.useData));
      }
      if (flag) {
        return true;
      }
      let key = nowOpts.rowKey || 'code';
      let pKey = prevOpts.useData ? prevOpts.useData[key] : '';
      let nKey = nowOpts.useData ? nowOpts.useData[key] : '';
      if (pKey !== nKey) {
        return true;
      }
      return this.isOptFieldChange(prevOpts, nowOpts);
    }
  }
  isOptFieldChange(prevOpts, nowOpts) {
    let prevFields = prevOpts.fields;
    let fields = nowOpts.fields;
    if (prevFields.length !== fields.length) {
      return true;
    }
    for (let i = 0; i < prevFields.length; i++) {
      if (prevFields[i].title !== fields[i].title || prevFields[i].view !== fields[i].view ||
        prevFields[i].type !== fields[i].type || prevFields[i].key !== fields[i].key ||
        prevFields[i].required !== fields[i].required || prevFields[i].hidden !== fields[i].hidden ||
        prevFields[i].noVisible !== fields[i].noVisible || prevFields[i].readonly !== fields[i].readonly) {
        return true;
      }
    }
    return false;
  }
  isStateChange(nextState) {
    const { oSelectData, options, modalVisible } = this.state;
    let oSFlag = false;
    let bKeys = Object.keys(oSelectData);
    let nKeys = Object.keys(nextState.oSelectData);
    if (nKeys === bKeys) {
      for (let k in oSelectData) {
        if (isUndefined(oSelectData[k]) || isUndefined(nextState.oSelectData[k])) {
          if (!isUndefined(oSelectData[k]) || !isUndefined(nextState.oSelectData[k])) {
            oSFlag = true;
            break;
          }
        } else if (oSelectData[k].length !== nextState.oSelectData[k].length) {
          oSFlag = true;
          break;
        }
      }
    } else {
      oSFlag = true;
    }
    return nextState.modalVisible !== modalVisible || oSFlag;
  }
  // 获取table的props
  getTableProps(rowSelection, columns, options, dataSource) {
    const props = {
      columns,
      dataSource,
      rowSelection,
      bordered: true,
      rowKey: record => record[options.rowKey || 'code']
    };
    if (options.scroll) {
      props.scroll = options.scroll;
    }
    return props;
  }
  // 获取btn的props
  getBtnProps() {
    return {
      type: 'primary',
      style: btnStyl
    };
  }
  // 新增按钮点击
  addBtnClick = () => {
    this.options = {
      ...this.options,
      useData: null,
      view: false,
      code: null
    };
    this.setState({
      modalVisible: true
    });
  }
  // 修改按钮点击
  editBtnClick = () => {
    const { selectedRowKeys: keys, options, list } = this.props;
    if (!keys.length || keys.length > 1) {
      showWarnMsg('请选择一条记录');
      return;
    }
    let key = keys[0];
    let keyName = options.rowKey || 'code';
    let useData = list.filter((v) => v[keyName] === key)[0];
    this.options = {
      ...this.options,
      code: key,
      view: false,
      useData
    };
    setTimeout(() => {
      this.setState({
        modalVisible: true
      });
    }, 20);
  }
  // 删除按钮点击
  deleteBtnClick = () => {
    const { selectedRowKeys: keys, options, list, field, afterDelete } = this.props;
    if (!keys.length || keys.length > 1) {
      showWarnMsg('请选择一条记录');
      return;
    }
    let key = keys[0];
    let keyName = options.rowKey || 'code';
    let deleteItem = list.filter((v) => v[keyName] === key)[0];
    let arr = list.filter((v) => v[keyName] !== key);
    this.props.setO2MData(field, arr);
    this.props.setO2MSelect(field, []);
    afterDelete && afterDelete(key, deleteItem);
  }
  // 详情按钮点击
  detailBtnClick = () => {
    const { selectedRowKeys: keys, options, list, field } = this.props;
    if (!keys.length || keys.length > 1) {
      showWarnMsg('请选择一条记录');
      return;
    }
    let key = keys[0];
    let keyName = options.rowKey || 'code';
    let useData = list.filter((v) => v[keyName] === key)[0];
    this.options = {
      ...this.options,
      code: key,
      view: true,
      useData
    };
    this.setState({
      modalVisible: true
    });
  }
  // 导出按钮点击
  exportBtnClick = () => {
    const { options, list, title } = this.props;
    let titles = [];
    let bodys = [];
    list.forEach((d, i) => {
      let temp = [];
      options.fields.forEach(f => {
        if (i === 0) {
          titles.push(f.title);
        }
        let value = '';
        if (f.render) {
          value = f.render(d[f.field], d);
        } else if (f.amount) {
          value = moneyFormat(d[f.field]);
        } else if (f.type === 'date' || f.type === 'datetime') {
          value = f.type === 'date' ? dateFormat(d[f.field]) : dateTimeFormat(d[f.field]);
        } else {
          value = d[f.field];
        }
        temp.push(value);
      });
      bodys.push(temp);
    });
    let result = [titles].concat(bodys);
    const wb = getWorkbook();
    wb.getSheet(result, 'SheetJS');
    wb.downloadXls(title);
  }
  // 自定义按钮点击
  customBtnClick = () => {
    const { selectedRowKeys: keys, options, list } = this.props;
    if (!keys.length || keys.length > 1) {
      showWarnMsg('请选择一条记录');
      return;
    }
    let key = keys[0];
    let keyName = options.rowKey || 'code';
    let useData = list.filter((v) => v[keyName] === key)[0];
    this.options = {
      ...this.options,
      code: key,
      view: true,
      useData
    };
    this.setState({
      modalVisible: true
    });
  };
  // 获取table的btn和options的btn
  getTableBtn(options, hasSelected) {
    const { readonly } = this.props;
    return (
      <div>
        {options.add && !readonly
          ? <Button {...this.getBtnProps()} onClick={this.addBtnClick}>新增</Button>
          : null}
        {options.edit && !readonly
          ? <Button {...this.getBtnProps()} disabled={!hasSelected} onClick={this.editBtnClick}
            >修改</Button> : null}
        {options.delete && !readonly
          ? <Button {...this.getBtnProps()} disabled={!hasSelected} onClick={this.deleteBtnClick}
            >删除</Button> : null}
        {options.detail
          ? <Button {...this.getBtnProps()} disabled={!hasSelected} onClick={this.detailBtnClick}
            >详情</Button> : null}
        {options.export
          ? <Button {...this.getBtnProps()} onClick={this.exportBtnClick}>导出</Button> : null}
        {options.custom
          ? <Button {...this.getBtnProps()} disabled={!hasSelected} onClick={this.customBtnClick}
            >{options.customName}</Button> : null}
      </div>
    );
  }
  // 获取modal的buttons
  getOptionsBtn() {
    let _this = this;
    const { field, title, list } = this.props;
    let buttons = [{
      title: '确认',
      handler: (params, doFetching, cancelFetching, handleCancel) => {
        const { options, list } = this.props;
        let key = options.rowKey || 'code';
        let arr = list || [];
        let flag = false;
        params[key] && arr.forEach((v, i) => {
          if (v[key] === params[key]) {
            arr[i] = {
              ...arr[i],
              ...params
            };
            flag = true;
          }
        });
        params[key] = isUndefined(params[key]) ? new Date().getTime() : params[key];
        let newList = flag ? arr : [...arr, params];
        _this.props.setO2MData(field, newList);
        handleCancel();
      },
      check: true
    }];
    const { options } = this.props;
    this.options = {
      ...this.options,
      beforeCancel: () => {
        this.options.useData = null;
      },
      buttons
    };
  }
  // 获取表格列
  getTableColumns(options) {
    const columns = [];
    options.fields.forEach(f => {
      let obj = {};
      this.getFields(f, function (rf) {
        if (!f.noVisible) {
          columns.push(rf);
        }
      });
    });
    this.first = false;
    this.columns = columns;
    return columns;
  }
  // 根据类型获取相应的列
  getFields = (f, callback) => {
    let obj = {
      title: f.title,
      dataIndex: f.field
    };
    if (f.type === 'datetime') {
      if (f.render) {
        obj.render = f.render;
      } else {
        obj.render = (v, d) => this.renderDate(v, d, f, dateTimeFormat);
        this.addRender(f, (v, d) => this.renderDate(v, d, f, dateTimeFormat));
      }
    } else if (f.type === 'date') {
      if (f.render) {
        obj.render = f.render;
      } else {
        obj.render = (v, d) => this.renderDate(v, d, f, dateFormat);
        this.addRender(f, (v, d) => this.renderDate(v, d, f, dateFormat));
      }
    } else if (f.type === 'select' || f.type === 'provSelect') {
      if (f.key) {
        f.keyName = f.keyName || 'dkey';
        f.valueName = f.valueName || 'dvalue';
      } else if (f.type === 'provSelect') {
        f.keyName = 'value';
        f.valueName = 'label';
        f.data = cityData.map(c => ({
          value: c.value,
          label: c.label
        }));
      }
      this.first && this.fetchList.push(f);
      if (!f.render) {
        obj.render = (value) => {
          let val = this.renderSelect(value, f);
          return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{val}</span> : val;
        };
      } else {
        obj.render = f.render;
      }
      this.addRender(f, (val) => this.renderSelect(val, f));
    } else if (f.type === 'img') {
      if(f.single) {
        obj.render = (value) => value ? <img style={{maxWidth: 25, maxHeight: 25}} src={PIC_PREFIX + value}/> : '';
      } else {
        obj.render = (value) => {
          if (value) {
            let imgStr = value.split('||');
            return (
              <div>{
                imgStr.map(pic => (
                  <img key={pic} style={{maxWidth: 25, maxHeight: 25, marginRight: 10}} src={PIC_PREFIX + pic}/>
                ))
              }</div>);
          }
          return '';
        };
      }
    }
    if (f.amount) {
      obj.render = (v, d) => <span style={{whiteSpace: 'nowrap'}}>{moneyFormat(v, d)}</span>;
      this.addRender(f, moneyFormat);
    }
    if (!obj.render) {
      if (f.render) {
        obj.render = f.render;
      } else {
        obj.render = (v) => f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{v}</span> : v;
        this.addRender(f, v => v);
      }
    }
    callback && callback(obj);
  }
  // 生成日期的render
  renderDate(v, d, f, format) {
    let val = f.rangedate ? `${format(d[f.rangedate[0]])} ~ ${format(d[f.rangedate[1]])}` : format(v);
    return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{val}</span> : val;
  }
  // 生成select的render
  renderSelect(value, f) {
    let val = '';
    let list = this.state.oSelectData[f.field];
    if (!isUndefined(value) && list && list.length) {
      let item = list.find(v => v[f.keyName] === value);
      val = item
        ? item[f.valueName]
          ? item[f.valueName]
          : tempString(f.valueName, item)
        : '';
    }
    return val;
  }
  // 添加render
  addRender(f, func) {
    if (!f.render) {
      f.render = func;
    }
  }
  // 获取弹出框的属性
  getModalProps() {
    return {
      title: this.options.title || '',
      visible: this.state.modalVisible,
      hideModal: () => this.setState({modalVisible: false}),
      options: this.options
    };
  }
  render() {
    const { label, field, readonly, hidden, title, list, inline,
      options, selectedRowKeys, setO2MSelect } = this.props;
    let layoutProps = inline ? {} : formItemLayout;
    const columns = this.getTableColumns(options);
    const dataSource = list || [];
    let noSelect = options.noSelect;
    // noSelect为true时 列表不可选
    const rowSelection = noSelect ? null : {
      selectedRowKeys,
      onChange: (selectedRowKeys) => setO2MSelect(field, selectedRowKeys)
    };
    const hasSelected = selectedRowKeys.length > 0;
    if (!this.options) {
      this.options = {
        title,
        key: options.key || 'code',
        fields: options.fields,
        code: options.code,
        view: options.view
      };
    }
    return (
      <FormItem key={field} {...layoutProps} className={hidden ? 'hidden' : ''} label={label}>
        {this.getTableBtn(options, hasSelected)}
        <Table {...this.getTableProps(rowSelection, columns, options, dataSource)} />
        <ModalDetail {...this.getModalProps()}/>
      </FormItem>
    );
  }
}

CO2M.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  list: PropTypes.array,
  hidden: PropTypes.bool,
  readonly: PropTypes.bool,
  inline: PropTypes.bool,
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  selectedRowKeys: PropTypes.array.isRequired,
  setO2MSelect: PropTypes.func.isRequired,
  setO2MData: PropTypes.func.isRequired
};

CO2M.defaultProps = {
  label: 'title',
  title: '表格导出',
  field: 'key',
  hidden: false,
  inline: false,
  selectedRowKeys: [],
  setO2MSelect: noop,
  setO2MData: noop
};
