const {resolve} = require('path')
const BinWrapper = require('bin-wrapper')

const baseUrl = 'https://github.com/getsentry/sentry-cli/releases/download'
const version = '0.19.3'
const prefix = `${baseUrl}/${version}/sentry-cli`
let name
if (process.platform === 'darwin') {
  name = 'sentry-cli-Darwin-x86_64'
}
if (process.platform === 'linux' && process.arch === 'x64') {
  name = 'sentry-cli-Linux-x86_64'
}
if (process.platform === 'linux' && process.arch === 'x32') {
  name = 'sentry-cli-Linux-i686'
}
if (process.platform === 'win32') {
  name = 'sentry-cli-Windows-i686.exe'
}

const bin = new BinWrapper()
  .src(`${prefix}-Darwin-x86_64`, 'darwin')
  .src(`${prefix}-Linux-x86_64`, 'linux', 'x64')
  .src(`${prefix}-Linux-i686`, 'linux', 'x32')
  .src(`${prefix}-Windows-i686.exe`, 'win32')
  .dest(resolve(__dirname, './vendor'))
  .use(name)
  .run(['help'], err => {
    if (err) {
      console.error(err)
      throw new Error('Install failed')
    }
  })
