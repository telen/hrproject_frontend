import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Record = ({ location, dispatch, record, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = record
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['record/query'],
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
        type: 'attendance/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'attendance/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'record/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
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
        pathname: '/attendanc/record',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/attendanc/record',
      }))
    },
    onAdd () {
      dispatch({
        type: 'record/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'record/multiDelete',
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
    confirmLoading: loading.effects['record/update'],
    title: `${modalType === 'create' ? '考勤补录' : '编辑'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `record/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'record/hideModal',
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'record/multiDelete',
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

Record.propTypes = {
  record: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ record, loading }) => ({ record, loading }))(Record)
