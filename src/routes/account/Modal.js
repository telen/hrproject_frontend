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
  agentMgt,
  currentUser,
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
  let agencyMenu = null
  let roleMenu = (<FormItem label="角色Id" hasFeedback {...formItemLayout}>
    {getFieldDecorator('roleId', {
      initialValue: item.roleId,
      rules: [
        {
          required: true,
        },
      ],
    })(<Select>
      <Option key="17081610225621055997" value="17081610225621055997">培训机构管理员</Option>
    </Select>)}
  </FormItem>)
  if (currentUser.roleId === '17081610225621055995') {
    agencyMenu = (<FormItem label="所属机构" hasFeedback {...formItemLayout}>
      {getFieldDecorator('agencyId', {
        initialValue: item.agencyId,
        rules: [
          {
            required: false,
          },
        ],
      })(<Select allowClear={true}>
        {agentMgt.list.map((itemc) => {
          return <Option key={itemc.agencyId} value={itemc.agencyId}>{itemc.agencyName}</Option>
        })}
      </Select>)}
    </FormItem>)

    roleMenu = (<FormItem label="角色" hasFeedback {...formItemLayout}>
      {getFieldDecorator('roleId', {
        initialValue: item.roleId,
        rules: [
          {
            required: true,
          },
        ],
      })(<Select allowClear={true}>
        <Option key="17081610225621055997" value="17081610225621055997">培训机构管理员</Option>
        <Option key="17081610225621055996" value="17081610225621055996">人社局管理员</Option>
      </Select>)}
    </FormItem>)
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <p className={styles.formLabel}><Icon type="file-text" /> 添加</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="账号名称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('userName', {
                  initialValue: item.userName,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="登陆账号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('account', {
                  initialValue: item.account,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="密码" hasFeedback {...formItemLayout}>
                {getFieldDecorator('password', {
                  initialValue: item.password,
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
              <FormItem label="手机号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('mobile', {
                  initialValue: item.mobile,
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: '需要正确手机号',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="邮箱" hasFeedback {...formItemLayout}>
                {getFieldDecorator('email', {
                  initialValue: item.email,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
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
                })(<Select allowClear={true}>
                  {agentMgt.list.map((itemc) => {
                    return <Option key={itemc.agencyId} value={itemc.agencyId}>{itemc.agencyName}</Option>
                  })}
                </Select>)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              {roleMenu}
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
  agentMgt: PropTypes.object,
  currentUser: PropTypes.object,
}

export default Form.create()(modal)
