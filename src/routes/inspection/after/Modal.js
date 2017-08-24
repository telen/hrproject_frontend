import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Icon,
  Row, Col, Select, DatePicker, Button, Card } from 'antd'
import styles from './List.less'
import moment from 'moment'
import city from '../../../utils/city'
import { classnames } from '../../../utils'

const Option = Select.Option

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
}

const dateFormat = 'YYYY-MM-DD'

const modal = ({
  item = {},
  onOk,
  currentStudents,
  currentStudent,
  onStudentClick,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }

      // onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <p className={styles.formLabel}><Icon type="file-text" /> 班级基本情况</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={12}>
              <Card>
                <p>摄像头</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="学员信息">
                <p>姓名: {currentStudent.studentName}</p>
                <p>性别: {currentStudent.gender === 0 ? '男' : '女'}</p>
                <p>出生日期: {currentStudent.birthday}</p>
                <p>身份证号: {currentStudent.idNumber}</p>
              </Card>
              <Card>
                <h2>班级名称: {item.classname} </h2>
                <p>学员人数: </p>
                <p>申请人: {item.proposer}  申请人电话: {item.proposerMobile} </p>
                <div className={styles.insetPanel}>
                  <Button type="primary">完成</Button>
                  <Button type="default">终止</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        <p className={styles.formLabel}><Icon type="file-text" /> 学员信息</p>
        <div className={classnames(styles.insetPanel, styles.formTable)}>
          {currentStudents.map((item, index) => {
            return <Button key={item.studentId} onClick={() => onStudentClick(index)}>{item.studentName}</Button>
          })}
        </div>

      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  currentStudents: PropTypes.array,
  onStudentClick: PropTypes.func,
  currentStudent: PropTypes.object,
}

export default Form.create()(modal)
