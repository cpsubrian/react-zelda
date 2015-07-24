const heroSprite = {
  walk: {
    north: [
      { width: 18, height: 26, backgroundPosition: '-524px -130px'}
    ],
    south: [
      { width: 18, height: 26, backgroundPosition: '-170px -126px'}
    ],
    east: [
      { width: 18, height: 26, backgroundPosition: '-856px -126px'}
    ],
    west: [
      { width: 18, height: 26, backgroundPosition: '-856px -126px', transform: 'rotateY(180deg)'}
    ]
  },
  attack: {
    north: [
      { width: 20, height: 36, backgroundPosition: '-554px -303px'}
    ],
    south: [
      { width: 20, height: 33, backgroundPosition: '-162px -309px', bottom: '-14px'}
    ],
    east: [
      { width: 32, height: 23, backgroundPosition: '-890px -319px', right: '-9px'}
    ],
    west: [
      { width: 32, height: 23, backgroundPosition: '-890px -319px', left: '-9px', transform: 'rotateY(180deg)'}
    ]
  }
}

export default heroSprite
