import { request, config } from 'utils'

const { api } = config
const { room } = api

export async function query (params) {
  return request({
    url: `${room}/query`,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: `${room}/new`,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${room}/delete`,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: `${room}/update`,
    method: 'post',
    data: params,
  })
}
