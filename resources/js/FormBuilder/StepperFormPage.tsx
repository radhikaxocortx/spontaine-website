import { BreadcrumbItemLink } from '@/components/CustomUI/BreadCrumb'
import CardHeader from '@/components/CustomUI/Card/CardHeader'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import useInertiaPost from '@/hooks/useInertiaPost'
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import FormBuilder, { FormItem } from './FormBuilder'

// Step interface to define the structure of each form step
interface Step<T extends Record<string, any>, U extends keyof T> {
  title: string
  fields: readonly U[]
  validationRules?: Partial<Record<U, (value: T[U]) => boolean>>
  requiredFields?: U[]
}

interface Props<
  T extends Record<string, any>,
  U extends keyof T,
  K extends keyof L,
  G extends keyof L,
  L extends Record<K, string | number> & Record<G, string | number | null>,
> {
  url: string
  formData: T
  formStyles?: string
  formItems: Record<U, FormItem<T[U], K, G, L>>
  steps: readonly Step<T, U>[]
  title: string
  backUrl?: string
  onBackClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  addUrl?: string
  onAddClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  editUrl?: string
  onEditClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  deleteUrl?: string
  onDeleteClick?: (e?: React.MouseEvent<HTMLButtonElement>) => unknown
  customSubmitData?: Partial<T>
  isPatchRequest?: boolean
  buttonText?: string
  children?: React.ReactNode
  hideSubmitButton?: boolean
  breadCrumbs?: BreadcrumbItemLink[]
  selectedHeading?: string
  onStepChange?: (step: number) => void
}

export default function StepperFormPage<
  T extends Record<string, any>,
  U extends keyof T,
  K extends keyof L,
  G extends keyof L,
  L extends Record<K, string | number> & Record<G, string | number | null>,
>({
  url,
  formStyles,
  formItems,
  formData,
  steps,
  title,
  backUrl,
  editUrl,
  onBackClick,
  onEditClick,
  deleteUrl,
  onDeleteClick,
  onAddClick,
  addUrl,
  customSubmitData,
  buttonText,
  breadCrumbs,
  isPatchRequest = false,
  children,
  hideSubmitButton = false,
  onStepChange,
}: Readonly<Props<T, U, K, G, L>>) {
  const { post, loading, errors } = useInertiaPost<T>(url)
  const [currentStep, setCurrentStep] = useState(0)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<U, string>>>({})

  const cardRef = useRef<HTMLDivElement>(null)

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100

  const validateStep = (): boolean => {
    const currentStepData = steps[currentStep]
    const newErrors: Partial<Record<U, string>> = {}

    // Check required fields
    if (currentStepData.requiredFields) {
      currentStepData.requiredFields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = 'This field is required'
        }
      })
    }

    // Check validation rules
    if (currentStepData.validationRules) {
      Object.entries(currentStepData.validationRules).forEach(([field, validator]) => {
        const value = formData[field as U]
        if (value && !(validator as (value: T[U]) => boolean)(value)) {
          let errorMessage = 'Invalid value'
          // Custom error messages based on field type
          switch (field) {
            case 'email':
              errorMessage = 'Please enter a valid email address'
              break
            case 'telephone':
              errorMessage = 'Please enter a valid phone number'
              break
            case 'password':
              errorMessage = 'Password must be at least 8 characters'
              break
            case 'retype_password':
              errorMessage = 'Passwords do not match'
              break
          }
          newErrors[field as U] = errorMessage
        }
      })
    }

    setFieldErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // If not on the last step, move to next step
    if (currentStep < steps.length - 1) {
      if (!validateStep()) {
        return
      }

      // Check if we're on the address details step and have_company is false
      if (currentStep === 1 && formData.have_company === false) {
        // Skip company information step and go directly to account security
        setCurrentStep((prev) => {
          const newStep = prev + 2
          onStepChange?.(newStep)
          return newStep
        })
      } else {
        setCurrentStep((prev) => {
          const newStep = prev + 1
          onStepChange?.(newStep)
          return newStep
        })
      }
      return
    }

    // On last step, submit the form
    const data = customSubmitData ?? formData
    const method = isPatchRequest ? 'PATCH' : 'POST'
    post({
      ...data,
      _method: method,
    } as T & { _method: string })
  }

  const handlePreviousStep = () => {
    setCurrentStep((prev) => {
      let newStep = prev - 1

      // If we're on Account Security step and have_company is false, go back to Address Details
      if (prev === 3 && formData.have_company === false) {
        newStep = 1
      }

      onStepChange?.(newStep)
      return newStep
    })
  }

  const handleCardRef = useCallback(() => {
    if (cardRef.current == null) {
      return
    }
    cardRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Filter form items for current step
  const currentStepFields = steps[currentStep].fields
  const currentFormItems = Object.fromEntries(
    Object.entries(formItems)
      .filter(([key]) => currentStepFields.includes(key as U))
      .map(([key, item]) => {
        const isRequired = steps[currentStep].requiredFields?.includes(key as U)
        return [
          key,
          {
            ...item,
            label: isRequired ? (
              <span>
                {item.label} <span className='text-red-500'>*</span>
              </span>
            ) : (
              item.label
            ),
            error: fieldErrors[key as U],
            className: fieldErrors[key as U] ? 'border-red-500' : '',
          },
        ]
      })
  ) as Record<U, FormItem<T[U], K, G, L> & { error?: string; className?: string }>

  useEffect(() => {
    console.log(fieldErrors)
  }, [fieldErrors])

  return (
    <div className=''>
      <div ref={cardRef}>
        <Card>
          <div className='flex flex-col gap-5 p-2'>
            <CardHeader
              title={title}
              backUrl={backUrl}
              editUrl={editUrl}
              onBackClick={onBackClick}
              onEditClick={onEditClick}
              deleteUrl={deleteUrl}
              onDeleteClick={onDeleteClick}
              addUrl={addUrl}
              onAddClick={onAddClick}
              breadCrumb={breadCrumbs}
            />

            {/* Stepper Progress */}
            <div className='px-5'>
              <div className='mb-4'>
                <Progress
                  value={progress}
                  className='h-2'
                />
              </div>
              <h3 className='text-primary mb-4 text-lg font-semibold'>
                {steps[currentStep].title}
              </h3>
            </div>

            <div className='flex flex-col p-5'>
              <FormBuilder
                formStyles={formStyles}
                formData={formData}
                onFormSubmit={handleSubmit}
                formItems={currentFormItems}
                loading={loading}
                errors={fieldErrors as Record<string, string | undefined>}
                hideSubmitButton={true}
              >
                <div className='col-span-2 flex flex-row justify-end gap-4'>
                  {currentStep > 0 && (
                    <Button
                      type='button'
                      onClick={handlePreviousStep}
                      variant='outline'
                    >
                      Previous
                    </Button>
                  )}
                  <Button type='submit'>
                    {currentStep === steps.length - 1 ? buttonText : 'Next'}
                  </Button>
                </div>
                {children}
              </FormBuilder>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
