import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import config from 'myconfig'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    config.ENV === 'MAIN'
      ? applyMiddleware(thunk)
      : applyMiddleware(logger, thunk)
  )
)

export default store
