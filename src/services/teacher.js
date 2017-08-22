import { request, config } from 'utils'

const { api } = config
const { teacher } = api

export async function query (params) {
  return request({
    url: `${teacher}/query`,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: `${teacher}/new`,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${teacher}/delete`,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: `${teacher}/update`,
    method: 'post',
    data: params,
  })
}
