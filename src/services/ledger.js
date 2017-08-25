import { request, config } from 'utils'

const { api } = config
const { ledger } = api

export async function query (params) {
  return request({
    url: `${ledger}/query`,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: `${ledger}/new`,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: `${ledger}/delete`,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: `${ledger}/update`,
    method: 'post',
    data: params,
  })
}

export async function apply (params) {
  return request({
    url: `${ledger}/apply`,
    method: 'post',
    data: params,
  })
}

export async function queryGraduate (params) {
  return request({
    url: `${ledger}/snapshot`,
    method: 'get',
    data: params,
  })
}
