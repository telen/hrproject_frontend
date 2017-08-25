import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import styles from './List.less'

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
      dataIndex: 'totalCount',
      key: 'totalCount',
    }, {
      title: '教师姓名',
      dataIndex: 'teacherName',
      key: 'teacherName',
    }, {
      title: '考勤正常人数',
      dataIndex: 'normalCount',
      key: 'normalCount',
    }, {
      title: '迟到人数',
      dataIndex: 'beLateCount',
      key: 'beLateCount',
    }, {
      title: '早退人数',
      dataIndex: 'leaveEarlyCount',
      key: 'leaveEarlyCount',
    }, {
      title: '旷课人数',
      dataIndex: 'absentCount',
      key: 'absentCount',
    }, {
      title: '补录人数',
      dataIndex: 'addedCount',
      key: 'addedCount',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        return (
          <div className={styles.menuwrap}>
            <a onClick={() => handleMenuClick(record, { key: '1' })}>考勤详情</a>
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
