import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Icon,
  Row, Col, Select, DatePicker, Button } from 'antd'
import styles from './List.less'
import moment from 'moment'
import city from '../../utils/city'

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
        <p className={styles.formLabel}><Icon type="file-text" /> 机构信息</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="机构编号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('agencyId', {
                  initialValue: item.agencyId,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input readOnly={true} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="机构名字" hasFeedback {...formItemLayout}>
                {getFieldDecorator('agencyName', {
                  initialValue: item.agencyName,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="机构负责人" hasFeedback {...formItemLayout}>
                {getFieldDecorator('agencyHead', {
                  initialValue: item.agencyHead,
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
              <FormItem label="负责人联系方式" hasFeedback {...formItemLayout}>
                {getFieldDecorator('agencyMobile', {
                  initialValue: item.agencyMobile,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="邮箱" hasFeedback {...formItemLayout}>
                {getFieldDecorator('agencyMail', {
                  initialValue: item.agencyMail,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="地址" hasFeedback {...formItemLayout}>
                {getFieldDecorator('address', {
                  initialValue: item.address,
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
              <FormItem label="教职工数量" hasFeedback {...formItemLayout}>
                {getFieldDecorator('employeesCount', {
                  initialValue: item.employeesCount,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="上级主管部门" hasFeedback {...formItemLayout}>
                {getFieldDecorator('superiorDepartment', {
                  initialValue: item.superiorDepartment,
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
