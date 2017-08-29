/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update, query, apply } from 'services/room'
import * as studentService from 'services/student'
import { pageModel } from './common'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'room',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    selectedRowKeysOfStudent: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/class/room') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        } else if (location.pathname === '/attendance/record'
        || location.pathname === '/attendance/fingerprint'
        || location.pathname === '/attendance/face') {
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

    * apply ({ payload }, { select, call, put }) {
      const data = yield call(apply, payload)
      if (data.code === '000000') {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      // 关闭 modal 后同时清除选择的学生
      return { ...state, modalVisible: false, selectedRowKeysOfStudent: [] }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
