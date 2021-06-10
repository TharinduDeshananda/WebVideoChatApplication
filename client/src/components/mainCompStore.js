let redux = require('redux');

let initState = { myPeerId: null, userPeerIds: [] };
function peerReducer(state = initState, action) {
  switch (action.type) {
    case "MY_PEER_ID":
      return { ...state, myPeerId: action.payload };
    case "ADD_USER_PEER_ID":
      return { ...state, userPeerIds: state.userPeerIds.push(action.payload) };
    case "REMOVE_USER_PEER_ID":
      return { ...state, userPeerIds: state.userPeerIds };
    default:
      return state;
  }
}

module.exports.store = redux.createStore(peerReducer);
