import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const InspectionBefore = ({ location, dispatch, inspectionBefore, loading, course, agentMgt }) => {
  const { list, pagination, currentItem, currentStudents, currentStudent, modalVisible, modalType, isMotion, selectedRowKeys } = inspectionBefore
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    course,
    loading: loading.effects['inspectionBefore/query'],
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
        type: 'inspectionBefore/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'inspectionBefore/queryStudent',
        payload: {
          currentItem: item,
        },
      })
    },
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
        pathname: '/inspection/inspectionBefore',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/inspection/inspectionBefore',
      }))
    },
    onAdd () {
      dispatch({
        type: 'inspectionBefore/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'inspectionBefore/multiDelete',
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
    currentStudents,
    currentStudent,
    width: 1000,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['inspectionBefore/update'],
    title: `${modalType === 'create' ? '添加课程' : '编辑课程'}`,
    wrapClassName: 'vertical-center-modal',
    footer: null,
    onOk (data) {
      dispatch({
        type: `inspectionBefore/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'inspectionBefore/hideModal',
      })
    },
    onStudentClick (index) {
      dispatch({
        type: 'inspectionBefore/showStudent',
        payload: {
          currentStudent: currentStudents[index],
        },
      })
    },
    onCheckOk (classId) {
      dispatch({
        type: 'inspectionBefore/inspect',
        payload: {
          inspectionStatus: 1,
          classId,
        },
      })
    },
    onCheckNotOk (classId) {
      dispatch({
        type: 'inspectionBefore/inspect',
        payload: {
          inspectionStatus: 0,
          classId,
        },
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'inspectionBefore/multiDelete',
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

InspectionBefore.propTypes = {
  inspectionBefore: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  course: PropTypes.object,
  agentMgt: PropTypes.object,
}

export default connect(({ inspectionBefore, loading, course, agentMgt }) => ({ inspectionBefore, loading, course, agentMgt }))(InspectionBefore)
