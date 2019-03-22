const SET_CUR_SEL_TO_ID = 'SET_CUR_SEL_TO_ID';
const SET_MSG_LIST = 'SET_MSG_LIST';
const SET_USER_MAP = 'SET_USER_MAP';

const initState = {
  curSelToID: '',
  msgList: [],
  userMap: {}
};

export function message(state = initState, action) {
  switch (action.type) {
    case SET_CUR_SEL_TO_ID:
      return {...state, curSelToID: action.payload};
    case SET_MSG_LIST:
      return {...state, msgList: action.payload};
    case SET_USER_MAP:
      return {...state, userMap: {...state.userMap, [action.payload.userId]: action.payload.info}};
    default:
      return state;
  }
}

export function setCurSelToID(id) {
  return {type: SET_CUR_SEL_TO_ID, payload: id};
}

export function setMsgList(msgList) {
  return {type: SET_MSG_LIST, payload: msgList};
}

export function addUserMap(userId, info) {
  return {type: SET_USER_MAP, payload: {userId, info}};
}
