const axios = require('axios')
const { config, posts } = require('./common')
const mockList = require('./mockList')

const { apiPrefix } = config
let database = posts

const hostq = '192.168.199.220:8080'
const host = '192.168.199.152:8080'
const enableMock = true

module.exports = {
  [`POST ${apiPrefix}/class/new`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    if (enableMock) {
      res.status(200).json({
        data: mockList.data.slice((page - 1) * pageSize, page * pageSize),
        total: mockList.data.length,
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/class/new`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },
  [`GET ${apiPrefix}/class/query`] (req, res) {
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
      axios.get(`http://${host}${apiPrefix}/class/query`, {
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
  [`POST ${apiPrefix}/class/update`] (req, res) {
    axios.defaults.headers.Cookie = req.headers.cookie
    axios.post(`http://${host}${apiPrefix}/class/update`, req.body)
      .then(function (response) {
        res.json(response.data)
      })
      .catch(function (error) {
        console.error(error)
        res.json({ ret: false })
      })
  },
  [`POST ${apiPrefix}/class/delete`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/class/delete`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`POST ${apiPrefix}/class/apply`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        code: '000000',
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/class/apply`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`POST ${apiPrefix}/class/pass`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        code: '000000',
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/class/pass`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`POST ${apiPrefix}/class/reject`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        code: '000000',
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/class/reject`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`GET ${apiPrefix}/audit/manager/classAudit`] (req, res) {
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
      axios.get(`http://${host}${apiPrefix}/audit/manager/classAudit`, {
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

  [`POST ${apiPrefix}/audit/pass`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        code: '000000',
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/audit/pass`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`POST ${apiPrefix}/audit/reject`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        code: '000000',
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/audit/reject`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`POST ${apiPrefix}/class/graduate`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        code: '000000',
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/class/graduate`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`GET ${apiPrefix}/class/queryGraduate`] (req, res) {
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
      axios.get(`http://${host}${apiPrefix}/class/queryGraduate`, {
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

  [`POST ${apiPrefix}/class/inspection`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        code: '000000',
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/class/inspection`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },
  // 生成台账
  [`POST ${apiPrefix}/ledger/apply`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        code: '000000',
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/ledger/apply`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },

  [`GET ${apiPrefix}/ledger/query`] (req, res) {
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
      axios.get(`http://${host}${apiPrefix}/ledger/query`, {
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

  [`GET ${apiPrefix}/ledger/snapshot`] (req, res) {
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
      axios.get(`http://${host}${apiPrefix}/ledger/snapshot`, {
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

  [`GET ${apiPrefix}/audit/manager/ledgerAudit`] (req, res) {
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
      axios.get(`http://${host}${apiPrefix}/audit/manager/ledgerAudit`, {
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

}
