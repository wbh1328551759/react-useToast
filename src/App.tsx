/** @format */

import {Button} from 'antd'
import React from 'react'
import {ToastConfig, useToast} from './hooks/useToast'

let a = 1
const Apps = (): React.ReactElement => {
  const config: ToastConfig = {
    title: 'Toast title',
    text: `this is toast ${a}`,
    icon: 'success',
    key: Math.random().toString(),
    delay: 3,
  }
  const {showToast, renderToast} = useToast()
  return (
    <div>
      {renderToast()}
      <Button
        onClick={() => {
          a += 1
          showToast(config)
        }}>
        显示
      </Button>
    </div>
  )
}

export default Apps
