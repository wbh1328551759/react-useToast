/** @format */

import React, {useState} from 'react'
import {createPortal} from 'react-dom'
import ToastItem from '../components/ToastItem'

export interface ToastConfig {
  title: string
  text: string
  delay?: number | boolean
  icon: 'success' | 'error' | string
  closeIcon?: string
  key: string
}

export interface ToastState extends ToastConfig {
  id: string | number
}

export const useToast = () => {
  const [toastList, setToastList] = useState<ToastState[]>([])

  const showToast = ({title, text, key, icon, closeIcon, delay = 5}: ToastConfig) => {
    setToastList([
      ...toastList,
      {
        title,
        text,
        delay,
        icon,
        closeIcon,
        key,
        id: key,
      },
    ])
  }
  const onCloseItem = (id: string | number) => {
    setToastList(toastList => [
      ...toastList.filter(t => t.id !== id)
    ])
  }

  const renderToast = () =>
    createPortal(
      <div className={'absolute top-4 right-4 '}>
        {toastList.map(t => (
          <ToastItem
            id={t.key}
            title={t.title}
            text={t.text}
            icon={t.icon}
            closeIcon={t.closeIcon}
            key={t.key}
            delay={t.delay}
            toastList={toastList}
            onClose={onCloseItem}
          />
        ))}
      </div>,
      document.getElementById('root')!,
    )

  return {showToast, renderToast}
}
