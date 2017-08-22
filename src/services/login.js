import axios from 'axios'
import qs from 'qs'

import { request, config } from 'utils'

const { api } = config
const { userLogin } = api

export async function login (data) {
  // return request({
  //   url: userLogin,
  //   method: 'post',
  //   data,
  // })

  return axios.post(userLogin, qs.stringify(data))
}
