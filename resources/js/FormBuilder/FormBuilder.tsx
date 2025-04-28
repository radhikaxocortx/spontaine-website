import ActionButton from '@/components/CustomUI/FormFields/ActionButton'
import ComboBox from '@/components/CustomUI/FormFields/ComboBox'
import DatePicker from '@/components/CustomUI/FormFields/DatePicker'
import DynamicSelectList from '@/components/CustomUI/FormFields/DynamicSelectList'
import FileInput from '@/components/CustomUI/FormFields/FileInput'
import InputDescription from '@/components/CustomUI/FormFields/InputDescription'
import InputText from '@/components/CustomUI/FormFields/InputText'
import RadioButton from '@/components/CustomUI/FormFields/RadioButton'
import SelectList from '@/components/CustomUI/FormFields/SelectList'
import TimePicker from '@/components/CustomUI/FormFields/TimePicker'
import FullSpinnerWrapper from '@/components/CustomUI/FullSpinnerWrapper'
import { Checkbox } from '@/components/ui/checkbox'
import NormalText from '@/typography/NormalText'
import { cn } from '@/utils'
import React, { useMemo } from 'react'

export interface FormItem<
  T,
  K extends keyof L,
  G extends keyof L,
  L extends Record<K, string | number> & Record<G, string | number | null>,
> {
  label: string
  setValue: (value: T) => unknown
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'checkbox'
    | 'select'
    | 'dynamicSelect'
    | 'radio'
    | 'textarea'
    | 'date'
    | 'file'
    | 'time'
    | 'autocomplete'
    | 'number'
  hidden?: boolean
  disabled?: boolean
  list?: L[]
  displayKey?: G
  displayKey2?: G
  dataKey?: K
  colPositionAdjustment?: string
  autoCompleteSelection?: L | null
  selectListUrl?: string
  showAllOption?: boolean
  allOptionText?: string
  placeholder?: string
  linkText?: string
  redirectLink?: string
  description?: string
}

interface Props<
  T,
  U extends keyof T,
  K extends keyof L,
  G extends keyof L,
  L extends Record<K, string | number> & Record<G, string | number | null>,
> {
  formData: T
  formStyles?: string
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => unknown
  formItems: Record<U, FormItem<T[U], K, G, L>>
  loading: boolean
  errors?: Record<U, string | undefined>
  buttonText?: string
  buttonAlignment?: 'start' | 'center' | 'end'
  children?: React.ReactNode
  hideSubmitButton?: boolean
  showSecondaryButton?: boolean
  secondaryButtonLabel?: string
  secondaryAction?: () => unknown
}

export default function FormBuilder<
  T,
  U extends keyof T,
  K extends keyof L,
  G extends keyof L,
  L extends Record<K, string | number> & Record<G, string | number | null>,
>({
  formStyles = '',
  formItems,
  formData,
  onFormSubmit,
  loading = false,
  errors,
  buttonText = 'Submit',
  buttonAlignment,
  children,
  hideSubmitButton = false,
  showSecondaryButton = false,
  secondaryButtonLabel = 'Cancel',
  secondaryAction,
}: Readonly<Props<T, U, K, G, L>>) {
  const formStyle = cn('grid w-full grid-cols-1 md:grid-cols-2 gap-5', formStyles)

  const keys: (keyof typeof formItems)[] = useMemo(() => {
    return Object.keys(formItems) as (keyof typeof formItems)[]
  }, [formItems])

  const buttonStyle =
    buttonAlignment === 'center'
      ? 'justify-center'
      : buttonAlignment === 'end'
        ? 'justify-end'
        : 'justify-start'

  return (
    <form
      className={formStyle}
      onSubmit={onFormSubmit}
    >
      {keys.map((keyValue) => (
        <React.Fragment key={keyValue as string}>
          {formItems[keyValue].type === 'text' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <InputText
                value={formData[keyValue] as string | number | undefined}
                label={formItems[keyValue].label}
                setValue={formItems[keyValue].setValue as (value: string) => unknown}
                error={errors != null ? errors[keyValue] : undefined}
                disabled={formItems[keyValue].disabled}
                placeholder={formItems[keyValue].placeholder}
              />
            </div>
          )}
          {formItems[keyValue].type === 'number' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <InputText
                value={formData[keyValue] as string | number | undefined}
                label={formItems[keyValue].label}
                setValue={formItems[keyValue].setValue as (value: string) => unknown}
                type='number'
                error={errors != null ? errors[keyValue] : undefined}
                disabled={formItems[keyValue].disabled}
                placeholder={formItems[keyValue].placeholder}
              />
            </div>
          )}
          {formItems[keyValue].type === 'email' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <InputText
                value={formData[keyValue] as string | number | undefined}
                label={formItems[keyValue].label}
                type='email'
                setValue={formItems[keyValue].setValue as (value: string) => unknown}
                error={errors != null ? errors[keyValue] : undefined}
                disabled={formItems[keyValue].disabled}
                placeholder={formItems[keyValue].placeholder}
              />
            </div>
          )}
          {formItems[keyValue].type === 'password' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <InputText
                value={formData[keyValue] as string | number | undefined}
                label={formItems[keyValue].label}
                type='password'
                setValue={formItems[keyValue].setValue as (value: string) => unknown}
                error={errors != null ? errors[keyValue] : undefined}
                disabled={formItems[keyValue].disabled}
                placeholder={formItems[keyValue].placeholder}
              />
            </div>
          )}
          {formItems[keyValue].type === 'checkbox' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <div className='flex items-center space-x-2'>
                <Checkbox
                  // id={keyValue}
                  checked={formData[keyValue] as boolean}
                  onCheckedChange={(value) => formItems[keyValue].setValue(value)}
                  disabled={formItems[keyValue].disabled}
                />
                <NormalText>{formItems[keyValue].label}</NormalText>
              </div>
            </div>
          )}
          {formItems[keyValue].type === 'textarea' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <InputDescription
                setValue={formItems[keyValue].setValue as (value: string) => unknown}
                value={formData[keyValue] as string}
                label={formItems[keyValue].label}
                error={errors != null ? errors[keyValue] : undefined}
                disabled={formItems[keyValue].disabled}
                placeholder={formItems[keyValue].placeholder}
              />
            </div>
          )}
          {formItems[keyValue].type === 'date' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <DatePicker
                setValue={formItems[keyValue].setValue as (value: string) => unknown}
                value={formData[keyValue] as string}
                label={formItems[keyValue].label}
                error={errors != null ? errors[keyValue] : undefined}
                disabled={formItems[keyValue].disabled}
              />
            </div>
          )}
          {formItems[keyValue].type === 'time' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <TimePicker
                setValue={formItems[keyValue].setValue as (value: string) => unknown}
                value={formData[keyValue] as string}
                label={formItems[keyValue].label}
                error={errors != null ? errors[keyValue] : undefined}
                disabled={formItems[keyValue].disabled}
              />
            </div>
          )}
          {formItems[keyValue].type === 'file' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <FileInput
                setValue={formItems[keyValue].setValue as (value: File | null) => unknown}
                label={formItems[keyValue].label}
                file={formData[keyValue] as File | null}
                error={errors != null ? errors[keyValue] : undefined}
              />
            </div>
          )}
          {formItems[keyValue].type === 'select' &&
            !formItems[keyValue].hidden &&
            formItems[keyValue].list != null &&
            formItems[keyValue].displayKey != null &&
            formItems[keyValue].dataKey != null && (
              <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
                {formItems[keyValue].description != null && (
                  <NormalText>{formItems[keyValue].description}</NormalText>
                )}
                <SelectList
                  list={formItems[keyValue].list}
                  dataKey={formItems[keyValue].dataKey}
                  displayKey={formItems[keyValue].displayKey}
                  setValue={formItems[keyValue].setValue as (value: string) => unknown}
                  value={formData[keyValue] as string | number}
                  label={formItems[keyValue].label}
                  showAllOption={formItems[keyValue].showAllOption}
                  allOptionText={formItems[keyValue].allOptionText}
                  error={errors != null ? errors[keyValue] : undefined}
                  disabled={formItems[keyValue].disabled}
                />
              </div>
            )}
          {formItems[keyValue].type === 'dynamicSelect' &&
            !formItems[keyValue].hidden &&
            formItems[keyValue].selectListUrl != null &&
            formItems[keyValue].displayKey != null &&
            formItems[keyValue].dataKey != null && (
              <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
                {formItems[keyValue].description != null && (
                  <NormalText>{formItems[keyValue].description}</NormalText>
                )}
                <DynamicSelectList
                  url={formItems[keyValue].selectListUrl}
                  dataKey={formItems[keyValue].dataKey as string}
                  displayKey={formItems[keyValue].displayKey as string}
                  setValue={formItems[keyValue].setValue as (value: string) => unknown}
                  value={formData[keyValue] as string | number}
                  label={formItems[keyValue].label}
                  showAllOption={formItems[keyValue].showAllOption}
                  allOptionText={formItems[keyValue].allOptionText}
                  disabled={formItems[keyValue].disabled}
                  error={errors != null ? errors[keyValue] : undefined}
                />
              </div>
            )}
          {formItems[keyValue].type === 'radio' && !formItems[keyValue].hidden && (
            <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
              {formItems[keyValue].description != null && (
                <NormalText>{formItems[keyValue].description}</NormalText>
              )}
              <RadioButton
                list={formItems[keyValue].list}
                dataKey={formItems[keyValue].dataKey}
                displayKey={formItems[keyValue].displayKey}
                setValue={formItems[keyValue].setValue as (value: string | number) => unknown}
                value={formData[keyValue] as string | number}
                label={formItems[keyValue].label}
                error={errors != null ? errors[keyValue] : undefined}
                disabled={formItems[keyValue].disabled}
              />
            </div>
          )}

          {formItems[keyValue].type === 'autocomplete' &&
            !formItems[keyValue].hidden &&
            formItems[keyValue].selectListUrl != null &&
            formItems[keyValue].displayKey != null &&
            formItems[keyValue].dataKey != null && (
              <div className={cn('flex flex-col', formItems[keyValue].colPositionAdjustment ?? '')}>
                {formItems[keyValue].description != null && (
                  <NormalText>{formItems[keyValue].description}</NormalText>
                )}

                <ComboBox
                  value={formItems[keyValue].autoCompleteSelection as L | null}
                  url={formItems[keyValue].selectListUrl}
                  dataKey={formItems[keyValue].dataKey as keyof L}
                  displayKey={formItems[keyValue].displayKey as keyof L}
                  displayValue2={formItems[keyValue].displayKey2 as keyof L | undefined}
                  setValue={formItems[keyValue].setValue as (value: L | null) => unknown}
                  label={formItems[keyValue].label}
                  error={errors != null ? errors[keyValue] : undefined}
                  linkText={formItems[keyValue].linkText}
                  placeholder={formItems[keyValue].placeholder}
                  redirectLink={formItems[keyValue].redirectLink}
                />
              </div>
            )}
        </React.Fragment>
      ))}
      {children}
      {!hideSubmitButton && (
        <div className={cn('col-start-1 flex gap-5', buttonStyle)}>
          <FullSpinnerWrapper processing={loading}>
            <ActionButton label={buttonText} />
            {showSecondaryButton && secondaryAction != null && (
              <ActionButton
                label={secondaryButtonLabel}
                variant='secondary'
                type='button'
                onClick={secondaryAction}
              />
            )}
          </FullSpinnerWrapper>
        </div>
      )}
    </form>
  )
}
