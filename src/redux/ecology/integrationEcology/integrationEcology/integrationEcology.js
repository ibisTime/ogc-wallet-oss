import {getPageAccount} from 'api/account';
import {SYS_USER} from 'common/js/config';
import {getQueryString} from 'common/js/util';
const PREFIX = 'ECOLOGY_INTEGRATIONECOLOGY_';
const SET_UNSEETTLEDLOAN = PREFIX + 'SET_UNSEETTLEDLOAN';
const LOADING = PREFIX + 'LOADING';
const CANCEL_LOADING = PREFIX + 'CANCEL_LOADING';

const initState = {
    unsettledLoan: 0,
    fetching: true
};

export function IntegrationEcology(state = initState, action) {
    switch (action.type) {
        case SET_UNSEETTLEDLOAN:
            return {...state, unsettledLoan: action.payload};
        case LOADING:
            return {...state, fetching: true};
        case CANCEL_LOADING:
            return {...state, fetching: false};
        default:
            return state;
    }
}

// 显示loading
function doFetching() {
    return {type: LOADING};
}

// 隐藏loading
function cancelFetching() {
    return {type: CANCEL_LOADING};
}

// 设置平台盈亏账户
function setUnsettledLoan(data) {
    return {type: SET_UNSEETTLEDLOAN, payload: data};
}

// 初始化页面数据
export function initData(currency) {
    return dispatch => {
        dispatch(doFetching());
        getPageAccount({
            currency,
            type: 'P'
        }).then((data) => {
            let param = {};
            data.list.map(d => {
                param[d.userId] = d;
            });
            dispatch(setUnsettledLoan(param));
        });
    };
}