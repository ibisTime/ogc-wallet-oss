const SET_CUR_SEL_TO_ID = 'SET_CUR_SEL_TO_ID';
const SET_MSG_LIST = 'SET_MSG_LIST';

const initState = {
  curSelToID: '',
  msgList: []
};

export function message(state = initState, action) {
  switch (action.type) {
    case SET_CUR_SEL_TO_ID:
      return {...state, curSelToID: action.payload};
    case SET_MSG_LIST:
      return {...state, msgList: action.payload};
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
