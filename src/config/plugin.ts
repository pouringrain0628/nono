import { EggPlugin } from 'midway'
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  static: true, // default is true
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
} as EggPlugin
