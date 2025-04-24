import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import FormBuilder, { FormItem } from '@/FormBuilder/FormBuilder'
import { useState } from 'react'

interface StepperFormProps<
  T,
  U extends keyof T,
  K extends keyof L,
  G extends keyof L,
  L extends Record<K, string | number> & Record<G, string | number | null>,
> {
  steps: {
    title: string
    formItems: Record<U, FormItem<T[U], K, G, L>>
  }[]
  formData: T
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  loading?: boolean
  errors?: Record<U, string | undefined>
  buttonText?: string
  formStyles?: string
}

export default function StepperForm<
  T,
  U extends keyof T,
  K extends keyof L,
  G extends keyof L,
  L extends Record<K, string | number> & Record<G, string | number | null>,
>({
  steps,
  formData,
  onFormSubmit,
  loading = false,
  errors,
  buttonText = 'Submit',
  formStyles = '',
}: StepperFormProps<T, U, K, G, L>) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-primary text-xl font-semibold'>{steps[currentStep].title}</h2>
          <span className='text-muted-foreground text-sm'>
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress
          value={progress}
          className='h-2'
        />
      </div>

      <Card className='p-6'>
        <FormBuilder
          formData={formData}
          onFormSubmit={(e) => {
            e.preventDefault()
            if (isLastStep) {
              onFormSubmit(e)
            } else {
              handleNext()
            }
          }}
          formItems={steps[currentStep].formItems}
          loading={loading}
          errors={errors}
          buttonText={isLastStep ? buttonText : 'Next'}
          formStyles={formStyles}
          hideSubmitButton={true}
        >
          <div className='col-span-2 mt-6 flex justify-end gap-4'>
            {currentStep > 0 ? (
              <Button
                type='button'
                variant='outline'
                onClick={handlePrevious}
                className='min-w-[100px]'
              >
                Previous
              </Button>
            ) : (
              <div>{/* Empty div to maintain layout when no Previous button */}</div>
            )}
            <Button
              type='button'
              onClick={(e) => {
                if (isLastStep) {
                  onFormSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
                } else {
                  handleNext()
                }
              }}
              disabled={loading}
              className='min-w-[100px]'
            >
              {isLastStep ? buttonText : 'Next'}
            </Button>
          </div>
        </FormBuilder>
      </Card>
    </div>
  )
}
