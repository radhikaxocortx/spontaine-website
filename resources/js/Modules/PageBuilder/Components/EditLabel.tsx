import { MouseEvent } from 'react'

interface Properties {
  onClick: (event: MouseEvent<HTMLElement>) => void
  label?: string
}

const EditLabel = ({ onClick, label = 'Edit' }: Properties) => {
  return (
    <button
      onClick={onClick}
      className='text-info-600 hover:text-info-700 cursor-pointer font-normal hover:font-semibold'
    >
      [{label}]
    </button>
  )
}

export default EditLabel
