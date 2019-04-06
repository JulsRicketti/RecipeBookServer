
const { DefaultMigrator, NodeModuleMigrationProvider } = require('@gradealabs/flock')
const { DataAccessProvider, TemplateProvider } = require('@gradealabs/flock-pg')

const migrationDir = 'migrations'
const migrationTableName = 'migration'
const dap = new DataAccessProvider({ migrationTableName, connectionString: process.env.DATABASE_URL })
const mp = new NodeModuleMigrationProvider(migrationDir)

exports.migrator = new DefaultMigrator(mp, dap)
exports.migrationDir = migrationDir
exports.templateProvider = new TemplateProvider()