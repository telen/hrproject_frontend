import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import styles from './List.less'
import moment from 'moment'

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
      title: '教师编号',
      dataIndex: 'teacherId',
      key: 'teacherId',
    }, {
      title: '教师姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    }, {
      title: '教师性别',
      dataIndex: 'gender',
      key: 'gender',
      render: text => (<span>{text == 1
        ? '男'
        : '女'}</span>),
    }, {
      title: '教师生日',
      dataIndex: 'birthday',
      key: 'birthday',
      render: text => moment(text).format('YYYY-MM-DD')
    }, {
      title: '教师民族',
      dataIndex: 'nationality',
      key: 'nationality',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '教师学历',
      dataIndex: 'education',
      key: 'education',
    }, {
      title: '联系手机',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '身份证号',
      dataIndex: 'idNumber',
      key: 'idNumber',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        return (
          <div className={styles.menuwrap}>
            <a onClick={e => handleMenuClick(record, { key: '1' })}>编辑</a>
            <a>删除</a>
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
        rowKey={record => record.teacherId}
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
