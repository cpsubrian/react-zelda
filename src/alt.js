import Alt from 'alt'

// Create alt instance.
const alt = new Alt()

// Debug dispatcher.
alt.dispatcher.register((dispatch) => {
  console.log(dispatch.action, dispatch.data)
})

export default alt
