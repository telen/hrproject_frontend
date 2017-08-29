import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, roleMap, ...tableProps }) => {
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
      title: '账号名称',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    }, {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    }, {
      title: '电话',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '角色id',
      dataIndex: 'roleId',
      key: 'roleId',
    }, {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (text, record) => { return roleMap[record.roleId] },
    },
    // {
    //   title: '操作',
    //   key: 'operation',
    //   width: 100,
    //   render: (text, record) => {
    //     const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
    //     return (
    //       <div className={styles.menuwrap}>
    //         <a onClick={() => handleMenuClick(record, { key: '1' })}>编辑</a>
    //       </div>
    //     )
    //   },
    // },
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
        rowKey={record => record.userId}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  roleMap: PropTypes.object,
}

export default List
