import { request, config } from 'utils'

const { api } = config
const { attendanceRecord } = api

export async function query (params) {
  return request({
    url: `${attendanceRecord}/query`,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: `${attendanceRecord}/new`,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${attendanceRecord}/delete`,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: `${attendanceRecord}/update`,
    method: 'post',
    data: params,
  })
}
