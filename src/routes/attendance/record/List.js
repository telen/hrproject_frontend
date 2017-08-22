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
      title: 'ID',
      dataIndex: 'attendanceId',
      key: 'attendanceId',
    }, {
      title: '设备',
      dataIndex: 'deviceId',
      key: 'deviceId',
    }, {
      title: '设备名',
      dataIndex: 'deviceName',
      key: 'deviceName',
    }, {
      title: '学员姓名',
      dataIndex: 'studentName',
      key: 'studentName',
    }, {
      title: '所属班级',
      dataIndex: 'classId',
      key: 'classId',
    }, {
      title: '上课打卡时间',
      dataIndex: 'startTime',
      key: 'startTime',
    }, {
      title: '下课打卡时间',
      dataIndex: 'endTime',
      key: 'endTime',
    }, {
      title: '本次考勤状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let label = '异常'
        switch (text) {
          case 0:
            label = '正常'
            break
          case 1:
            label = '请加'
            break
          case 2:
            label = '迟到'
            break
          case 3:
            label = '早退'
            break
          case 4:
            label = '补打卡'
            break
          case 5:
            label = '异常'
            break
          default:
            label = '未知'
        }
        return label
      },
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
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
        rowKey={record => record.attendanceId}
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
