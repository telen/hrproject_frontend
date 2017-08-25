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

const List = ({ onDeleteItem, onEditItem, onEditItemLedger, isMotion, location, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      onEditItemLedger(record)
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
      title: '申请人',
      dataIndex: 'proposer',
      key: 'proposer',
    }, {
      title: '所属课程',
      dataIndex: 'courseId',
      key: 'courseId',
    }, {
      title: '结业时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text) => moment(text).format(dateFormat),
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
            <a onClick={() => handleMenuClick(record, { key: '1' })}>详情</a>
            <a onClick={() => handleMenuClick(record, { key: '2' })}>生成台账</a>
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
  onEditItemLedger: PropTypes.func,
}

export default List
