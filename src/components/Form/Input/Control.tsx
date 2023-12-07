import { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ControlProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Control = forwardRef<HTMLInputElement, ControlProps>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={twMerge(
          'flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-400 outline-none focus:ring-0 ',
          props.className,
        )}
      />
    )
  },
)

Control.displayName = 'Control'
