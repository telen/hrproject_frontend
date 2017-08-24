import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from 'routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          // registerModel(app, require('models/dashboard'))
          cb(null, { component: require('routes/welcome/') })
        }, 'welcome')
      },
      childRoutes: [
        {
          path: 'welcome',
          component: require('routes/welcome'),
        },
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/dashboard'))
              cb(null, require('routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/user'))
              cb(null, require('routes/user/'))
            }, 'user')
          },
        }, {
          path: 'user/:id',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/user/detail'))
              cb(null, require('routes/user/detail/'))
            }, 'user-detail')
          },
        }, {
          path: 'student',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/student'))
              registerModel(app, require('models/course'))
              cb(null, require('routes/student/'))
            }, 'student')
          },
        }, {
          path: 'teacher',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/teacher'))
              cb(null, require('routes/teacher/'))
            }, 'student')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/login'))
              cb(null, require('routes/login/'))
            }, 'login')
          },
        }, {
          path: 'request',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/request/'))
            }, 'request')
          },
        }, {
          path: 'class/course',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/course'))
              registerModel(app, require('models/teacher'))
              cb(null, require('routes/clazz/course/'))
            }, 'class-course')
          },
        }, {
          path: 'class/room',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/room'))
              registerModel(app, require('models/course'))
              registerModel(app, require('models/student'))
              cb(null, require('routes/clazz/room/'))
            }, 'class-room')
          },
        }, {
          path: 'class/application',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/application'))
              cb(null, require('routes/clazz/application/'))
            }, 'class-application')
          },
        }, {
          path: 'attendance/record',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/record'))
              registerModel(app, require('models/room'))
              cb(null, require('routes/attendance/record/'))
            }, 'attendance-record')
          },
        }, {
          path: 'attendance/statistic',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/attendance/statistic'))
              cb(null, require('routes/attendance/statistic/'))
            }, 'attendance-statistic')
          },
        }, {
          path: 'graduate/statistic',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/graduate/statistic'))
              cb(null, require('routes/graduate/statistic/'))
            }, 'graduate-statistic')
          },
        }, {
          path: 'agentMgt',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/agentMgt'))
              cb(null, require('routes/agentMgt/'))
            }, 'agentMgt')
          },
        }, {
          path: 'classMgt',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/classMgt'))
              registerModel(app, require('models/agentMgt'))
              cb(null, require('routes/classMgt/'))
            }, 'classMgt')
          },
        }, {
          path: 'attendanceMgt',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/attendanceMgt'))
              cb(null, require('routes/attendanceMgt/'))
            }, 'attendanceMgt')
          },
        }, {
          path: 'inspection/inspectionBefore',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/inspection/before'))
              registerModel(app, require('models/agentMgt'))
              registerModel(app, require('models/course'))
              cb(null, require('routes/inspection/before/'))
            }, 'inspection-before')
          },
        }, {
          path: 'inspection/inspectionInprogress',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/inspection/inprogress'))
              registerModel(app, require('models/agentMgt'))
              registerModel(app, require('models/course'))
              cb(null, require('routes/inspection/inprogress/'))
            }, 'inspection-before')
          },
        }, {
          path: 'inspection/inspectionAfter',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/inspection/after'))
              registerModel(app, require('models/agentMgt'))
              registerModel(app, require('models/course'))
              cb(null, require('routes/inspection/after/'))
            }, 'inspection-before')
          },
        }, {
          path: 'ledgerCheck',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/ledgerCheck'))
              cb(null, require('routes/ledgerCheck/'))
            }, 'ledgerCheck')
          },
        }, {
          path: 'UIElement/iconfont',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/UIElement/iconfont/'))
            }, 'UIElement-iconfont')
          },
        }, {
          path: 'UIElement/search',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/UIElement/search/'))
            }, 'UIElement-search')
          },
        }, {
          path: 'UIElement/dropOption',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/UIElement/dropOption/'))
            }, 'UIElement-dropOption')
          },
        }, {
          path: 'UIElement/layer',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/UIElement/layer/'))
            }, 'UIElement-layer')
          },
        }, {
          path: 'UIElement/dataTable',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/UIElement/dataTable/'))
            }, 'UIElement-dataTable')
          },
        }, {
          path: 'UIElement/editor',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/UIElement/editor/'))
            }, 'UIElement-editor')
          },
        }, {
          path: 'chart/lineChart',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/chart/lineChart/'))
            }, 'chart-lineChart')
          },
        }, {
          path: 'chart/barChart',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/chart/barChart/'))
            }, 'chart-barChart')
          },
        }, {
          path: 'chart/areaChart',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/chart/areaChart/'))
            }, 'chart-areaChart')
          },
        }, {
          path: 'post',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/post'))
              cb(null, require('routes/post/'))
            }, 'post')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
