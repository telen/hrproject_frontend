import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Room = ({ location, dispatch, room, loading, course, student }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, selectedRowKeysOfStudent } = room
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    course,
    loading: loading.effects['room/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'room/delete',
        payload: id,
      })
    },
    onEditItem (item, editable) {
      dispatch({
        type: 'room/showModal',
        payload: {
          modalType: editable ? 'update' : 'view',
          currentItem: item,
          selectedRowKeysOfStudent: item.studentIds,
        },
      })
    },
    onApplyItem (classId) {
      dispatch({
        type: 'room/apply',
        payload: {
          classId: classId,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'room/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
    course,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/class/room',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/class/room',
      }))
    },
    onAdd () {
      dispatch({
        type: 'room/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'room/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'user/switchIsMotion' })
    },
  }

  const modalProps = {
    modalType,
    item: modalType === 'create' ? {} : currentItem,
    width: 1000,
    course,
    student,
    visible: modalVisible,
    maskClosable: false,
    selectedRowKeysOfStudent,
    confirmLoading: loading.effects['room/update'],
    title: `${modalType === 'create' ? '添加班级' : '编辑'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `room/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'room/hideModal',
      })
    },
    onCourseChange (courseId) {
      dispatch({
        type: 'student/query',
        payload: {
          courseId,
        },
      })
    },
    rowSelection: {
      selectedRowKeys: selectedRowKeysOfStudent,
      onChange: (keys) => {
        dispatch({
          type: 'room/updateState',
          payload: {
            selectedRowKeysOfStudent: keys,
          },
        })
      },
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'room/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  const ModalGen = () => <Modal {...modalProps} />
  const FilterGen = () => <Filter {...filterProps} />

  return (
    <div className="content-inner">
      <FilterGen />
      {
        -1 > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Room.propTypes = {
  room: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  course: PropTypes.object,
  student: PropTypes.object,
}

export default connect(({ room, loading, course, student }) => ({ room, loading, course, student }))(Room)
