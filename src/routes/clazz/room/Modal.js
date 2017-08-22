import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Icon,
  Row, Col, Select, DatePicker, Button } from 'antd'
import styles from './List.less'
import moment from 'moment'
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
        key: item.key,
      }
      data.startTime = data.startTime.valueOf()
      data.endTime = data.endTime.valueOf()
      data.onClassTime = data.onClassTime.valueOf()
      data.offClassTime = data.offClassTime.valueOf()

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
        <p className={styles.formLabel}><Icon type="file-text" /> 班级基本情况</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="班级编号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('classId', {
                  initialValue: item.classId,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input readOnly={true} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="班级名称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('classname', {
                  initialValue: item.classname,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="所属课程" hasFeedback {...formItemLayout}>
                {getFieldDecorator('courseId', {
                  initialValue: item.courseId,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="所属专业" hasFeedback {...formItemLayout}>
                {getFieldDecorator('affiliatedProfession', {
                  initialValue: item.affiliatedProfession,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="班级人数" hasFeedback {...formItemLayout}>
                {getFieldDecorator('predictedCount', {
                  initialValue: item.predictedCount,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<InputNumber />)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="开班时间" hasFeedback {...formItemLayout}>
                {getFieldDecorator('startTime', {
                  initialValue: moment(item.startTime),
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<DatePicker format={dateFormat} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="结束时间" hasFeedback {...formItemLayout}>
                {getFieldDecorator('endTime', {
                  initialValue: moment(item.endTime),
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<DatePicker format={dateFormat} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="上课时间" hasFeedback {...formItemLayout}>
                {getFieldDecorator('onClassTime', {
                  initialValue: moment(item.endTime),
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format={`${dateFormat} HH:mm`}
                />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="下课时间" hasFeedback {...formItemLayout}>
                {getFieldDecorator('offClassTime', {
                  initialValue: moment(item.startTime),
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<DatePicker
                  showTime={{ format: 'HH:mm' }}
                  format={`${dateFormat} HH:mm`}
                />)}
              </FormItem>
            </Col>

          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="申请人" hasFeedback {...formItemLayout}>
                {getFieldDecorator('proposer', {
                  initialValue: item.proposer,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="申请人手机" hasFeedback {...formItemLayout}>
                {getFieldDecorator('proposerMobile', {
                  initialValue: item.proposerMobile,
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: 'The input is not valid phone!',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="教学文件" hasFeedback {...formItemLayout}>
                {getFieldDecorator('teachPlanFilePath', {
                  initialValue: item.teachPlanFilePath,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
        </div>

        <p className={styles.formLabel}><Icon type="file-text" /> 学员信息</p>
        <div className={styles.formFields}>

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
}

export default Form.create()(modal)
