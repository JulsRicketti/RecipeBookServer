const name = 'advisorssrv'
const ENV_PATH = '/home/ubuntu/onboardmd/.env'
const PM2_BIN = '/home/ubuntu/onboardmd/onboardmd-reverseproxy/node_modules/.bin/pm2'

module.exports = {
  deploy: {
    staging: {
      'user': 'ubuntu',
      'host': ['staging.onboardmd.com'],
      'ssh_options': 'StrictHostKeyChecking=no',
      'ref': 'origin/master',
      'repo': `git@github.com:wearedragonfly/onboardmd-${name}.git`,
      'path': `/home/ubuntu/onboardmd/${name}.onboardmd.com`,
      'post-deploy': [
        `npm ci`,
        `(${PM2_BIN} restart ${name} || true)`
      ].join(' && ')
    },
    beta: {
      'user': 'ubuntu',
      'host': ['beta.onboardmd.com'],
      'ssh_options': 'StrictHostKeyChecking=no',
      'ref': 'origin/master',
      'repo': `git@github.com:wearedragonfly/onboardmd-${name}.git`,
      'path': `/home/ubuntu/onboardmd/${name}.onboardmd.com`,
      'post-deploy': [
        `npm ci`,
        `(${PM2_BIN} restart ${name} || true)`
      ].join(' && ')
    },
    production: {
      'user': 'ubuntu',
      'host': ['onboardmd.com'],
      'ssh_options': 'StrictHostKeyChecking=no',
      'ref': 'origin/master',
      'repo': `git@github.com:wearedragonfly/onboardmd-${name}.git`,
      'path': `/home/ubuntu/onboardmd/${name}.onboardmd.com`,
      'post-deploy': [
        `npm ci`,
        `(${PM2_BIN} restart ${name} || true)`
      ].join(' && ')
    }
  }
}
