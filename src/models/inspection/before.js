/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update, query, inspect } from './../../services/room'
import * as studentService from './../../services/student'
import { pageModel } from './../common'

// const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'inspectionBefore',

  state: {
    currentItem: {},
    currentStudents: [],
    currentStudent: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/inspection/inspectionBefore') {
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
      const data = yield call(query, { ...payload, ...{ stage: 0 } })
      // 过滤掉未通过审核的班级
      const list = data.data && data.data.filter((item) => {
        return item.status === 2
      })

      if (data.code === '000000') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: list || [],
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
      const data = yield call(remove, payload)
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
      const clazz = payload.currentItem
      const data = yield call(studentService.query, {
        classId: clazz.classId,
        agencyId: clazz.agencyId,
        pageSize: 10000,
      })
      if (data.code === '000000') {
        yield put({
          type: 'showModal',
          payload: { ...payload,
            ...{
              modalType: 'update',
              currentStudents: data.data,
            },
          },
        })
      }
    },

    * inspect ({ payload }, { call, put }) {
      const data = yield call(inspect, payload)
      if (data.code === '000000') {
        yield put({ type: 'hideModal' })
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
      return { ...state, modalVisible: false, currentStudent: {}, currentStudents: [] }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

    showStudent (state, { payload }) {
      return { ...state, ...payload }
    },

  },
})
