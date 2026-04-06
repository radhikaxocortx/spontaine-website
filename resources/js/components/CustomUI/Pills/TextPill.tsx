import { cn } from '@/lib/utils'

interface TextPillProps {
  readonly text: string
  readonly className?: string
}

const TextPill = ({ text, className }: TextPillProps) => {
  return (
    <span
      className={cn(
        'inline-flex w-fit rounded-full px-4 py-1 font-body text-xs font-bold uppercase',
        className
      )}
    >
      {text}
    </span>
  )
}

export default TextPill
