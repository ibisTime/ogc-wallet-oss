import React from 'react';
// import PDF from 'react-pdf-js';
import {message, Pagination} from 'antd';

// const ApiPdf = require('./dapp.pdf');

class MyPdfViewer extends React.Component {
    state = {
        page: 1,
        pages: 0,
        isOk: false
    };
    hasLoad = null;
    // onDocumentComplete = (pages) => {
    //     this.setState({
    //         page: 1,
    //         pages
    //     }, this.hasLoad);
    // };
    // paginationChange = (page) => {
    //     this.hasLoad = message.loading('', 0.8);
    //     window.scrollTo(0, 0);
    //     this.setState({
    //         page
    //     });
    // };
    componentDidMount() {
        message.loading('', 2, () => {
            this.setState({
                isOk: true
            });
        });
    }
    render() {
        const {isOk} = this.state;
        return <div>
            <div style={{marginBottom: '10px'}}>
                <a href='/dapp.pdf' download='API文档.pdf'>API文档下载</a>
            </div>
            <div style={{marginLeft: '150px', display: isOk ? 'block' : 'none'}}>
                <iframe src="/dapp.pdf" frameBorder="0" width='800px' height='800px'/>
            </div>
        </div>;
    }
}

export default MyPdfViewer;

/*
<div style={{
                display: 'flex',
                alignItems: 'flex-end'
            }}>
                <div style={{marginLeft: '20px'}}>
                    <PDF
                        file={ApiPdf}
                        onDocumentComplete={this.onDocumentComplete}
                        page={page}
                    />
                </div>
                <div style={{
                    marginLeft: '50px',
                    marginBottom: '100px'
                }}>
                    {
                        pages > 0 ? <Pagination
                            hideOnSinglePage={true}
                            pageSize={1}
                            current={page}
                            total={pages}
                            onChange={this.paginationChange}
                        /> : null
                    }
                </div>
            </div>
* */