require('babel/polyfill')

import React from 'react'
import router from './router'

window.onload = () => {
  // Run the router.
  router.run((Handler) => {
    React.render(<Handler/>, document.getElementById('app'))
  })
}
