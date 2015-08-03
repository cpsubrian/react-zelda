const overworld = {
  _base: {
    size: [16, 16],
    url: 'images/tiles/overworld.png'
  },
  tiles: {
    'grass': {
      _base: {
        background: '#4B974C'
      },
      decorations: {
        _base: {
          size: [8, 8]
        },
        flower: {
          pos: [287, 48]
        },
        spot: {
          pos: [240, 39]
        }
      },
      edges: {
        _base: {
          bounds: [16, 16]
        },
        water: {
          _base: {
            size: [8, 8]
          },
          s: {
            off: [0, -0],
            size: [16, 8],
            pos: [36, 185]
          },
          n: {
            size: [16, 8],
            pos: [36, 227]
          },
          w: {
            size: [8, 16],
            pos: [62, 202]
          },
          e: {
            off: [-0, 0],
            size: [8, 16],
            pos: [18, 202]
          },
          saw: {
            off: [0, -0],
            pos: [53, 194]
          },
          sae: {
            off: [-0, -0],
            pos: [27, 194]
          },
          naw: {
            pos: [53, 218]
          },
          nae: {
            off: [-0, 0],
            pos: [27, 218]
          },
          nw: {
            pos: [53, 227]
          },
          ne: {
            off: [-0, 0],
            pos: [27, 227]
          },
          sw: {
            off: [0, -0],
            pos: [53, 185]
          },
          se: {
            off: [-0, -0],
            pos: [27, 185]
          }
        }
      }
    },
    'leaves': {
      _base: {
        pos: [253, 57]
      }
    },
    'bush': {
      _base: {
        pos: [304, 57]
      }
    },
    'water': {
      _base: {
        background: '#5A81BE'
      }
    },
    'tree-trunk': {
      _base: {
        background: '#6B976C',
        size: [32, 32],
        pos: [349, 83],
        transform: 'translate(-50%, -50%)'
      }
    },
    'tree': {
      _base: {
        background: '#4B974C',
        size: [64, 82],
        pos: [375, 206],
        transform: 'scale(0.5) translate(-50%, -75%)'
      }
    }
  }
}

export default overworld
