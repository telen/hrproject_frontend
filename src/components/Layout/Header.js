import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Dropdown } from 'antd'
import classnames from 'classnames'
import styles from './Header.less'
import Menus from './Menu'
import { config } from 'utils'

const SubMenu = Menu.SubMenu

const Header = ({ user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu }) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }

  const dropMenu = (
    <Menu onClick={handleClickMenu}>
      <Menu.Item key="logout">
        登  出
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <h1 className={styles.title}>{config.name + config.namesub }</h1>}
      <div className={styles.rightWrapper}>
        <Dropdown overlay={dropMenu}>
          <a className="antd-dropdown-link" href="#">
            {user.userName} <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
