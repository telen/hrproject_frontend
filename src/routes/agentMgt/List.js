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
      dataIndex: 'agencyId',
      key: 'agencyId',
    }, {
      title: '机构名称',
      dataIndex: 'agencyName',
      key: 'agencyName',
    }, {
      title: '机构负责人',
      dataIndex: 'agencyHead',
      key: 'agencyHead',
    }, {
      title: '机构地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '教职工人数',
      dataIndex: 'employeesCount',
      key: 'employeesCount',
    }, {
      title: '机构负责人电话',
      dataIndex: 'agencyMobile',
      key: 'agencyMobile',
    }, {
      title: '申请人邮箱',
      dataIndex: 'agencyEmail',
      key: 'agencyEmail',
    }, {
      title: '上级主管部门',
      dataIndex: 'superiorDepartment',
      key: 'superiorDepartment',
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
        rowKey={record => record.agencyId}
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
