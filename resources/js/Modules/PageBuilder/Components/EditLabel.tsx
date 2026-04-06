import { MouseEvent } from 'react'

interface Properties {
  onClick: (event: MouseEvent<HTMLElement>) => void
  label?: string
}

const EditLabel = ({ onClick, label = 'Edit' }: Properties) => {
  return (
    <button
      onClick={onClick}
      className='cursor-pointer font-normal text-blue-600 hover:font-semibold hover:text-blue-700'
    >
      [{label}]
    </button>
  )
}

export default EditLabel
