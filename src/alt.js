import Alt from 'alt'

// Create alt instance.
const alt = new Alt()

// Debug dispatcher.
if (process.env.NODE_ENV !== 'production') {
  alt.dispatcher.register((dispatch) => {
    if (window.DEBUG) {
      console.log(dispatch.action, dispatch.data)
    }
  })
}

export default alt
