require('./src').start().catch(e => {
  console.error(e)
  process.exit(1)
})