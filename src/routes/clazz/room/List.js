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

const List = ({ onDeleteItem, onEditItem, onApplyItem, isMotion, location, course, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record, true)
    } else if (e.key === '2') {
      confirm({
        title: '确定提交申请吗?',
        onOk () {
          onApplyItem(record.classId)
        },
      })
    } else if (e.key === '3') {
      onEditItem(record, false)
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
      render: (text) => {
        const courseItem = course.list.filter((item) => { return item.courseId === text })

        return courseItem[0] ? courseItem[0].courseName : text
      },
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
      title: '申请状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let t = '新建'
        switch (text) {
          case 0:
            t = '新建'
            break
          case 1:
            t = '待审核'
            break
          case 2:
            t = '审核通过'
            break
          case 3:
            t = '驳回'
            break
          default:
            t = '未知'
        }
        return t
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        let op = null
        if (record.status === 0) {
          op = (<div className={styles.menuwrap}>
            <a onClick={e => handleMenuClick(record, { key: '1' })}>编辑</a>
            <a onClick={e => handleMenuClick(record, { key: '2' })}>申请</a>
          </div>)
        } else {
          op = (<div className={styles.menuwrap}>
            <a onClick={e => handleMenuClick(record, { key: '3' })}>查看</a>
          </div>)
        }
        return op
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
  course: PropTypes.object,
  onApplyItem: PropTypes.func,
}

export default List
