
const before = {
  all: [],
  find: [
    (context) => {
      console.log('BEFORE CONTEXT', context)
      return context
    }
  ],
  get: [],
  create: [],
  patch: [],
  update: [],
  remove: []
}

const after = {
  all: [(context) => {
    console.log('AFTER CONTEXT', context)
    return context
  }]
}

module.exports = {
  before,
  after
}
