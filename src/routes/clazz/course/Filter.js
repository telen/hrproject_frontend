import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Input, Select } from 'antd'


const Search = Input.Search
const Option = Select.Option

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  onFilterChange,
  onDeleteItems,
  filter,
  teacher,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    console.log(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (value) => {
    let fields = getFieldsValue()
    fields.teacherId = value
    onFilterChange(fields)
  }
  const { agentName } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
    <Row gutter={24} type="flex" justify="space-between">
      <Col {...ColProps} >
        <Button type="primary" style={{ marginRight: 16 }} icon="plus" onClick={onAdd}>添加课程</Button>
        <Button icon="delete" style={{ marginRight: 16 }} onClick={onDeleteItems} >批量删除</Button>
        <Button icon="reload" style={{ marginRight: 16 }} onClick={handleSubmit}>刷新</Button>
      </Col>
      <Col span={4}>
        {getFieldDecorator('teacherId', { initialValue: filter.teacherId || '' })(<Select
          onChange={handleChange}
          allowClear={true}
          placeholder="请选择老师"
          className="ant-input-affix-wrapper">
          {
            teacher.list.map((item) => {
              return <Option key={item.teacherId} value={item.teacherId}>{item.name}</Option>
            })
          }
        </Select>)}
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onDeleteItems: PropTypes.func,
  teacher: PropTypes.object,
}

export default Form.create()(Filter)
