import fetch from 'common/js/fetch';
import {setUser, setSystem, getUserId, setRoleInfo, getRoleCode, getUserName, encrypt, decrypt} from 'common/js/util';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const LOAD_DATA = 'LOAD_DATA';
const LOADING = 'LOADING';
const CANCEL_LOADING = 'CANCEL_LOADING';
const LOAD_TX_USER_SIGN = 'LOAD_TX_USER_SIGN';
const SET_SELTOID = 'SET_SELTOID';

const initState = {
    fetching: false,
    redirectTo: '',
    msg: '',
    userId: getUserId() || '',
    loginName: getUserName() || '',
    roleCode: getRoleCode() || '',
    kind: '',
    accountType: '',
    sign: '',
    txAppCode: '',
    curSelToID: ''
};

export function user(state = initState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, msg: ''};
        case LOAD_DATA:
            return {...state, ...action.payload, redirectTo: '/'};
        case LOGOUT:
            return {...initState, redirectTo: '/login'};
        case LOADING:
            return {...state, fetching: true};
        case CANCEL_LOADING:
            return {...state, fetching: false};
        case LOAD_TX_USER_SIGN:
            return {...state, ...action.payload};
        case SET_SELTOID:
            return {...state, curSelToID: action.payload};
        default:
            return state;
    }
}

// 登录成功
function loginSuccess(data) {
    return {type: LOGIN_SUCCESS, payload: data};
}

function doFetching() {
    return {type: LOADING};
}

export function cancelFetching() {
    return {type: CANCEL_LOADING};
}

// 获取用户信息成功
export function loadData(data) {
    setRoleInfo(data);
    return {type: LOAD_DATA, payload: data};
}

export function loadTxUserSign(data) {
    return {type: LOAD_TX_USER_SIGN, payload: data};
}

export function setSelToId(id) {
    return {type: SET_SELTOID, payload: id};
}

// 获取用户信息
export function getUser() {
    return dispatch => {
        dispatch(doFetching());
        _getUser().then(data => {
            dispatch(cancelFetching());
            dispatch(loadData(data));
        }).catch(msg => {
            dispatch(cancelFetching());
        });
    };
}

// 登录
export function login({loginName, loginPwd, type = 'P'}) {
    return dispatch => {
        dispatch(doFetching());
        fetch(630051, {
            loginName,
            loginPwd,
            type
        }).then(data => {
            setUser(data);
            setSystem();
            localStorage.setItem('username', 'admin');
            localStorage.setItem('token_igo', encrypt('888888'));
            dispatch(loginSuccess());
        }).then(() => {
            return _getUser().then(data => {
                dispatch(cancelFetching());
                dispatch(loadData(data));
            });
        }).catch(msg => {
            dispatch(cancelFetching());
        });
    };
}

function _getUser() {
    return fetch(630067, {
        userId: getUserId()
    });
}
