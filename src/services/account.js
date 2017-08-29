import { request, config } from 'utils'

const { api } = config
const { account } = api

export async function query (params) {
  return request({
    url: `${account}/accounts`,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: `${account}/assign`,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${account}/delete`,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: `${account}/update`,
    method: 'post',
    data: params,
  })
}
