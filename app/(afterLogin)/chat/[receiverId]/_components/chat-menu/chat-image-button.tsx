import { Image } from 'lucide-react'
import React from 'react'

export default function ChatImageButton(): JSX.Element {
  const handleSelectImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()

    input.addEventListener('change', () => {
      const file = input.files?.[0]
      if (file) {
        console.log(file)
      }
    })
  }

  return (
    <button
      aria-label='이미지 선택'
      className='flex flex-col items-center justify-center rounded hover:bg-neutral-100'
      type='button'
      onClick={handleSelectImage}
    >
      <Image />
      <span>이미지</span>
    </button>
  )
}
