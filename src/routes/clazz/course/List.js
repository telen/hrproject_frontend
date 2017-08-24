import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, teacher, ...tableProps }) => {
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
      title: '课程编号',
      dataIndex: 'courseId',
      key: 'courseId',
    }, {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
    }, {
      title: '所属专业',
      dataIndex: 'profession',
      key: 'profession',
    }, {
      title: '课程描述',
      dataIndex: 'courseBrief',
      key: 'courseBrief',
    }, {
      title: '所用教材',
      dataIndex: 'teachingMaterial',
      key: 'teachingMaterial',
    }, {
      title: '课程学时',
      dataIndex: 'period',
      key: 'period',
    }, {
      title: '专业描述',
      dataIndex: 'professionBrief',
      key: 'professionBrief',
    }, {
      title: '教师姓名',
      dataIndex: 'teacherId',
      key: 'teacherId',
      render: (text) => {
        const teacherItem = teacher.list.filter((item) => {
          return item.teacherId === text
        })
        return teacherItem[0] ? teacherItem[0].name : text
      }
    }, {
      title: '行业类别',
      dataIndex: 'industryCategory',
      key: 'industryCategory',
    }, {
      title: '培训形式',
      dataIndex: 'trainingForm',
      key: 'trainingForm',
    }, {
      title: '培训工种',
      dataIndex: 'trainingJobs',
      key: 'trainingJobs',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        return (
          <div className={styles.menuwrap}>
            <a onClick={() => handleMenuClick(record, { key: '1' })}>编辑</a>

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
        rowKey={record => record.courseId}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  teacher: PropTypes.object,
}

export default List
