import React from 'react'

interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export default function ChatContainer({
  children,
  ...props
}: ChatContainerProps): JSX.Element {
  return (
    <div
      className='flex flex-col bg-white h-full w-full p-4 gap-4 overflow-y-auto'
      {...props}
    >
      {children}
    </div>
  )
}
