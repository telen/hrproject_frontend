const axios = require('axios')
const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

const hostq = '192.168.199.220:8080'
const host = '192.168.199.152:8080'
const enableMock = true

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      birthday: '@datetime',
      'nationality|1': ['汉', '清', '蒙', '朝鲜'],
      'education|1': ['高中及以下', '大专', '本科', '研究生', '博士', '博士后'],
      'insurance|1': '@boolean',
      'classname|1': ['厨师', '美容美发', '挖掘机', '钣金喷漆'],
      agentName: /机构0\d{1}/,
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
    },
  ],
})


let database = usersListData.data

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
  AGENCT: 'agent',
  OFFICER: 'officer',
}

const userPermission = {
  DEFAULT: {
    visit: ['17081814132521025493','17081814132521025494','17081814132521025495','17081814132521025497','17081814132521025498','17081814132521025499','17081814132521025500','17081814132521025501','17081814132521025502','17081814132521025503','17081814132521025504','17081814132521025505','17081814132521025506','17081814132521025507','17081814132521025508','17081814132521025509','17081814132521025510','17081814132521025511','17081814132521025512',
    '17081814132521025513', '17081814132521025514','17081814132521025515','17081814132521025516','17081814132521025517','17081814132521025518','17081814132521025519','17081814132521025520','17081814132521025521'],
    role: EnumRoleType.DEFAULT,
  },
  AGENCT: {
    visit: ['0', '1', '2', '21', '22', '31', '4', '41', '42', '43', '7', '5', '51', '52', '53', '54', '55',
      '6', '61', '62', '63', '64', '65'],
    role: EnumRoleType.DEFAULT,
  },
  OFFICER: {
    visit: ['0',
      'a1', 'a2', 'a3', 'a4', 'a41', 'a42', 'a43', 'a5'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
}

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 17081815504021040605,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  }, {
    id: 2,
    username: 'xxx',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  }, {
    id: 17081610203221032123,
    username: 'agent',
    password: 'agent',
    permissions: userPermission.AGENCT,
  }, {
    id: 17081610203221032124,
    username: 'officer',
    password: 'officer',
    permissions: userPermission.OFFICER,
  },
]

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`POST ${apiPrefix}/user/login`] (req, res) {

    if (enableMock) {
      const { username, password } = req.body
      const user = adminUsers.filter(item => item.username === username)

      if (user.length > 0 && user[0].password === password) {
        const now = new Date()
        now.setDate(now.getDate() + 1)
        // res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        //   maxAge: 24 * 60 * 60 * 1000,
        //   httpOnly: true,
        // })
        res.cookie('token', user[0].id, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        // res.json({ success: true, message: 'Ok' })
        res.status(200).json({
              "code": "000000",
              "message": "用户登录成功",
              "data": {
              "userId": "17081610203221032122",
              "userName": "Mr.Monkey",
              "role": "admin",
              "authorityList": [
                "17081610203221032567"
                ]
              }
            })
      } else {
        res.status(400).end()
      }
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/user/login`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`GET ${apiPrefix}/user/logout`] (req, res) {
    res.clearCookie('token')
    res.status(200).end()
  },

  [`GET ${apiPrefix}/user/query`] (req, res) {
    if (enableMock) {
      const cookie = req.headers.cookie || ''
      const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
      const response = {}
      const user = {}
      if (!cookies.token) {
        res.status(200).send({ message: 'Not Login' })
        return
      }

      //
      // const token = JSON.parse(cookies.token)
      // if (token) {
      //   response.success = token.deadline > new Date().getTime()
      // }
      response.success = true
      if (response.success) {
        // const userItem = adminUsers.filter(_ => _.id === token.id)
        const userItem = adminUsers.filter(_ => _.id == cookies.token)
        if (userItem.length > 0) {
          // user.authorityList = userItem[0].permissions
          user.userName = userItem[0].username
          user.userId = userItem[0].id
          user.role = userItem[0].permissions.role
          user.roleId = '17081610225621055995'
          user.authorityList = userItem[0].permissions.visit
        }
      }
      response.data = user
      response.code = '000000'
      res.json(response)
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.get(`http://${host}${apiPrefix}/user/query`, {
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

  [`GET ${apiPrefix}/users`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`DELETE ${apiPrefix}/users`] (req, res) {
    const { ids } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`POST ${apiPrefix}/user`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/user/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/user/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/user/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
