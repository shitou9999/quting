import RootStackNavigator from '../../router/app'

export {NAV as STATE_KEY} from '../../constants/stateKeys'


export default function reducer(state, action){
  const nextState = RootStackNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


//https://github.com/rocwangv/react-native-redux-navigation/blob/8849b5bcad01a8a02bc2879b7d2193bd088d14eb/src/reducers/index.js
// import Routers from '../routers';
//
// const recentlyVisitedRoutes = new Set();//防止連點，多次navigate，增加此判斷
// const navReducers = (state, action) => {
//     if (action.type === 'Navigation/NAVIGATE') {
//         if (recentlyVisitedRoutes.has(action.routeName)) {
//             return state;
//         }
//         recentlyVisitedRoutes.add(action.routeName);
//         setTimeout(() => {
//             recentlyVisitedRoutes.delete(action.routeName);
//         }, 400);
//     }
//     const newState = Routers.router.getStateForAction(action, state);
//     return newState || state;
// };
//
// export default navReducers;
