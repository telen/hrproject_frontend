import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const InspectionInprogress = ({ location, dispatch, inspectionInprogress, loading, course, agentMgt }) => {
  const { list, pagination, currentItem, currentStudents, currentStudent, modalVisible, modalType, isMotion, selectedRowKeys } = inspectionInprogress
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    course,
    loading: loading.effects['inspectionInprogress/query'],
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
        type: 'inspectionInprogress/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'inspectionInprogress/queryStudent',
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
        pathname: '/inspection/inspectionInprogress',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/inspection/inspectionInprogress',
      }))
    },
    onAdd () {
      dispatch({
        type: 'inspectionInprogress/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onDeleteItems () {
      dispatch({
        type: 'inspectionInprogress/multiDelete',
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
    confirmLoading: loading.effects['inspectionInprogress/update'],
    title: `${modalType === 'create' ? '添加课程' : '编辑课程'}`,
    wrapClassName: 'vertical-center-modal',
    footer: null,
    onOk (data) {
      dispatch({
        type: `inspectionInprogress/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'inspectionInprogress/hideModal',
      })
    },
    onStudentClick (index) {
      dispatch({
        type: 'inspectionInprogress/showStudent',
        payload: {
          currentStudent: currentStudents[index],
        },
      })
    },
    onCheckOk (classId) {
      dispatch({
        type: 'inspectionInprogress/inspect',
        payload: {
          inspectionStatus: 2,
          classId,
        },
      })
    },
    onCheckNotOk (classId) {
      dispatch({
        type: 'inspectionInprogress/inspect',
        payload: {
          inspectionStatus: 1,
          classId,
        },
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'inspectionInprogress/multiDelete',
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

InspectionInprogress.propTypes = {
  inspectionInprogress: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  course: PropTypes.object,
  agentMgt: PropTypes.object,
}

export default connect(({ inspectionInprogress, loading, course, agentMgt }) => ({ inspectionInprogress, loading, course, agentMgt }))(InspectionInprogress)
