interface Properties {
  onClick: () => void
  label: string
}

const AddLabel = ({ label, onClick }: Properties) => {
  return (
    <div
      className='md:text-md hover:text-info-500 cursor-pointer text-sm text-indigo-600'
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='inline h-5 w-5'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
          clipRule='evenodd'
        />
      </svg>
      <h5 className='mb-2 inline font-semibold underline'>{label}</h5>
    </div>
  )
}
export default AddLabel
