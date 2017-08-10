import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Icon } from 'antd'
import { config } from 'utils'
import styles from './index.less'

const FormItem = Form.Item

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { loginLoading } = login

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  return (
    <div className={styles.background}>
      <div className={styles.panel}>
        <div className={styles.title}>
          <h1>{config.name}</h1>
          <h2>{config.namesub}</h2>
        </div>
        <div className={styles.form}>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(<Input size="large"
                onPressEnter={handleOk}
                prefix={<Icon type="user" />}
                placeholder="Username"
              />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ],
              })(<Input size="large"
                type="password"
                onPressEnter={handleOk}
                prefix={<Icon type="lock" />}
                placeholder="Password"
              />)}
            </FormItem>
            <Row>
              <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
                登录
              </Button>
            </Row>

          </form>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
