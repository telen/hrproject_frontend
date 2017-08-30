import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, onPassItem, onRejectItem, isMotion, location, agentMgt, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      confirm({
        title: '确定通过审核吗？',
        onOk () {
          onPassItem(record.flowId)
        },
      })
    } else if (e.key === '2') {
      confirm({
        title: '确定驳回吗？',
        onOk () {
          onRejectItem(record.flowId)
        },
      })
    }
  }

  const columns = [
    {
      title: '班级编号',
      dataIndex: 'flowId',
      key: 'flowId',
    }, {
      title: '所属机构',
      dataIndex: 'agencyName',
      key: 'agencyName',
      // render: (text) => {
      //   const agentItem = agentMgt.list.filter((item) => {
      //     return item.agencyId === text
      //   })
      //   return agentItem[0] ? agentItem[0].agencyName : text
      // },
    }, {
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
    }, {
      title: '申请状态',
      dataIndex: 'auditStatus',
      key: 'auditStatus',
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
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        const drop = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
        let menu = null
        if (record.auditStatus === 1) {
          menu = (
            <div className={styles.menuwrap}>
              <a onClick={(e) => handleMenuClick(record, { key: '1' })}>通过</a>
              <a onClick={(e) => handleMenuClick(record, { key: '2' })}>驳回</a>
            </div>
          )
        }
        return menu
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
        scroll={{ x: 1000 }}
        columns={columns}
        simple
        rowKey={record => record.flowId}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  onRejectItem: PropTypes.func,
  onPassItem: PropTypes.func,
  agentMgt: PropTypes.object,
}

export default List
