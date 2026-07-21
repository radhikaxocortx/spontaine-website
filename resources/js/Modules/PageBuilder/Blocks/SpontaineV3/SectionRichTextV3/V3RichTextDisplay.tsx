import { cn } from '@/lib/utils'

const V3RichTextDisplay = ({ className, data }: { className?: string; data?: string | null }) => (
  <div
    className={cn(
      'w-full max-w-none font-body text-[15.5px] leading-[1.65] text-spontaine-text-secondary',
      '[&_a]:text-spontaine-text-accent-dark [&_a]:underline',
      '[&_blockquote]:my-5 [&_blockquote]:ml-0 [&_blockquote]:break-inside-avoid [&_blockquote]:border-l-[3px] [&_blockquote]:border-spontaine-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-spontaine-text-secondary',
      '[&_h1]:mb-4 [&_h1]:mt-0 [&_h1]:break-inside-avoid [&_h1]:font-display [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:leading-none [&_h1]:tracking-[-0.04em] [&_h1]:text-spontaine-text-primary',
      '[&_h2]:mb-[14px] [&_h2]:mt-0 [&_h2]:break-inside-avoid [&_h2]:font-display [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-[1.08] [&_h2]:tracking-[-0.02em] [&_h2]:text-spontaine-text-primary',
      '[&_h3]:mb-2.5 [&_h3]:mt-[22px] [&_h3]:break-inside-avoid [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-spontaine-text-primary',
      '[&_li]:mb-2 [&_li]:break-inside-avoid [&_li]:text-spontaine-text-secondary',
      '[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5',
      '[&_p]:mb-4 [&_p]:mt-0 [&_p]:text-spontaine-text-secondary',
      '[&_strong]:font-semibold [&_strong]:text-spontaine-text-primary',
      '[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5',
      className
    )}
    dangerouslySetInnerHTML={{ __html: data ?? '' }}
  />
)

export default V3RichTextDisplay
