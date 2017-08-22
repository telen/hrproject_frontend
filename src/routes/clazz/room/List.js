import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import styles from './List.less'
import moment from 'moment'

const dateFormat = 'YYYY-MM-DD'
const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '班级编号',
      dataIndex: 'classId',
      key: 'classId',
    }, {
      title: '班级名称',
      dataIndex: 'classname',
      key: 'classname',
    }, {
      title: '班级人数',
      dataIndex: 'predictedCount',
      key: 'predictedCount',
    }, {
      title: '教师姓名',
      dataIndex: 'teacher',
      key: 'teacher',
    }, {
      title: '所属课程',
      dataIndex: 'course',
      key: 'course',
    }, {
      title: '所属专业',
      dataIndex: 'affiliatedProfession',
      key: 'affiliatedProfession',
    }, {
      title: '所属机构',
      dataIndex: 'agentName',
      key: 'agentName',
    }, {
      title: '开班时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text) => moment(text).format(dateFormat),
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text) => moment(text).format(dateFormat),
    }, {
      title: '申请人',
      dataIndex: 'proposer',
      key: 'proposer',
    }, {
      title: '申请人手机',
      dataIndex: 'proposerMobile',
      key: 'proposerMobile',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        return (
          <div className={styles.menuwrap}>
            <a onClick={e => handleMenuClick(record, { key: '1' })}>编辑</a>
            <a>申请</a>

          </div>
        )
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: false })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.classId}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
