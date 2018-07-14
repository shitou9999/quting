import RootStackNavigator from '../../router/app'

export {NAV as STATE_KEY} from '../../constants/stateKeys'


export default function reducer(state, action){
  const nextState = RootStackNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};