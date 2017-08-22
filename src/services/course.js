import { request, config } from 'utils'

const { api } = config
const { course } = api

export async function query (params) {
  return request({
    url: `${course}/query`,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: `${course}/new`,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${course}/delete`,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: `${course}/update`,
    method: 'post',
    data: params,
  })
}
