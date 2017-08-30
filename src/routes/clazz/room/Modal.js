import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Table, Tag, Modal, Icon,
  Row, Col, Select, DatePicker, message } from 'antd'
import styles from './List.less'
import moment from 'moment'
import city from '../../../utils/city'

import { classnames, config } from 'utils'

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
  modalType,
  item = {},
  course,
  student,
  rowSelection,
  selectedRowKeysOfStudent,
  onOk,
  onCourseChange,
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

      if (selectedRowKeysOfStudent.length === 0) {
        message.error('请选择学生')
        return
      }
      data.studentIds = selectedRowKeysOfStudent
      onOk(data)
    })
  }

  let modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  if (modalType === 'view') {
    modalOpts = {
      ...modalProps,
      footer: null,
    }
  }

  const columns = [
    {
      title: '学生编号',
      dataIndex: 'studentId',
      key: 'studentId',
    }, {
      title: '学员姓名',
      dataIndex: 'studentName',
      key: 'studentName',
    }, {
      title: '学员性别',
      dataIndex: 'gender',
      key: 'gender',
      render: text => (<span>{text === 0
        ? '男'
        : '女'}</span>),
    }, {
      title: '学员生日',
      dataIndex: 'birthday',
      key: 'birthday',
      render: text => moment(text).format(dateFormat),
    }, {
      title: '学员学历',
      dataIndex: 'education',
      key: 'education',
    }, {
      title: '联系手机',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '联系邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '参保状态',
      dataIndex: 'insuredStatus',
      key: 'insuredStatus',
      render: (text, record) => <Tag color={text ? '#acd4f3' : '#EE7D19'}>{ text === 0 ? '已参保' : '未参保'}</Tag>,
    }, {
      title: '所属课程',
      dataIndex: 'courseId',
      key: 'courseId',
      render: (text) => {
        const courseItem = course.list.filter((itemc) => { return itemc.courseId === text })

        return courseItem[0] ? courseItem[0].courseName : text
      },
    },
  ]

  const handleChange = (value) => {
    onCourseChange(value)
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
                })(<Select onChange={handleChange} allowClear={true} >
                  {course.list.map((itemc) => {
                    return <Option key={itemc.courseId} value={itemc.courseId}>{itemc.courseName}</Option>
                  })}
                </Select>)}
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
        <div className={classnames(styles.formFields, styles.formTable)}>
          <Table
            dataSource={student.list}
            rowSelection={rowSelection}
            bordered
            columns={columns}
            simple
            size="small"
            rowKey={record => record.studentId}
          />
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
  course: PropTypes.object,
  student: PropTypes.object,
  rowSelection: PropTypes.object,
  onCourseChange: PropTypes.func,
  selectedRowKeysOfStudent: PropTypes.array,
  modalType: PropTypes.string,
}

export default Form.create()(modal)
