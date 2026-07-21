import FullSpinner from '@/components/CustomUI/FullSpinner'

interface ContactLoadingOverlayProps {
  loading: boolean
}

const ContactLoadingOverlay = ({ loading }: ContactLoadingOverlayProps) => {
  if (!loading) {
    return null
  }

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm'>
      <span className='sr-only'>Submitting contact form</span>
      <FullSpinner />
    </div>
  )
}

export default ContactLoadingOverlay
