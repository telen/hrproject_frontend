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

export async function apply (params) {
  return request({
    url: `${room}/apply`,
    method: 'post',
    data: params,
  })
}

export async function pass (params) {
  return request({
    url: `${room}/pass`,
    method: 'post',
    data: params,
  })
}

export async function reject (params) {
  return request({
    url: `${room}/reject`,
    method: 'post',
    data: params,
  })
}

export async function updateGraduate (params) {
  return request({
    url: `${room}/graduate`,
    method: 'post',
    data: params,
  })
}

export async function queryGraduate (params) {
  return request({
    url: `${room}/queryGraduate`,
    method: 'get',
    data: params,
  })
}

export async function inspect (params) {
  return request({
    url: `${room}/inspection`,
    method: 'post',
    data: params,
  })
}
