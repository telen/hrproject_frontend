/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { message } from 'antd'
import { create, remove, update, query } from './../../services/attendanceRecord'
import * as studentService from './../../services/student'
import { pageModel } from './../common'


// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'finger',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/attendance/fingerprint') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      if (!payload.classId) {
        message.warn('请选择班级')
        return
      }
      const data = yield call(studentService.query, {
        classId: payload.classId,
        pageSize: 10000,
      })
      if (data.code === '000000') {
        yield put({
          type: 'showModal',
          payload: { ...payload,
            ...{
              modalType: payload.modalType || 'update',
              list: data.data,
            },
          },
        })
      } else {
        throw data
      }

      // const data = yield call(query, payload)
      //
      // if (data.code === '000000') {
      //   yield put({
      //     type: 'querySuccess',
      //     payload: {
      //       list: data.data || [],
      //       pagination: {
      //         current: Number(payload.page) || 1,
      //         pageSize: Number(payload.pageSize) || 10,
      //         total: data.total,
      //       },
      //     },
      //   })
      // } else {
      //   throw data
      // }
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

    * queryStudent ({ payload }, { select, call, put }) {
      const data = yield call(studentService.query, {
        classId: payload.classId,
        pageSize: 10000,
      })
      if (data.code === '000000') {
        yield put({
          type: 'showModal',
          payload: { ...payload,
            ...{
              modalType: payload.modalType || 'update',
              list: data.data,
            },
          },
        })
      }
    },

  },

  reducers: {

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
