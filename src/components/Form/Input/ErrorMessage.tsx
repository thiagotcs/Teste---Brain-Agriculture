import React from 'react'

interface ErrorMessageProps {
  error?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return error ? <p className="text-sm text-red-500">{error}</p> : null
}
