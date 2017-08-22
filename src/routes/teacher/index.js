import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Teacher = ({ location, dispatch, teacher, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = teacher
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['teacher/query'],
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
        type: 'teacher/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'teacher/showModal',
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
          type: 'teacher/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
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
        pathname: '/teacher',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/teacher',
      }))
    },
    onAdd () {
      dispatch({
        type: 'teacher/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'teacher/multiDelete',
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
    item: modalType === 'create' ? {} : currentItem,
    width: 1000,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['teacher/update'],
    title: `${modalType === 'create' ? '添加教师' : '编辑教师'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `teacher/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'teacher/hideModal',
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'teacher/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  const ModalGen = () => <Modal {...modalProps} />

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
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

Teacher.propTypes = {
  teacher: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ teacher, loading }) => ({ teacher, loading }))(Teacher)
