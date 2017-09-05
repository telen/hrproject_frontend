/* global window */
import modelExtend from 'dva-model-extend'
import { config, initUsbKey, validateUsbKey } from 'utils'
import { create, remove, update, query } from 'services/account'
import * as usersService from 'services/users'
import { pageModel } from './common'
import { message } from 'antd'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'account',

  state: {
    roleMap: {
      '17081610225621055995': '超级管理员',
      '17081610225621055996': '人社局管理员',
      '17081610225621055997': '培训机构管理员',
    },
    currentUser: {},
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/account') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { select, call, put }) {
      const user = yield select(({ app }) => app.user)
      const data = yield call(query, payload)
      if (data.code === '000000') {
        yield put({
          type: 'accountSuccess',
          payload: {
            currentUser: user,
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
      const { selectedRowKeys } = yield select(_ => _.agentMgt)
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
      // TODO usbkey init
      // initUsbKey(payload)
      if (data.code === '000000') {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      // const id = yield select(({ user }) => user.currentItem.id)
      // const newUser = { ...payload, id }
      const data = yield call(update, payload)

      if (data.code === '000000') {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {

    accountSuccess (state, { payload }) {
      const { list, pagination, currentUser } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        currentUser,
      }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
