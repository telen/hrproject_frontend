import { request, config } from 'utils'

const { api } = config
const { audit } = api

export async function query (params) {
  return request({
    url: `${audit}/manager/classAudit`,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: `${audit}/new`,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${audit}/delete`,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: `${audit}/update`,
    method: 'post',
    data: params,
  })
}

export async function apply (params) {
  return request({
    url: `${audit}/apply`,
    method: 'post',
    data: params,
  })
}

export async function pass (params) {
  return request({
    url: `${audit}/pass`,
    method: 'post',
    data: params,
  })
}

export async function reject (params) {
  return request({
    url: `${audit}/reject`,
    method: 'post',
    data: params,
  })
}

// 机构审核 查询台账
export async function ledgerAudit (params) {
  return request({
    url: `${audit}/manager/ledgerAudit`,
    method: 'get',
    data: params,
  })
}
