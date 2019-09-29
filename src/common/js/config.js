export const SYSTEM_CODE = 'CL-PRISM';
// 七牛http上传地址
// export const UPLOAD_URL = 'http://up.qiniup.com';
// 七牛https上传地址
export const UPLOAD_URL = sessionStorage.getItem('qiniuUploadDomain') + '/';
// 七牛图片前缀
export const PIC_PREFIX = 'http://' + sessionStorage.getItem('qiniuDomain') + '/';
// 七牛图片https前缀
// export const PIC_PREFIX = 'https://img.adorkableisland.com/';
export const PIC_BASEURL_L = '?imageMogr2/auto-orient';
// 系统userid
export const SYS_USER = 'SYS_USER';

// 系统根菜单编号
export const ROOT_MENU_CODE = 'COINSM201700000000000000';
// // 导航根菜单编号
//  export const ROOT_APP_CODE = 'DH201810120023250000000';

// FMVP 币种
export const CION_FMVP = 'FMVP';

export const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
    }
};
export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};

export const tailFormItemLayout1 = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 19,
            offset: 5
        }
    }
};

// 定义 validateFieldsAndScroll 的滚动行为
export const validateFieldsAndScrollOption = {
    scroll: {
        offsetTop: 110
    }
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const MONTH_FORMAT = 'YYYY-MM';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
