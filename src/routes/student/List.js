import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import moment from 'moment'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
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
      title: '学生编号',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: '身份证号',
      dataIndex: 'idNumber',
      key: 'idNumber',
    }, {
      title: '学员姓名',
      dataIndex: 'studentName',
      key: 'studentName',
    }, {
      title: '学员性别',
      dataIndex: 'gender',
      key: 'gender',
      render: text => (<span>{text === '0'
        ? '男'
        : '女'}</span>),
    }, {
      title: '学员生日',
      dataIndex: 'birthday',
      key: 'birthday',
      render: text => moment(text).format(dateFormat),
    }, {
      title: '学员民族',
      dataIndex: 'nationality',
      key: 'nationality',
    }, {
      title: '学员学历',
      dataIndex: 'education',
      key: 'education',
    }, {
      title: '联系手机',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '联系邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '参保状态',
      dataIndex: 'insuredStatus',
      key: 'insuredStatus',
      render: (text, record) => <Tag color={text ? '#acd4f3' : '#EE7D19'}>{ text === 0 ? '已参保' : '未参保'}</Tag>,
    }, {
      title: '所属课程',
      dataIndex: 'courseId',
      key: 'courseId',
      render: (text) => {
        const courseItem = course.list.filter((item) => { return item.courseId === text })

        return courseItem[0] ? courseItem[0].courseName : text
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        return (
          <div className={styles.menuwrap}>
            <a onClick={(e) => handleMenuClick(record, { key: '1' })}>编辑</a>

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
        rowKey={record => record.studentId}
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
