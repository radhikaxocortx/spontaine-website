import styles from './RichTextDisplay.module.css'

interface RichTextDisplayProps {
  data?: string | null
}

const RichTextDisplay = ({ data }: RichTextDisplayProps) => {
  return (
    <div
      className={`${styles['mce-content-body']} w-full`}
      dangerouslySetInnerHTML={{
        __html: data ?? '',
      }}
    ></div>
  )
}

export default RichTextDisplay
