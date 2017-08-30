import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const LedgerCheck = ({ location, dispatch, ledgerCheck, loading, agentMgt }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, currentStudents, selectedRowKeysStudent } = ledgerCheck
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['ledgerCheck/query'],
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
    onDeleteItem (flowId) {
      // 审核驳回
      dispatch({
        type: 'ledgerCheck/check',
        payload: {
          flowId,
          status: false,
        },
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'ledgerCheck/queryGraduate',
        payload: {
          currentItem: item,
          ledgerId: item.ledgerId,
          modalType: 'updateLedger',
        },
      })
    },
    onEditItemPass (flowId) {
      // 审核通过
      console.log(flowId)
      dispatch({
        type: 'ledgerCheck/check',
        payload: {
          flowId,
          status: true,
        },
      })
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'ledgerCheck/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
  }

  const filterProps = {
    agentMgt,
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
        pathname: '/ledgerCheck',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/ledgerCheck',
      }))
    },
    onAdd () {
      dispatch({
        type: 'ledgerCheck/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'ledgerCheck/multiDelete',
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
    currentStudents,
    selectedRowKeysStudent,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['ledgerCheck/update'],
    title: `${modalType === 'create' ? '添加课程' : '编辑课程'}`,
    wrapClassName: 'vertical-center-modal',
    onOk () {
      dispatch({
        type: 'ledgerCheck/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'ledgerCheck/hideModal',
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'ledgerCheck/multiDelete',
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

LedgerCheck.propTypes = {
  ledgerCheck: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ ledgerCheck, loading, agentMgt }) => ({ ledgerCheck, loading, agentMgt }))(LedgerCheck)
