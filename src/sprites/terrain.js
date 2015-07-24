const terrainSprite = {
  base: {
    width: 16,
    height: 16,
    background: 'url(images/tiles/overworld.png) no-repeat'
  },
  tiles: {
    'grass': {
      base: {
        background: '#4B974C'
      },
      decorations: {
        flower: {
          width: 8,
          height: 8,
          backgroundPosition: '-287px -48px'
        },
        spot: {
          width: 8,
          height: 8,
          backgroundPosition: '-240px -39px'
        }
      }
    },
    'leaves': {
      base: {
        backgroundPosition: '-253px  -57px'
      }
    },
    'bush': {
      base: {
        backgroundPosition: '-304px  -57px'
      }
    },
    'water': {
      base: {
        background: '#5A81BE'
      },
      overlays: {
        'below': {
          bottom: 0,
          height: 8,
          backgroundPosition: '-36px -185px'
        },
        'above': {
          top: 0,
          height: 8,
          backgroundPosition: '-36px -227px'
        },
        'left': {
          left: 0,
          width: 8,
          backgroundPosition: '-62px -202px'
        },
        'right': {
          right: 0,
          width: 8,
          backgroundPosition: '-18px -202px'
        },
        'below-left': {
          height: 8,
          width: 8,
          bottom: 0,
          left: 0,
          backgroundPosition: '-53px -194px'
        },
        'below-right': {
          height: 8,
          width: 8,
          bottom: 0,
          right: 0,
          backgroundPosition: '-27px -194px'
        },
        'above-left': {
          height: 8,
          width: 8,
          top: 0,
          left: 0,
          backgroundPosition: '-53px -218px'
        },
        'above-right': {
          height: 8,
          width: 8,
          top: 0,
          right: 0,
          backgroundPosition: '-27px -218px'
        },
        'diag-top-left': {
          height: 8,
          width: 8,
          top: 0,
          left: 0,
          backgroundPosition: '-53px -227px'
        },
        'diag-top-right': {
          height: 8,
          width: 8,
          top: 0,
          right: 0,
          backgroundPosition: '-27px -227px'
        },
        'diag-bottom-left': {
          height: 8,
          width: 8,
          bottom: 0,
          left: 0,
          backgroundPosition: '-53px -185px'
        },
        'diag-bottom-right': {
          height: 8,
          width: 8,
          bottom: 0,
          right: 0,
          backgroundPosition: '-27px -185px'
        }
      }
    },
    'tree-trunk': {
      base: {
        background: '#6B976C'
      },
      overlays: {
        'below-right': {
          width: 32,
          height: 32,
          backgroundPosition: '-349px -83px'
        }
      }
    }
  }
}

export default terrainSprite
