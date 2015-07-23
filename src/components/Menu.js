import React from 'react'
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

class Menu extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    children: React.PropTypes.node
  }

  render () {
    return (
      <CSSTransitionGroup transitionName='menu' transitionAppear={true}>
        <div className='menu'>
          <h2>{this.props.title}</h2>
          {this.props.children}
        </div>
      </CSSTransitionGroup>
    )
  }
}

export default Menu
