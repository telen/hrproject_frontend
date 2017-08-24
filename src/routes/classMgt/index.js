import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const ClassMgt = ({ location, dispatch, classMgt, loading, agentMgt }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = classMgt
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    agentMgt,
    loading: loading.effects['classMgt/query'],
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
        type: 'classMgt/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'classMgt/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onPassItem (key) {
      dispatch({
        type: 'classMgt/pass',
        payload: {
          flowId: key,
        },
      })
    },
    onRejectItem (key) {
      dispatch({
        type: 'classMgt/reject',
        payload: {
          flowId: key,
        },
      })
    },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'classMgt/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
  }

  const filterProps = {
    isMotion,
    agentMgt,
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
        pathname: '/classMgt',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/classMgt',
      }))
    },
    onAdd () {
      dispatch({
        type: 'classMgt/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'classMgt/multiDelete',
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
    confirmLoading: loading.effects['classMgt/update'],
    title: `${modalType === 'create' ? '添加课程' : '编辑课程'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `classMgt/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'classMgt/hideModal',
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'classMgt/multiDelete',
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

ClassMgt.propTypes = {
  classMgt: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  agentMgt: PropTypes.object,
}

export default connect(({ classMgt, loading, agentMgt }) => ({ classMgt, loading, agentMgt }))(ClassMgt)
