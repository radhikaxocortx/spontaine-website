import styles from './RichTextDisplay.module.css'

interface RichTextDisplayProps {
  data?: string | null
}

const RichTextDisplay = ({ data }: RichTextDisplayProps) => {
  return (
    <div
      className={`${styles['mce-content-body']} prose prose-lg w-full max-w-none [&_blockquote]:my-6 [&_blockquote]:ml-0 [&_blockquote]:border-l-4 [&_blockquote]:border-[#61B03E] [&_blockquote]:pl-4 [&_blockquote]:font-space-grotesk [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_em]:font-space-grotesk [&_em]:italic [&_em]:text-gray-700 [&_h1]:font-urbanist [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h2]:font-urbanist [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h3]:font-urbanist [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h4]:font-urbanist [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-gray-900 [&_li]:font-space-grotesk [&_li]:text-gray-700 [&_p]:font-space-grotesk [&_p]:leading-relaxed [&_p]:text-gray-700 [&_span]:font-space-grotesk [&_span]:text-gray-700 [&_strong]:font-space-grotesk [&_strong]:font-bold [&_strong]:text-gray-900`}
      dangerouslySetInnerHTML={{
        __html: data ?? '',
      }}
    ></div>
  )
}

export default RichTextDisplay
