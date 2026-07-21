import type { BlocKFieldInfo } from '@/Modules/PageBuilder/Components/BlockEditor/BlockEditor'
import type { TextData } from '@/Modules/PageBuilder/page_interfaces'
import type { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import { displayText } from './Localization'
import EditLabel from './EditLabel'

export const v3BackgroundColorSuggestions = [
  'var(--spontaine-surface-paper)',
  'var(--spontaine-surface-cream)',
  'var(--spontaine-surface-ice)',
  'var(--spontaine-surface-ink)',
  'var(--spontaine-surface-ink-deep)',
  'var(--spontaine-accent-soft)',
  'var(--spontaine-white)',
] as const

export const v3TextColorSuggestions = [
  'var(--spontaine-text-primary)',
  'var(--spontaine-text-secondary)',
  'var(--spontaine-text-tertiary)',
  'var(--spontaine-text-on-dark)',
  'var(--spontaine-text-on-dark-secondary)',
  'var(--spontaine-accent)',
  'var(--spontaine-accent-dark)',
] as const

export const v3ColorHelperText =
  'Use hex, CSS gradients, or V3 tokens such as var(--spontaine-surface-paper), var(--spontaine-surface-cream), var(--spontaine-text-primary), var(--spontaine-accent).'

export const getV3ColorValue = (value?: TextData, language: Language = 'en') => {
  const colorValue = displayText(value, language).trim()

  return colorValue === '' ? undefined : colorValue
}

interface V3ColorControlsProps {
  backgroundColor?: TextData
  descriptionColor?: TextData
  eyebrowColor?: TextData
  onFieldEdit?: (field: BlocKFieldInfo) => void
  textColor?: TextData
  titleOneColor?: TextData
  titleTwoColor?: TextData
}

const emptyColorValue: TextData = {
  english: '',
  malayalam: '',
}

const V3ColorControls = ({
  backgroundColor,
  descriptionColor,
  eyebrowColor,
  onFieldEdit,
  textColor,
  titleOneColor,
  titleTwoColor,
}: V3ColorControlsProps) => {
  if (onFieldEdit == null) {
    return null
  }

  const colorControls = [
    {
      field: 'backgroundColor',
      label: 'Edit Background Color',
      value: backgroundColor,
    },
    {
      field: 'textColor',
      label: 'Edit Text Color',
      value: textColor,
    },
    {
      field: 'eyebrowColor',
      label: 'Edit Eyebrow Color',
      value: eyebrowColor,
    },
    {
      field: 'titleOneColor',
      label: 'Edit Title 1 Color',
      value: titleOneColor,
    },
    {
      field: 'titleTwoColor',
      label: 'Edit Title 2 Color',
      value: titleTwoColor,
    },
    {
      field: 'descriptionColor',
      label: 'Edit Description Color',
      value: descriptionColor,
    },
  ] as const

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-wrap items-center gap-2'>
        <p className='m-0 text-sm font-medium text-spontaine-text-primary'>Section Colors:</p>
        {colorControls.map((control) => (
          <EditLabel
            key={control.field}
            label={control.label}
            onClick={() =>
              onFieldEdit({
                action: 'UPDATE',
                field: control.field,
                fieldType: 'text',
                oldValue: control.value ?? emptyColorValue,
              })
            }
          />
        ))}
      </div>
      <p className='m-0 max-w-[760px] font-body text-xs leading-relaxed text-spontaine-text-secondary'>
        {v3ColorHelperText}
      </p>
    </div>
  )
}

export default V3ColorControls
