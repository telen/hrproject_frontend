import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Ledger = ({ location, dispatch, ledger, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, selectedRowKeysStudent, currentStudents } = ledger
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['ledger/query'],
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
        type: 'ledger/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'ledger/queryGraduate',
        payload: {
          currentItem: item,
          ledgerId: item.ledgerId,
          modalType: 'updateLedger',
        },
      })
    },
    onEditItemLedger (item) {
      dispatch({
        type: 'ledger/queryStudent',
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
    //       type: 'ledger/updateState',
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
        pathname: '/graduate/ledger',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/graduate/ledger',
      }))
    },
    onAdd () {
      dispatch({
        type: 'ledger/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'ledger/multiDelete',
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
    confirmLoading: loading.effects['ledger/update'],
    title: `${modalType === 'create' ? '添加' : '编辑'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `ledger/${modalType}`,
        payload: data,
      })
    },
    onLedgerOk (data) {
      console.log(data)
      dispatch({
        type: `ledger/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'ledger/hideModal',
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
            type: 'ledger/updateState',
            payload: {
              selectedRowKeysStudent: keys,
            },
          })
        },
      },
      footer: null,
    },
  } : modalProps

  const handleDeleteItems = () => {
    dispatch({
      type: 'ledger/multiDelete',
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

Ledger.propTypes = {
  ledger: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ ledger, loading }) => ({ ledger, loading }))(Ledger)
