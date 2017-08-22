import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Application = ({ location, dispatch, application, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = application
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['application/query'],
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
        type: 'user/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'user/showModal',
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
          type: 'application/updateState',
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
        pathname: '/class/application',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/class/application',
      }))
    },
    onAdd () {
      dispatch({
        type: 'application/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'application/multiDelete',
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
    confirmLoading: loading.effects['application/update'],
    title: `${modalType === 'create' ? '添加申请' : '编辑申请'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `application/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'application/hideModal',
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'application/multiDelete',
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

Application.propTypes = {
  application: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ application, loading }) => ({ application, loading }))(Application)
