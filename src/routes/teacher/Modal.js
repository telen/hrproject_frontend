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
      data.birthday = data.birthday.valueOf()

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
        <p className={styles.formLabel}><Icon type="file-text" /> 教师信息</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="教师编号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('teacherId', {
                  initialValue: item.teacherId,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input readOnly={true}/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="教师姓名" hasFeedback {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: item.name,
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
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="民族" hasFeedback {...formItemLayout}>
                {getFieldDecorator('nationality', {
                  initialValue: item.nationality,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Select>
                  <Option value="han">汉族</Option>
                  <Option value="hui">回族</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="教师生日" hasFeedback {...formItemLayout}>
                {getFieldDecorator('birthday', {
                  initialValue: moment(item.birthday),
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<DatePicker format={dateFormat} />)}
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
              <FormItem label="手机号码" hasFeedback {...formItemLayout}>
                {getFieldDecorator('mobile', {
                  initialValue: item.mobile,
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: '手机号码有误!',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="身份证号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('idNumber', {
                  initialValue: item.idNumber,
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

        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="学历" hasFeedback {...formItemLayout}>
                {getFieldDecorator('education', {
                  initialValue: item.education,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Select>
                  <Option value="本科">本科</Option>
                  <Option value="研究生">研究生</Option>
                  <Option value="博士">博士</Option>
                  <Option value="博士后">博士后</Option>
                  <Option value="大专">大专</Option>
                  <Option value="高中及以下">高中及以下</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="所属机构" hasFeedback {...formItemLayout}>
                {getFieldDecorator('agencyId', {
                  initialValue: item.agencyId,
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
}

export default Form.create()(modal)
