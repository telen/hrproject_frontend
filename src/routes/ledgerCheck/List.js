import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
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
      title: '机构编号',
      dataIndex: 'agentId',
      key: 'agentId',
    }, {
      title: '是否已申请国培训补贴',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '机构负责人',
      dataIndex: 'charger',
      key: 'charger',
    }, {
      title: '公民身份证号码',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '人员类别',
      dataIndex: 'people',
      key: 'people',
    }, {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '批准时间',
      dataIndex: 'passTime',
      key: 'passTime',
    }, {
      title: '申请人邮箱',
      dataIndex: 'agencyEmail',
      key: 'agencyEmail',
    }, {
      title: '上级主管部门',
      dataIndex: 'chargerDev',
      key: 'chargerDev',
    }, {
      title: '机构教师信息',
      dataIndex: 'teachers',
      key: 'teachers',
    }, {
      title: '机构开设专业',
      dataIndex: 'courses',
      key: 'courses',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        return (
          <div className={styles.menuwrap}>
            <a>审核</a>
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
