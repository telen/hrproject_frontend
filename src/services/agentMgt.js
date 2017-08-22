import { request, config } from 'utils'

const { api } = config
const { agent } = api

export async function query (params) {
  return request({
    url: `${agent}/query`,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: `${agent}/new`,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${agent}/delete`,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: `${agent}/update`,
    method: 'post',
    data: params,
  })
}
