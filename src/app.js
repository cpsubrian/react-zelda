require('babel/polyfill')

import React from 'react/addons'
import router from './router'

window.perf = React.addons.Perf

window.onload = () => {
  // Run the router.
  router.run((Handler) => {
    React.render(<Handler/>, document.getElementById('app'))
  })
}
