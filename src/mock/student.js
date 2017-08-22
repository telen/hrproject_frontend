const axios = require('axios')
const { config, posts } = require('./common')
const mockList = require('./mockList')

const { apiPrefix } = config
let database = posts

const host = '192.168.199.220:8080'
const enableMock = true

module.exports = {
  [`POST ${apiPrefix}/student/new`] (req, res) {
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
      axios.post(`http://${host}${apiPrefix}/student/new`, req.body)
        .then(function (response) {
          res.json(response.data)
        })
        .catch(function (error) {
          console.error(error)
          res.json({ ret: false })
        })
    }
  },
  [`GET ${apiPrefix}/student/query`] (req, res) {
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
      axios.get(`http://${host}${apiPrefix}/student/query`, {
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
  [`POST ${apiPrefix}/student/update`] (req, res) {
    axios.defaults.headers.Cookie = req.headers.cookie
    axios.post(`http://${host}${apiPrefix}/student/update`, req.body)
      .then(function (response) {
        res.json(response.data)
      })
      .catch(function (error) {
        console.error(error)
        res.json({ ret: false })
      })
  },
  [`POST ${apiPrefix}/student/delete`] (req, res) {
    if (enableMock) {
      res.status(200).json({
        success: 'success',
      })
    } else {
      axios.defaults.headers.Cookie = req.headers.cookie
      axios.post(`http://${host}${apiPrefix}/student/delete`, req.body)
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
