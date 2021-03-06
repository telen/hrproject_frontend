/* global window document CertCtl ID100Control */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update, query } from 'services/student'
import * as usersService from 'services/users'
import { pageModel } from './common'
import { message } from 'antd'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'student',

  state: {
    currentItem: {},
    deviceIdCardInfo: {}, // 读卡器 身份证信息
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/student') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        } else if (location.pathname === '/class/room') {
          dispatch({
            type: 'query',
            payload: {
              pageSize: 10000,
            },
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data.code === '000000') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data || [],
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      if (payload.ids.length === 0) {
        message.warning('请选择记录')
        return
      }
      const data = yield call(remove, payload.ids)
      if (data.code === '000000') {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.code === '000000') {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const data = yield call(update, payload)
      if (data.code === '000000') {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * readIDCard ({ payload }, { select, call, put }) {
      const json = CertCtl.ReadCardEx()
      // console.log('student model,', json, CertCtl)
      alert(json)

      yield put({ type: 'updateState',
        payload: {
          deviceInfo: {
            idNumber: json.cardno,
            studentName: json.name,
            gender: json.sex === '男' ? '0' : '1',
            nationality: json.nation,
            birthday: json.birth,
            registeredResidence: json.address,
            photo: `data:image/jpg;base64,${json.photo}`,
          },
        },
      })
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false, deviceInfo: {} }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
