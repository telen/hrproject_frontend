import React from 'react'
import PropTypes from 'prop-types'
import { Row, Modal, Col, Card, Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'dva/router'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, room, ...tableProps }) => {
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

  return (
    <div>
      <Row style={{ marginBottom: '15px' }}>
        <Col span={24}>
          <Button>连接设备</Button> 设备状态：已连接
        </Col>
      </Row>
      <Card>
        <Row>
          <Col span={6}>
            <img src="https://dummyimage.com/128x153" alt="student head" />
            <p>指纹ID：xxxxx</p>
            <p>匹配学生：xxxxx</p>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  room: PropTypes.object,
}

export default List
