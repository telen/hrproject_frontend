import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Icon,
  Row, Col, Select, DatePicker, Button } from 'antd'
import moment from 'moment'
import styles from './List.less'
import city from '../../../utils/city'

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
  room,
  onOk,
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
      }
      data.status = 4 // 补打卡

      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <p className={styles.formLabel}><Icon type="file-text" /> 学员信息</p>
        <div className={styles.formFields}>
          {
            // <Row>
            //   <Col span={8}>
            //     <FormItem label="补录时间" hasFeedback {...formItemLayout}>
            //       {getFieldDecorator('startTime', {
            //         initialValue: item.startTime,
            //         rules: [
            //           {
            //             required: true,
            //           },
            //         ],
            //       })(<DatePicker
            //         showTime={{ format: 'HH:mm' }}
            //         format={`${dateFormat} HH:mm`}
            //       />)}
            //     </FormItem>
            //   </Col>
            //   <Col span={8}>
            //     <FormItem label="至" hasFeedback {...formItemLayout}>
            //       {getFieldDecorator('endTime', {
            //         initialValue: item.endTime,
            //         rules: [
            //           {
            //             required: true,
            //           },
            //         ],
            //       })(<DatePicker
            //         showTime={{ format: 'HH:mm' }}
            //         format={`${dateFormat} HH:mm`}
            //       />)}
            //     </FormItem>
            //   </Col>
            //   <Col span={8}>
            //
            //   </Col>
            // </Row>
          }
          <Row>
            <Col span={8}>
              <FormItem label="身份证号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('userId', {
                  initialValue: item.userId,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="姓名" hasFeedback {...formItemLayout}>
                {getFieldDecorator('studentName', {
                  initialValue: item.studentName,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="性别" hasFeedback {...formItemLayout}>
                {getFieldDecorator('gender', {
                  initialValue: item.gender,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Radio.Group>
                  <Radio value="0">男</Radio>
                  <Radio value="1">女</Radio>
                </Radio.Group>)}
              </FormItem>
            </Col>
            <Col span={8}>

            </Col>
          </Row>


          <Row>
            <Col span={8}>
              <FormItem label="所属班级" hasFeedback {...formItemLayout}>
                {getFieldDecorator('classId', {
                  initialValue: item.classId,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Select>
                  {room.list.map((itemc) => {
                    return <Option key={itemc.classId} value={itemc.classId}>{itemc.classname}</Option>
                  })}
                </Select>)}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="补录原因／请假" hasFeedback {...formItemLayout}>
                {getFieldDecorator('remark', {
                  initialValue: item.remark,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Select>
                  <Option value="忘打卡">忘打卡</Option>
                  <Option value="设备故障">设备故障</Option>
                  <Option value="请假">请假</Option>
                  <Option value="其他">其他</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>

            </Col>
          </Row>

          <Row>
            <Col span={8} offset={1} style={{ marginBottom: '16px' }}>
              <Button type="primary">录入指纹</Button>
            </Col>
          </Row>
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
  room: PropTypes.object,
}

export default Form.create()(modal)
