import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Icon,
  Row, Col, Select, DatePicker, Button, Table, Card, message } from 'antd'
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
    span: 24,
  },
}

const dateFormat = 'YYYY-MM-DD'

const modal = ({
  item = {},
  rowSelection,
  modalType,
  currentStudents,
  onOk,
  onLedgerOk,
  selectedRowKeysStudent,
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
      const dataF = {
        agencyId: item.agencyId,
        classId: item.classId,
      }
      if (modalType === 'update') {
        dataF.graduateList = []
        currentStudents.map((item) => {
          dataF.graduateList.push({
            studentId: item.studentId,
            theoryScore: data[`${item.studentId}_theoryScore`],
            practiceScore: data[`${item.studentId}_practiceScore`],
            certificate: data[`${item.studentId}_certificate`],
          })
        })
        onOk(dataF)
      } else {
        if (selectedRowKeysStudent.length === 0) {
          message.error('请选择学生')
        } else {
          dataF.studentList = selectedRowKeysStudent
          onLedgerOk(dataF)
        }
      }
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
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
      render: text => (<span>{text === '0'
        ? '男'
        : '女'}</span>),
    }, {
      title: '理论成绩',
      dataIndex: 'theoryScore',
      key: 'theoryScore',
      render: (text, record) => (
        modalType === 'update' ? <FormItem {...formItemLayout} className={styles.inlineForm}>
          {getFieldDecorator(`${record.studentId}_theoryScore`, {
            // initialValue: item.studentName,
            rules: [
              {
                required: true,
                message: '缺少成绩',
              },
            ],
          })(<InputNumber />)}
        </FormItem> : text
      ),
    }, {
      title: '实操成绩',
      dataIndex: 'practiceScore',
      key: 'practiceScore',
      render: (text, record) => (
        modalType === 'update' ? <FormItem {...formItemLayout} className={styles.inlineForm}>
          {getFieldDecorator(`${record.studentId}_practiceScore`, {
            // initialValue: item.studentName,
            rules: [
              {
                required: true,
                message: '缺少成绩',
              },
            ],
          })(<InputNumber />)}
        </FormItem> : text
      ),
    }, {
      title: '证书',
      dataIndex: 'certificate',
      key: 'certificate',
      width: 200,
      render: (text, record) => (
        modalType === 'update' ? <FormItem {...formItemLayout} className={styles.inlineForm}>
          {getFieldDecorator(`${record.studentId}_certificate`, {
            // initialValue: item.certificate,
            rules: [
              {
                required: false,
              },
            ],
          })(<Select>
            <Option value="职业资格一级(高级技师)">职业资格一级(高级技师)</Option>
            <Option value="职业资格二级(技师)">职业资格二级(技师)</Option>
            <Option value="职业资格三级(高级)">职业资格三级(高级)</Option>
            <Option value="职业资格四级(中级)">职业资格四级(中级)</Option>
            <Option value="职业资格五级(初级)">职业资格五级(初级)</Option>
          </Select>)}
        </FormItem> : text
      ),
    },
  ]
  const pagination = {
    pageSize: 1000
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Card>
          <p>班级名称：{item.classname}</p>
        </Card>
        <p className={styles.formLabel}><Icon type="file-text" /> 学员信息</p>
        <div className={classnames(styles.formFields, styles.formTable)}>
          <Table
            dataSource={currentStudents}
            bordered
            columns={columns}
            simple
            size="small"
            rowKey={record => record.studentId}
            pagination={pagination}
            rowSelection={rowSelection}
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
  currentStudents: PropTypes.array,
  modalType: PropTypes.string,
  rowSelection: PropTypes.object,
  onLedgerOk: PropTypes.func,
  selectedRowKeysStudent: PropTypes.array,
}

export default Form.create()(modal)
