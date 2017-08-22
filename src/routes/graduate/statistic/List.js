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
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '班级名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '班级人数',
      dataIndex: 'studentNumber',
      key: 'studentNumber',
    }, {
      title: '教师姓名',
      dataIndex: 'teacher',
      key: 'teacher',
    }, {
      title: '所属课程',
      dataIndex: 'course',
      key: 'course',
    }, {
      title: '结业时间',
      dataIndex: 'graduateTime',
      key: 'graduateTime',
    }, {
      title: '考勤情况',
      dataIndex: 'attendance',
      key: 'attendance',
    }, {
      title: '成绩',
      dataIndex: 'score',
      key: 'score',
    }, {
      title: '结业证书',
      dataIndex: 'certificate',
      key: 'certificate',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        return (
          <div className={styles.menuwrap}>
            <a>详情</a>
            <a>生成台账</a>
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
}

export default List
