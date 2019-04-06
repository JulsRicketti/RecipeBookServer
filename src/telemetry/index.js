function aspect (fn, aspect) {
  return (...args) => {
    const f = () => fn(...args)
    return aspect(f, ...args)
  }
}

function benchmark (fn, { name = fn.name, log = console.log } = {}) {
  return aspect(fn, f => {
    const start = hrtime()
    const ret = f()
    const label = name ? `Benchmark (${name})` : 'Benchmark'

    if (ret && ret.then) {
      return ret.then(() => {
        const diff = hrtime(start)
        log({ label, seconds: diff[0] })
      })
    } else {
      const diff = hrtime(start)
      log({ label, seconds: diff[0] })
      return ret
    }
  })
}

function hrtime (time) {
  if (typeof process === 'object' && process && typeof process.hrtime === 'function') {
    return process.hrtime(time)
  } else {
    time = time || [ 0 ]
    return [ (Date.now() / 1000) - time[0], 0 ]
  }
}

exports.aspect = aspect
exports.benchmark = benchmark
