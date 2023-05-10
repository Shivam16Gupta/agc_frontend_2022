import LocalStorage from 'common/LocalStorage'
import React from 'react'
import { Redirect } from 'react-router-dom'

function withLoggedIn(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      const user = LocalStorage.getUser()
      if (user) {
        return <WrappedComponent user={user} role={user.role} />
      } else {
        return <Redirect to="/login" />
      }
    }
  }
}

export default withLoggedIn
