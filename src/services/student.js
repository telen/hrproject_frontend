import { request, config } from 'utils'

const { api } = config
const { student } = api

export async function query (params) {
  return request({
    url: `${student}/query`,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: `${student}/new`,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${student}/delete`,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: `${student}/update`,
    method: 'post',
    data: params,
  })
}
