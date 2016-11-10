#!/usr/bin/env node

const {resolve} = require('path')
const {readdirSync} = require('fs')
const {spawn} = require('child_process')

const [bin] = readdirSync(resolve(__dirname, '../vendor'))

const child = spawn(
  resolve(__dirname, `../vendor/${bin}`),
  process.argv.slice(2),
  {
    stdio: 'inherit'
  }
)
child.on('exit', process.exit)
process.on('SIGINT', () => {
  child.kill('SIGINT')
})
process.on('SIGTERM', () => {
  child.kill()
})
