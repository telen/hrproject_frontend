import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Statistic = ({ location, dispatch, graduate, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, selectedRowKeysStudent, currentStudents } = graduate
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['graduate/query'],
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
        type: 'graduate/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'graduate/queryStudent',
        payload: {
          currentItem: item,
          classId: item.classId,
        },
      })
    },
    onEditItemLedger (item) {
      dispatch({
        type: 'graduate/queryGraduate',
        payload: {
          currentItem: item,
          classId: item.classId,
          modalType: 'updateLedger',
        },
      })
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'graduate/updateState',
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
        pathname: '/graduate/statistic',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/graduate/statistic',
      }))
    },
    onAdd () {
      dispatch({
        type: 'graduate/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'graduate/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'user/switchIsMotion' })
    },
  }

  let modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    modalType,
    currentStudents,
    selectedRowKeysStudent,
    width: 1000,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['graduate/update'],
    title: `${modalType === 'create' ? '添加' : '编辑'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `graduate/${modalType}`,
        payload: data,
      })
    },
    onLedgerOk (data) {
      // 生成台账 updateLedger
      dispatch({
        type: `graduate/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'graduate/hideModal',
      })
    },
  }

  modalProps = modalType === 'updateLedger' ? {
    ...modalProps,
    ...{
      rowSelection: {
        selectedRowKeys: selectedRowKeysStudent,
        onChange: (keys) => {
          dispatch({
            type: 'graduate/updateState',
            payload: {
              selectedRowKeysStudent: keys,
            },
          })
        },
      },
    },
  } : modalProps

  const handleDeleteItems = () => {
    dispatch({
      type: 'graduate/multiDelete',
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

Statistic.propTypes = {
  graduate: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ graduate, loading }) => ({ graduate, loading }))(Statistic)
