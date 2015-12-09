'use strict'

const repl = require('repl')
const Trailpack = require('trailpack')
const lib = require('./lib')

/**
 * @class REPL
 */
module.exports = class REPL extends Trailpack {

  configure () {
    lib.Inspect.configureApp(this.app)
    lib.Inspect.configureApi(this.app.api)
    lib.Inspect.configurePacks(this.app.packs)
  }

  /**
   * Initialize the REPL server
   */
  initialize () {
    this.server = repl.start({
      // green prompt
      prompt: '\u001b[1;32mtrails > \u001b[0m',
      useColors: true
    })

    this.server.on('exit', err => {
      this.app.stop(err)
    })

    this.server.context.app = this.app
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      pkg: require('./package')
    })
  }
}

