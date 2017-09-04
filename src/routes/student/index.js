import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Student = ({ location, dispatch, student, loading, course }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, deviceInfo } = student
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    course,
    loading: loading.effects['student/query'],
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
        type: 'student/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'student/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'student/updateState',
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
        pathname: '/student',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/student',
      }))
    },
    onAdd () {
      dispatch({
        type: 'student/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'student/multiDelete',
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
    item: modalType === 'create' ? deviceInfo : currentItem,
    width: 1000,
    course,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['student/update'],
    title: `${modalType === 'create' ? '添加学员' : '编辑学员'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `student/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'student/hideModal',
      })
    },
    readIDCard () {
      dispatch({
        type: 'student/readIDCard',
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'student/multiDelete',
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

Student.propTypes = {
  student: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  course: PropTypes.object,
}

export default connect(({ student, loading, course }) => ({ student, loading, course }))(Student)
