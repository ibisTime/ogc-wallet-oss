import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

export default class TreeComponent extends React.Component {
    state = {
        treeData: []
    };
    shouldComponentUpdate(nextProps) {
        if(nextProps.treeDataProps !== this.props.treeDataProps) {
            this.setState({
                treeData: nextProps.treeDataProps
            });
        }
        return true;
    }
    onDragEnter = info => {
        console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
    };
    onDrop = info => {
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const data = [...this.state.treeData];
        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });
        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        } else if (
          (info.node.props.children || []).length > 0 && // Has children
          info.node.props.expanded && // Is expanded
          dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.unshift(dragObj);
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }
        this.setState({
            treeData: data
        });
    };
    onSelect = (keys) => {
        this.props.treeClickFn(keys, 'onSelect');
    };
    onExpand = (keys) => {
        this.props.treeClickFn(keys, 'onExpand');
    };
    renderTreeNodes = data =>
        data.length > 0 ? data.map(item => {
              if (item.children) {
                  return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                  );
              }
          return <TreeNode key={item.key} {...item} dataRef={item} />;
        }) : null;
    render() {
        const {treeData} = this.state;
        return (
          <Tree
            className="draggable-tree"
            draggable
            blockNode
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
            onSelect={this.onSelect}
            onExpand={this.onExpand}
          >
              {this.renderTreeNodes(treeData)}
          </Tree>
        );
    }
}