import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

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
      title: '台账编号',
      dataIndex: 'ledgerId',
      key: 'ledgerId',
    }, {
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
    }, {
      title: '毕业人数',
      dataIndex: 'graduateNumbers',
      key: 'graduateNumbers',
    }, {
      title: '教师姓名',
      dataIndex: 'teacher',
      key: 'teacher',
    }, {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
    }, {
      title: '结业时间',
      dataIndex: 'graduateTime',
      key: 'graduateTime',
    }, {
      title: '出勤率',
      dataIndex: 'attendanceRate',
      key: 'attendanceRate',
    }, {
      title: '申请人姓名',
      dataIndex: 'applicantName',
      key: 'applicantName',
    }, {
      title: '申请人手机号',
      dataIndex: 'applicantMobile',
      key: 'applicantMobile',
    }, {
      title: '审批状态',
      dataIndex: 'auditStatus',
      key: 'auditStatus',
      render: (text) => {
        let t = ''
        switch (text) {
          case 0:
            t = '初始化(默认值)'
            break
          case 1:
            t = '等待审核'
            break
          case 2:
            t = '审核通过'
            break
          case 3:
            t = '审核驳回'
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

        return (<div className={styles.menuwrap}>
          <a onClick={() => handleMenuClick(record, { key: '1' })}>详情</a>
        </div>)
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
        rowKey={record => record.ledgerId}
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
