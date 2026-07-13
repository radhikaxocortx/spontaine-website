import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

type TextElement = keyof JSX.IntrinsicElements

type PolymorphicTextProps<TElement extends TextElement> = {
  as?: TElement
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<TElement>, 'as' | 'className' | 'children'>

const displayVariants = cva('font-spontaine-ui text-spontaineDesign-ink-900', {
  variants: {
    size: {
      '2xl': 'text-spontaine-display-2xl',
      xl: 'text-spontaine-display-xl',
      lg: 'text-spontaine-display-lg',
      md: 'text-spontaine-display-md',
      sm: 'text-spontaine-display-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const bodyVariants = cva('font-spontaine-ui text-spontaineDesign-ink-700', {
  variants: {
    size: {
      lg: 'text-spontaine-body-lg',
      md: 'text-spontaine-body-md',
      sm: 'text-spontaine-body-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const labelVariants = cva('font-spontaine-ui text-spontaine-label uppercase text-spontaineDesign-accent-ink')

const monoDataVariants = cva('font-spontaine-data text-spontaine-mono-data text-spontaineDesign-ink-700')

const finePrintVariants = cva('font-spontaine-fine text-spontaine-fine-print text-spontaineDesign-ink-700')

export const textVariants = {
  display: displayVariants,
  body: bodyVariants,
  label: labelVariants,
  monoData: monoDataVariants,
  finePrint: finePrintVariants,
}

export type DisplayProps<TElement extends TextElement = 'h2'> = PolymorphicTextProps<TElement> &
  VariantProps<typeof displayVariants>

export function Display<TElement extends TextElement = 'h2'>({
  as,
  className,
  size,
  children,
  ...props
}: DisplayProps<TElement>) {
  const Component = (as ?? 'h2') as React.ElementType

  return (
    <Component className={cn(displayVariants({ size }), className)} {...props}>
      {children}
    </Component>
  )
}

export type BodyProps<TElement extends TextElement = 'p'> = PolymorphicTextProps<TElement> &
  VariantProps<typeof bodyVariants>

export function Body<TElement extends TextElement = 'p'>({
  as,
  className,
  size,
  children,
  ...props
}: BodyProps<TElement>) {
  const Component = (as ?? 'p') as React.ElementType

  return (
    <Component className={cn(bodyVariants({ size }), className)} {...props}>
      {children}
    </Component>
  )
}

export type LabelProps<TElement extends TextElement = 'span'> = PolymorphicTextProps<TElement>

export function Label<TElement extends TextElement = 'span'>({
  as,
  className,
  children,
  ...props
}: LabelProps<TElement>) {
  const Component = (as ?? 'span') as React.ElementType

  return (
    <Component className={cn(labelVariants(), className)} {...props}>
      {children}
    </Component>
  )
}

export type MonoDataProps<TElement extends TextElement = 'span'> = PolymorphicTextProps<TElement>

export function MonoData<TElement extends TextElement = 'span'>({
  as,
  className,
  children,
  ...props
}: MonoDataProps<TElement>) {
  const Component = (as ?? 'span') as React.ElementType

  return (
    <Component className={cn(monoDataVariants(), className)} {...props}>
      {children}
    </Component>
  )
}

export type FinePrintProps<TElement extends TextElement = 'p'> = PolymorphicTextProps<TElement>

export function FinePrint<TElement extends TextElement = 'p'>({
  as,
  className,
  children,
  ...props
}: FinePrintProps<TElement>) {
  const Component = (as ?? 'p') as React.ElementType

  return (
    <Component className={cn(finePrintVariants(), className)} {...props}>
      {children}
    </Component>
  )
}
