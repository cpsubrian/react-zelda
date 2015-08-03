import React from 'react'
import _ from 'lodash'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
import spriteUtils from '../lib/sprite'
import sprites from '../sprites'
import Sprite from './Sprite'

@pureRender
class Tile extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    sprite: React.PropTypes.string.isRequired,
    path: ImmutablePropTypes.list.isRequired,
    style: ImmutablePropTypes.map,
    decorations: ImmutablePropTypes.list,
    edges: ImmutablePropTypes.map
  }

  renderEdges () {
    let sprite = sprites[this.props.sprite]
    return (this.props.edges ? (
      _.map(this.props.edges.toJS(), (edges, type) => {
        return (
          <div key={`edges-${type}`} className={`edges edges-${type}`}>
            {edges.map((side) => {
              let props = spriteUtils.getProps.apply(null, [sprite, ...this.props.path.toArray(), 'edges', type, side])
              return <Sprite key={`edge-${type}-${side}`} {...props}/>
            })}
          </div>
        )
      })
    ) : null)
  }

  renderDecorations () {
    return (this.props.decorations ? (
      <div className='decorations'>
        {this.props.decorations.toJS().map((decoration, i) => {
          let sprite = sprites[decoration.sprite]
          let props = spriteUtils.getProps.apply(null, [sprite, ...decoration.path])
          if (decoration.style) {
            props.style = Object.assign({}, props.style, decoration.style)
          }
          return (
            <Sprite key={`decoration-${i}`} {...props}/>
          )
        })}
      </div>
    ) : null)
  }

  render () {
    let className = 'tile ' + (this.props.className || '')
    let style = this.props.style ? this.props.style.toJS() : {}
    let sprite = sprites[this.props.sprite]
    let props = spriteUtils.getProps.apply(null, [sprite, ...this.props.path.toArray()])
    return (
      <div className={className} style={style}>
        <Sprite {...props}/>
        {this.renderEdges()}
        {this.renderDecorations()}
      </div>
    )
  }
}

export default Tile
