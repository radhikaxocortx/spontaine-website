import type { PageBuilderAction } from '@/Modules/PageBuilder/hooks/pageBuilderService'
import type { TextData } from '@/Modules/PageBuilder/page_interfaces'
import type { Language } from '@/Modules/PageBuilder/Pages/PageBuilder'
import type React from 'react'
import EditLabel from './EditLabel'
import { displayText } from './Localization'

interface V3RoundedTopToggleProps {
  blockId?: number
  dispatch?: React.Dispatch<PageBuilderAction>
  language?: Language
  overlapTop?: TextData
  roundedTop?: TextData
}

export const getV3RoundedTopValue = (enabled: boolean): TextData => ({
  english: enabled ? 'true' : 'false',
  malayalam: '',
})

export const isV3RoundedTopEnabled = (roundedTop?: TextData, language: Language = 'en') =>
  displayText(roundedTop, language) === 'true'

export const isV3TopOverlapEnabled = (overlapTop?: TextData, language: Language = 'en') =>
  displayText(overlapTop, language) === 'true'

const V3RoundedTopToggle = ({
  blockId,
  dispatch,
  language = 'en',
  overlapTop,
  roundedTop,
}: V3RoundedTopToggleProps) => {
  if (blockId == null || dispatch == null) {
    return null
  }

  const enabled = isV3RoundedTopEnabled(roundedTop, language)
  const overlapEnabled = isV3TopOverlapEnabled(overlapTop, language)

  return (
    <>
      <EditLabel
        label={enabled ? 'Disable Rounded Top' : 'Enable Rounded Top'}
        onClick={() => {
          dispatch({
            action: 'UPDATE_BLOCK_FIELD',
            blockId,
            fieldName: 'roundedTop',
            fieldValue: getV3RoundedTopValue(!enabled),
          })

          if (enabled && overlapEnabled) {
            dispatch({
              action: 'UPDATE_BLOCK_FIELD',
              blockId,
              fieldName: 'overlapTop',
              fieldValue: getV3RoundedTopValue(false),
            })
          }
        }}
      />
      {enabled && (
        <EditLabel
          label={overlapEnabled ? 'Disable Top Overlap' : 'Enable Top Overlap'}
          onClick={() =>
            dispatch({
              action: 'UPDATE_BLOCK_FIELD',
              blockId,
              fieldName: 'overlapTop',
              fieldValue: getV3RoundedTopValue(!overlapEnabled),
            })
          }
        />
      )}
    </>
  )
}

export default V3RoundedTopToggle
