import type { Language } from '@/components/ui/ui_interfaces'
import { cn } from '@/lib/utils'
import React from 'react'
import type { BlocKFieldInfo } from '../../Components/BlockEditor/BlockEditor'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import type { PageBuilderAction } from '../../hooks/pageBuilderService'
import ContactContent from './ContactUS/ContactContent'
import ContactEditPanel from './ContactUS/ContactEditPanel'
import ContactForm from './ContactUS/ContactForm'
import ContactLoadingOverlay from './ContactUS/ContactLoadingOverlay'
import type { ContactUsBlockInterface } from './ContactUS/types'
import { useContactFormState } from './ContactUS/useContactFormState'
import { useContactReveal } from './ContactUS/useContactReveal'
import { useContactSectionModel } from './ContactUS/useContactSectionModel'

export type { ContactUsBlockInterface }

interface Properties {
  editMode?: boolean
  onFieldEdit?: (field: BlocKFieldInfo) => void
  blockData?: ContactUsBlockInterface
  language?: Language
  dispatch?: React.Dispatch<PageBuilderAction>
}

const ContactUS = ({
  editMode = false,
  onFieldEdit,
  blockData,
  language = 'en',
  dispatch,
}: Properties) => {
  const sectionRef = React.useRef<HTMLElement>(null)
  const model = useContactSectionModel(blockData, language)
  const formState = useContactFormState(blockData)

  useContactReveal(sectionRef, editMode)

  return (
    <V3RoundedSectionBlockFrame
      ref={sectionRef}
      roundedTop={model.hasRoundedTop}
      overlapTop={model.hasTopOverlap}
      className={cn(
        'relative w-full overflow-hidden bg-hero-wash',
        model.sectionPaddingClass,
        !model.hasRoundedTop && blockData?.paddingTop,
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingBottom
      )}
      style={model.sectionStyle}
    >
      <ContactLoadingOverlay loading={formState.loading} />

      <div className='relative z-10 mx-auto grid w-full max-w-[1180px] items-start gap-10 px-[var(--space-shell-sm)] md:px-[var(--space-shell)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
        <ContactContent
          blockData={blockData}
          editMode={editMode}
          language={language}
          model={model}
          onFieldEdit={onFieldEdit}
        />
        <ContactForm formState={formState} />
        {editMode && (onFieldEdit || dispatch) && (
          <ContactEditPanel
            blockData={blockData}
            dispatch={dispatch}
            language={language}
            onFieldEdit={onFieldEdit}
          />
        )}
      </div>
    </V3RoundedSectionBlockFrame>
  )
}

export default ContactUS
