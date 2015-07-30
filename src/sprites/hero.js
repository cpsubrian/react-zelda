const hero = {
  base: {
    bounds: [16, 16],
    size: [50, 50],
    url: 'images/sprites/link.png'
  },
  poses: {
    walk: {
      base: {
        off: [0, -10]
      },
      north: [
        {pos: [200, 100]}
      ],
      south: [
        {pos: [200, 50]}
      ],
      east: [
        {pos: [200, 150], off: [-2, -10]}
      ],
      west: [
        {pos: [200, 150], off: [-1, -10], flipH: true}
      ]
    },
    attack: {
      base: {off: [0, -10]},
      north: [
        {pos: [100, 550], off: [-13, -23]}
      ],
      south: [
        {pos: [50, 450], off: [-4, -5]}
      ],
      east: [
        {pos: [150, 550]}
      ],
      west: [
        {pos: [150, 550], flipH: true}
      ]
    }
  }
}

export default hero
