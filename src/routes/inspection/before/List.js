import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import moment from 'moment'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const dateFormat = 'YYYY-MM-DD'

const List = ({ onDeleteItem, onEditItem, isMotion, location, course, ...tableProps }) => {
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
      dataIndex: 'courseId',
      key: 'courseId',
      render: (text) => {
        const courseItem = course.list.filter((item) => { return item.courseId === text })

        return courseItem[0] ? courseItem[0].courseName : text
      },
    }, {
      title: '所属机构',
      dataIndex: 'agencyName',
      key: 'agencyName',
    }, {
      title: '班级开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text) => moment(text).format(dateFormat),
    }, {
      title: '结业时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text) => moment(text).format(dateFormat),
    }, {
      title: '抽查历史',
      dataIndex: 'inspections',
      key: 'inspections',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        return (
          <div className={styles.menuwrap}>
            <a onClick={() => handleMenuClick(record, { key: '1' })}>抽查</a>
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
        rowKey={record => record.id}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  course: PropTypes.object,
}

export default List
