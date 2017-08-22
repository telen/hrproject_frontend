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
        <p className={styles.formLabel}><Icon type="file-text" /> 人员基本情况</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="公民身份证号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('ID', {
                  initialValue: item.ID,
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
                      type: 'boolean',
                    },
                  ],
                })(<Radio.Group>
                  <Radio value>男</Radio>
                  <Radio value={false}>女</Radio>
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
              <FormItem label="出生日期" hasFeedback {...formItemLayout}>
                {getFieldDecorator('birthday', {
                  initialValue: item.birthday,
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

          <Row style={{ textAlign: 'right' }}>
            <Col>
              <Button type="primary">读取身份证信息</Button>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="婚姻状况" hasFeedback {...formItemLayout}>
                {getFieldDecorator('isMarried', {
                  initialValue: item.isMarried,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Select>
                  <Option value="yes">已婚</Option>
                  <Option value="no">未婚</Option>
                  <Option value="divoced">离异</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="政治面貌" hasFeedback {...formItemLayout}>
                {getFieldDecorator('polity', {
                  initialValue: item.polity,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Select>
                  <Option value="people">群众</Option>
                  <Option value="gongchandang">共产党员</Option>
                  <Option value="others">其他政党</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="是否参保" hasFeedback {...formItemLayout}>
                {getFieldDecorator('isInsured', {
                  initialValue: item.isInsured,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Select>
                  <Option value="yes">是</Option>
                  <Option value="no">否</Option>
                </Select>)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <FormItem label="手机号码" hasFeedback {...formItemLayout}>
                {getFieldDecorator('phone', {
                  initialValue: item.phone,
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
              <FormItem label="邮箱" hasFeedback {...formItemLayout}>
                {getFieldDecorator('email', {
                  initialValue: item.email,
                  rules: [
                    {
                      required: false,
                      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                      message: 'The input is not valid E-mail!',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="登记就/失业状态" hasFeedback {...formItemLayout}>
                {getFieldDecorator('isEmployed', {
                  initialValue: item.isEmployed,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Select>
                  <Option value="yes">就业</Option>
                  <Option value="no">失业</Option>
                </Select>)}
              </FormItem>
            </Col>
          </Row>
        </div>

        <p className={styles.formLabel}><Icon type="file-text" /> 补充信息</p>
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
              <FormItem label="所学专业" hasFeedback {...formItemLayout}>
                {getFieldDecorator('major', {
                  initialValue: item.major,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="毕业院校" hasFeedback {...formItemLayout}>
                {getFieldDecorator('school', {
                  initialValue: item.school,
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
              <FormItem label="户口性质" hasFeedback {...formItemLayout}>
                {getFieldDecorator('residence', {
                  initialValue: item.residence,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Select>
                  <Option value="50">居民户</Option>
                  <Option value="40">外籍人士</Option>
                  <Option value="30">台港澳人员</Option>
                  <Option value="22">外地农业户口(外地农村)</Option>
                  <Option value="21">本地农业户口(本地农村)</Option>
                  <Option value="20">农业户口(农村)</Option>
                  <Option value="12">外地非农业户口(外地城镇)</Option>
                  <Option value="11">本地非农业户口(本地城镇)</Option>
                  <Option value="10">非农业户口(城镇)</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="户口所在地" hasFeedback {...formItemLayout}>
                {getFieldDecorator('hometown', {
                  initialValue: item.hometown && item.hometown.split(' '),
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Cascader
                  size="large"
                  style={{ width: '100%' }}
                  options={city}
                  placeholder="选择地区"
                />)}
              </FormItem>
            </Col>
          </Row>
        </div>

        <p className={styles.formLabel}><Icon type="file-text" /> 补贴信息</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="银行户名" hasFeedback {...formItemLayout}>
                {getFieldDecorator('bankAccountName', {
                  initialValue: item.bankAccountName,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="开户银行" hasFeedback {...formItemLayout}>
                {getFieldDecorator('bank', {
                  initialValue: item.bank,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="银行账号" hasFeedback {...formItemLayout}>
                {getFieldDecorator('bankAccount', {
                  initialValue: item.bankAccount,
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
              <FormItem label="入学日期" hasFeedback {...formItemLayout}>
                {getFieldDecorator('schoolDate', {
                  initialValue: item.schoolDate,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<DatePicker format={dateFormat} />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="人员类别" hasFeedback {...formItemLayout}>
                {getFieldDecorator('school', {
                  initialValue: item.school,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Select>
                  <Option value="1">城镇登记失业人员</Option>
                  <Option value="2">农村转移就业劳动者</Option>
                  <Option value="3">毕业年度高校毕业生</Option>
                  <Option value="4">城乡未继续升学的应届初高中毕业生</Option>
                  <Option value="5">监狱服刑人员</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="缴纳学费" hasFeedback {...formItemLayout}>
                {getFieldDecorator('tuition', {
                  initialValue: item.tuition,
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
              <FormItem label="补贴标准" hasFeedback {...formItemLayout}>
                {getFieldDecorator('subsidyCode', {
                  initialValue: item.subsidyCode,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="支付对象" hasFeedback {...formItemLayout}>
                {getFieldDecorator('subsidyTarget', {
                  initialValue: item.subsidyTarget,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Select>
                  <Option value="agency">培训机构</Option>
                  <Option value="person">个人</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="是否中途退学" hasFeedback {...formItemLayout}>
                {getFieldDecorator('isDropout', {
                  initialValue: item.isDropout,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="退学日期" hasFeedback {...formItemLayout}>
                {getFieldDecorator('dropout', {
                  initialValue: item.dropout,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<DatePicker format={dateFormat} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="是否有培训证书" hasFeedback {...formItemLayout}>
                {getFieldDecorator('hasCertificate', {
                  initialValue: item.hasCertificate,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="培训证书等级" hasFeedback {...formItemLayout}>
                {getFieldDecorator('certificateLevel', {
                  initialValue: item.certificateLevel,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Select>
                  <Option value="1">职业资格一级(高级技师)</Option>
                  <Option value="2">职业资格二级(技师)</Option>
                  <Option value="3">职业资格三级(高级)</Option>
                  <Option value="4">职业资格四级(中级)</Option>
                  <Option value="5">职业资格五级(初级)</Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="培训证书名称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('certificate', {
                  initialValue: item.certificate,
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
              <FormItem label="是否使用培训券" hasFeedback {...formItemLayout}>
                {getFieldDecorator('isUsingCoupon', {
                  initialValue: item.isUsingCoupon,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="培训券号码" hasFeedback {...formItemLayout}>
                {getFieldDecorator('copuonNum', {
                  initialValue: item.copuonNum,
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
              <FormItem label="是否企业录用员工" hasFeedback {...formItemLayout}>
                {getFieldDecorator('isCompact', {
                  initialValue: item.isCompact,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="合同期限（年）" hasFeedback {...formItemLayout}>
                {getFieldDecorator('compact', {
                  initialValue: item.compact,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<InputNumber />)}
              </FormItem>
            </Col>
          </Row>
        </div>


        <p className={styles.formLabel}><Icon type="file-text" /> 选择课程</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>
              <FormItem label="选择课程" hasFeedback {...formItemLayout}>
                {getFieldDecorator('classname', {
                  initialValue: item.classname,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Select>
                  <Option value="1">市场营销</Option>
                  <Option value="2">美容美发</Option>
                  <Option value="3">厨师</Option>
                  <Option value="4">挖掘机</Option>
                  <Option value="5">钣金喷漆</Option>
                </Select>)}
              </FormItem>
            </Col>
          </Row>
        </div>

        <p className={styles.formLabel}><Icon type="file-text" /> 补充信息</p>
        <div className={styles.formFields}>
          <Row>
            <Col span={8}>

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
