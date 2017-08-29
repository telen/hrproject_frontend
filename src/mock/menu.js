const { config } = require('./common')
const axios = require('axios')
const mockList = require('./mockList')

const { apiPrefix } = config
const hostq = '192.168.199.220:8080'
const host = '192.168.199.152:8080'
const enableMock = false

let database = [
  {
    id: '17081814132521025493',
    icon: 'laptop',
    name: 'Welcome',
    route: '/welcome',
  },
  // {
  //   id: '1',
  //   icon: 'laptop',
  //   name: 'Dashboard',
  //   route: '/dashboard',
  // },
  {
    id: '2',
    bpid: '17081814132521025493',
    name: 'Users',
    icon: 'user',
    route: '/user',
  },
  {
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: 'User Detail',
    route: '/user/:id',
  },
  {
    id: '17081814132521025494',
    bpid: '17081814132521025493',
    name: '学员信息管理',
    icon: 'team',
    route: '/student',
  },
  {
    id: '17081814132521025495',
    bpid: '17081814132521025493',
    name: '教师信息管理',
    icon: 'user',
    route: '/teacher',
  },
  {
    id: '3',
    bpid: '17081814132521025493',
    name: 'Request',
    icon: 'api',
    route: '/request',
  },
  {
    id: '17081814132521025497',
    bpid: '17081814132521025493',
    name: '开班信息',
    icon: 'solution',
  },
  {
    id: '17081814132521025498',
    bpid: '17081814132521025497',
    mpid: '17081814132521025497',
    name: '培训课程管理',
    route: '/class/course',
  },
  {
    id: '17081814132521025499',
    bpid: '17081814132521025497',
    mpid: '17081814132521025497',
    name: '培训班级管理',
    route: '/class/room',
  },
  {
    id: '17081814132521025500',
    bpid: '17081814132521025497',
    mpid: '17081814132521025497',
    name: '开班申请',
    route: '/class/application',
  },
  // {
  //   id: '4',
  //   bpid: '1',
  //   name: 'UI Element',
  //   icon: 'camera-o',
  // },
  // {
  //   id: '41',
  //   bpid: '4',
  //   mpid: '4',
  //   name: 'IconFont',
  //   icon: 'heart-o',
  //   route: '/UIElement/iconfont',
  // },
  // {
  //   id: '42',
  //   bpid: '4',
  //   mpid: '4',
  //   name: 'DataTable',
  //   icon: 'database',
  //   route: '/UIElement/dataTable',
  // },
  // {
  //   id: '43',
  //   bpid: '4',
  //   mpid: '4',
  //   name: 'DropOption',
  //   icon: 'bars',
  //   route: '/UIElement/dropOption',
  // },
  // {
  //   id: '44',
  //   bpid: '4',
  //   mpid: '4',
  //   name: 'Search',
  //   icon: 'search',
  //   route: '/UIElement/search',
  // },
  // {
  //   id: '45',
  //   bpid: '4',
  //   mpid: '4',
  //   name: 'Editor',
  //   icon: 'edit',
  //   route: '/UIElement/editor',
  // },
  // {
  //   id: '46',
  //   bpid: '4',
  //   mpid: '4',
  //   name: 'layer (Function)',
  //   icon: 'credit-card',
  //   route: '/UIElement/layer',
  // },
  {
    id: '17081814132521025501',
    bpid: '17081814132521025493',
    name: '考勤管理',
    icon: 'calendar',
  },
  {
    id: '17081814132521025502',
    bpid: '17081814132521025501',
    mpid: '17081814132521025501',
    name: '考勤记录查看',
    route: '/attendance/record',
  },
  {
    id: '17081814132521025503',
    bpid: '17081814132521025501',
    mpid: '17081814132521025501',
    name: '考勤记录统计',
    route: '/attendance/statistic',
  },
  {
    id: '17081814132521025504',
    bpid: '17081814132521025501',
    mpid: '17081814132521025501',
    name: '考勤人脸录入',
    route: '/attendance/face',
  },
  {
    id: '17081814132521025505',
    bpid: '17081814132521025501',
    mpid: '17081814132521025501',
    name: '考勤指纹录入',
    route: '/attendance/fingerprint',
  },
  {
    id: '17081814132521025506',
    bpid: '17081814132521025501',
    mpid: '17081814132521025501',
    name: '当日考勤补录',
    route: '/attendance/add',
  },
  // {
  //   id: '5',
  //   bpid: '1',
  //   name: 'Recharts',
  //   icon: 'code-o',
  // },
  // {
  //   id: '51',
  //   bpid: '5',
  //   mpid: '5',
  //   name: 'LineChart',
  //   icon: 'line-chart',
  //   route: '/chart/lineChart',
  // },
  // {
  //   id: '52',
  //   bpid: '5',
  //   mpid: '5',
  //   name: 'BarChart',
  //   icon: 'bar-chart',
  //   route: '/chart/barChart',
  // },
  // {
  //   id: '53',
  //   bpid: '5',
  //   mpid: '5',
  //   name: 'AreaChart',
  //   icon: 'area-chart',
  //   route: '/chart/areaChart',
  // },
  {
    id: '17081814132521025507',
    bpid: '17081814132521025493',
    name: '结业管理',
    icon: 'database',
  },
  {
    id: '17081814132521025508',
    bpid: '17081814132521025507',
    mpid: '17081814132521025507',
    name: '结业方式设置',
    route: '/graduate/method',
  },
  {
    id: '17081814132521025509',
    bpid: '17081814132521025507',
    mpid: '17081814132521025507',
    name: '申领补贴设置',
    route: '/graduate/subsidyApply',
  },
  {
    id: '17081814132521025510',
    bpid: '17081814132521025507',
    mpid: '17081814132521025507',
    name: '结业分查看',
    route: '/graduate/score',
  },
  {
    id: '17081814132521025511',
    bpid: '17081814132521025507',
    mpid: '17081814132521025507',
    name: '结业统计',
    route: '/graduate/statistic',
  },
  {
    id: '17081814132521025512',
    bpid: '17081814132521025507',
    mpid: '17081814132521025507',
    name: '台账生成',
    route: '/graduate/ledger',
  },
  {
    id: '17081814132521025513',
    bpid: '17081814132521025493',
    name: '培训机构管理',
    icon: 'file-text',
    route: '/agentMgt',
  },
  {
    id: '17081814132521025514',
    bpid: '17081814132521025493',
    name: '开班申请管理',
    icon: 'file-text',
    route: '/classMgt',
  },
  {
    id: '17081814132521025515',
    bpid: '17081814132521025493',
    name: '考勤检查',
    icon: 'file-text',
    route: '/attendanceMgt',
  },
  {
    id: '17081814132521025516',
    bpid: '17081814132521025493',
    name: '培训班级检查',
    icon: 'file-text',
  },
  {
    id: '17081814132521025517',
    bpid: '17081814132521025516',
    mpid: '17081814132521025516',
    name: '开班检查',
    route: '/inspection/inspectionBefore',
  },
  {
    id: '17081814132521025518',
    bpid: '17081814132521025516',
    mpid: '17081814132521025516',
    name: '过程检查',
    route: '/inspection/inspectionInprogress',
  },
  {
    id: '17081814132521025519',
    bpid: '17081814132521025516',
    mpid: '17081814132521025516',
    name: '结业检查',
    route: '/inspection/inspectionAfter',
  },
  {
    id: '17081814132521025520',
    bpid: '17081814132521025493',
    name: '台账审核',
    icon: 'file-text',
    route: '/ledgerCheck',
  },
  {
    id: '17081814132521025521',
    bpid: '17081814132521025493',
    name: '账户管理',
    icon: 'file-text',
    route: '/account',
  },
  // {
  //   id: '6',
  //   bpid: '1',
  //   name: 'Test Navigation',
  //   icon: 'setting',
  // },
  // {
  //   id: '61',
  //   bpid: '6',
  //   mpid: '6',
  //   name: 'Test Navigation1',
  //   route: '/navigation/navigation1',
  // },
  // {
  //   id: '62',
  //   bpid: '6',
  //   mpid: '6',
  //   name: 'Test Navigation2',
  //   route: '/navigation/navigation2',
  // },
  // {
  //   id: '621',
  //   bpid: '62',
  //   mpid: '62',
  //   name: 'Test Navigation21',
  //   route: '/navigation/navigation2/navigation1',
  // },
  // {
  //   id: '622',
  //   bpid: '62',
  //   mpid: '62',
  //   name: 'Test Navigation22',
  //   route: '/navigation/navigation2/navigation2',
  // },
  {
    id: '7',
    bpid: '1',
    name: 'Posts',
    icon: 'shopping-cart',
    route: '/post',
  },
]

module.exports = {

  [`GET ${apiPrefix}/security/menus`] (req, res) {
    res.status(200).json({
      code: '000000',
      data: database,
      message: 'ok',
    })
    // axios.defaults.headers.Cookie = req.headers.cookie
    // axios.get(`http://${host}${apiPrefix}/security/menus`, {
    //   params: req.query,
    // })
    //   .then(function (response) {
    //     res.json(response.data)
    //   })
    //   .catch(function (error) {
    //     console.error(error)
    //     res.json({ ret: false })
    //   })
  },

  [`GET ${apiPrefix}/security/accounts`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    if (enableMock) {
      res.status(200).json({
        code: '000000',
        data: mockList.data.slice((page - 1) * pageSize, page * pageSize),
        total: mockList.data.length,
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.get(`http://${host}${apiPrefix}/security/accounts`, {
        params: req.query,
      })
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`POST ${apiPrefix}/security/assign`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    if (enableMock) {
      res.status(200).json({
        code: '000000',
        data: mockList.data.slice((page - 1) * pageSize, page * pageSize),
        total: mockList.data.length,
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/security/assign`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },
}
