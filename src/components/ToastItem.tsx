import React, { useEffect, useMemo } from "react";
import defaultCloseIcon from '../assets/close.svg'
import SuccessIcon from '../assets/success.svg'
import ErrorIcon from '../assets/error.svg'
import {ToastState} from '../hooks/useToast'

interface Props extends ToastState {
  toastList: ToastState[]
  onClose: (id: string | number) => void
  id: string | number
}

const ToastItem: React.FC<Props> = ({title, text, delay, icon, closeIcon, id, toastList, onClose}: Props) => {
  const delayTime = useMemo(() => {
    if (typeof delay === 'number') {
      return delay * 1000
    }
    return undefined
  }, [delay])

  const toastIcon = useMemo(() => {
    switch (icon) {
      case 'success':
        return SuccessIcon
      case 'error':
        return ErrorIcon
      default:
        return icon
    }
  }, [icon])

  // @ts-ignore
  useEffect(() => {
    let timeId: number
    if (delayTime) {
      timeId = window.setTimeout(() => onClose(id), delayTime)
    }
    return () => timeId && window.clearTimeout(timeId)
  }, [])

  return (
    <div
      className={
        'transition-all p-5 w-80 mb-4 z-50 shadow flex flex-col items-start border border-solid border-inherit rounded-lg relative'
      }>
      <div className="container-top flex items-center mb-1">
        <img className={'w-6 h-6'} src={toastIcon} alt="" />
        <h2 className={'ml-2 mb-0'}>{title}</h2>
      </div>
      <p className={'mb-0 ml-8'}>{text}</p>
      <img
        onClick={() => onClose(id)}
        className={'w-4 h-4 absolute top-2 right-2 cursor-pointer'}
        src={closeIcon ? closeIcon : defaultCloseIcon}
        alt="close"
      />
    </div>
  )
}

export default ToastItem
