import React, { useEffect, useState } from 'react'

export interface CountDownProps {
  setPhoneOrEmailOTP: () => void
}

const CountDown = ({ setPhoneOrEmailOTP }: CountDownProps) => {
  const [countdown, setCountdown] = useState<number>(60)
  useEffect(() => {
    if (countdown === 0) {
      // setPhoneOrEmailOTP('expiredOTP')
      setPhoneOrEmailOTP()
      return
    }
    const timeOut = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [countdown, setPhoneOrEmailOTP])
  return <span>{countdown}</span>
}

export default CountDown
