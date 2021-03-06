const APIV1 = '/api'
const APIV2 = '/api/v2'
// 荆门市劳动就业管理局
// 培训监管平台
module.exports = {
  name: '',
  namesub: '',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/query/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/security/menus`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
    agent: `${APIV1}/agency`,
    teacher: `${APIV1}/teacher`,
    student: `${APIV1}/student`,
    course: `${APIV1}/course`,
    room: `${APIV1}/class`,
    audit: `${APIV1}/audit`,
    attendanceRecord: `${APIV1}/attendance`,
    ledger: `${APIV1}/ledger`,
    account: `${APIV1}/security`,
  },
}
