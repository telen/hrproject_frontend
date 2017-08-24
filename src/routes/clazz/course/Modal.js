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
  teacher,
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
        <p className={styles.formLabel}><Icon type="file-text" /> 课程基本情况</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="课程编号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('courseId', {
                  initialValue: item.courseId,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input readOnly={true} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="课程名称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('courseName', {
                  initialValue: item.courseName,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="课程学时" hasFeedback {...formItemLayout}>
                {getFieldDecorator('period', {
                  initialValue: item.period,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="教师姓名" hasFeedback {...formItemLayout}>
                {getFieldDecorator('teacherId', {
                  initialValue: item.teacherId,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Select>
                  {teacher.list.map((itemc) => {
                    return <Option key={itemc.teacherId} value={itemc.teacherId}>{itemc.name}</Option>
                  })}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="所用教材" hasFeedback {...formItemLayout}>
                {getFieldDecorator('teachingMaterial', {
                  initialValue: item.teachingMaterial,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="课程描述" hasFeedback {...formItemLayout}>
                {getFieldDecorator('courseBrief', {
                  initialValue: item.courseBrief,
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
                {getFieldDecorator('profession', {
                  initialValue: item.profession,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
        </div>

        <p className={styles.formLabel}><Icon type="file-text" /> 其他信息</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="专业描述" hasFeedback {...formItemLayout}>
                {getFieldDecorator('professionBrief', {
                  initialValue: item.professionBrief,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="行业类别" hasFeedback {...formItemLayout}>
                {getFieldDecorator('industryCategory', {
                  initialValue: item.industryCategory,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="培训形式" hasFeedback {...formItemLayout}>
                {getFieldDecorator('trainingForm', {
                  initialValue: item.trainingForm,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="培训工种" hasFeedback {...formItemLayout}>
                {getFieldDecorator('trainingJobs', {
                  initialValue: item.trainingJobs,
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

      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  teacher: PropTypes.object,
}

export default Form.create()(modal)
