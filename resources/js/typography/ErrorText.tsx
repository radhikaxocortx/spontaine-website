interface Props {
  className?: string
  children?: string
}

export default function ErrorText({ children, className = '' }: Props) {
  return <div className={`mt-1 text-sm font-medium text-red-600 ${className}`}>{children}</div>
}
