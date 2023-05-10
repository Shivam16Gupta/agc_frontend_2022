import LocalStorage from 'common/LocalStorage'
import config from 'myconfig'
import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { validateUser } from 'utils/Utils'
import userDefineRoutes from '../routes'
import PaymentInfo from '../views/StudentSrc/PaymentInfo'
import asyncComponent from './AsyncComponent'
import withRouteLayout from './EnhancedLayout'
import ForgotPassword from './ForgotPassword'
import Scroller from '../components/Scroller/Scroller'

const StudentLogin = asyncComponent(() => import('./StudentLogin'))
const Registeration = asyncComponent(() => import('./Registeration'))
const ReExRegisteration = asyncComponent(() => import('./ReExRegisteration'))
const AdminAsync = asyncComponent(() => import('./Admin'))
const PreviewForm = asyncComponent(() =>
  import('../views/StudentSrc/FormPreview')
)
const PreviewReceipts = asyncComponent(() =>
  import('../views/StudentSrc/PreviewReceipts')
)

const verify = () => {
  if (validateUser()) {
    const user = LocalStorage.getUser()
    const role = user.role
    let routesLink = userDefineRoutes.map((prop, key) => {
      if (role) {
        if (prop.role.includes(role)) {
          return (
            <Route
              exact
              path={prop.layout + prop.path}
              component={withRouteLayout(
                prop.component,
                prop,
                role,
                config,
                userDefineRoutes
              )}
              key={key}
            />
          )
        }
      }
      return null
    })
    return <AdminAsync role={user.role} routesLink={routesLink} />
  } else {
    console.log("login");
    return <Redirect to="/login" />
  }
}

const App = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <Scroller>
          <Switch>
            <Route exact path="/" render={() => verify()} />
            <Route path="/login" component={StudentLogin} />
            <Route path="/register" component={Registeration} />
            <Route path="/re_ex_register" component={ReExRegisteration} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/student" render={() => verify()} />
            <Route path="/paymentinfo" component={PaymentInfo} />
            <Route path="/previewForm" component={PreviewForm} />
            <Route path="/previewReceipts" component={PreviewReceipts} />
          </Switch>
        </Scroller>
      </HashRouter>
    </React.Fragment>
  )
}

export default App
