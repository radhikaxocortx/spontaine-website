import { cn } from '@/lib/utils'
import React from 'react'
import type { BlockFieldValues } from '../../Components/BlockEditor/BlockEditor'
import EditLabel from '../../Components/EditLabel'
import V3ColorControls, { getV3ColorValue } from '../../Components/V3ColorControls'
import V3RoundedSectionBlockFrame from '../../Components/V3RoundedSectionBlockFrame'
import V3RoundedTopToggle, {
  isV3RoundedTopEnabled,
  isV3TopOverlapEnabled,
} from '../../Components/V3RoundedTopToggle'
import type { TextData } from '../../page_interfaces'
import useSectionRichTextV3Reveal from './SectionRichTextV3/useSectionRichTextV3Reveal'
import ScriptEmbedDisplay from './SectionScriptEmbedV3/ScriptEmbedDisplay'
import {
  defaultColumnLayout,
  defaultEmbedHtml,
  defaultRightEmbedHtml,
  defaultTitle,
  emptyTextData,
  sectionScriptEmbedV3Block,
  SPONTAINE_V3_SCRIPT_EMBED_BLOCK_NAME,
  type SectionScriptEmbedV3Block,
  type SectionScriptEmbedV3Props,
} from './SectionScriptEmbedV3/types'
import {
  getBlockFieldValue,
  hasTextValue,
  Localization,
  makeTextData,
  readTextValue,
} from './SectionScriptEmbedV3/utils'

export {
  sectionScriptEmbedV3Block,
  SPONTAINE_V3_SCRIPT_EMBED_BLOCK_NAME,
  type SectionScriptEmbedV3Block,
}

const trustedScriptWarning =
  'Trusted scripts can run on the public page. Use only code from providers you trust. Pasted style tags can affect the full page unless selectors are scoped. Copied mockup snippets using .reveal may be auto-revealed in public view.'

const SectionScriptEmbedV3 = ({
  blockData,
  dispatch,
  editMode = false,
  language = 'en',
  onFieldEdit,
}: SectionScriptEmbedV3Props) => {
  const sectionRef = React.useRef<HTMLElement>(null)
  useSectionRichTextV3Reveal(sectionRef, editMode)

  const hasEyebrow = hasTextValue(blockData?.eyebrow, language)
  const hasTitleOne = hasTextValue(blockData?.titleOne, language)
  const hasTitleTwo = hasTextValue(blockData?.titleTwo, language)
  const hasDescription = hasTextValue(blockData?.description, language)
  const hasHeader = hasEyebrow || hasTitleOne || hasTitleTwo || hasDescription
  const hasRoundedTop = isV3RoundedTopEnabled(blockData?.roundedTop, language)
  const hasTopOverlap = isV3TopOverlapEnabled(blockData?.overlapTop, language)
  const columnLayout = readTextValue(blockData?.columnLayout ?? defaultColumnLayout, language)
  const hasTwoColumns = columnLayout === 'two'
  const leftEmbedHtml = readTextValue(blockData?.embedHtml ?? defaultEmbedHtml, language)
  const rightEmbedHtml = readTextValue(blockData?.embedHtmlRight ?? defaultRightEmbedHtml, language)
  const hasLeftEmbedHtml = leftEmbedHtml.trim() !== ''
  const hasRightEmbedHtml = rightEmbedHtml.trim() !== ''

  const backgroundColor = getV3ColorValue(blockData?.backgroundColor, language)
  const textColor = getV3ColorValue(blockData?.textColor, language)
  const eyebrowColor = getV3ColorValue(blockData?.eyebrowColor, language) ?? textColor
  const titleOneColor = getV3ColorValue(blockData?.titleOneColor, language) ?? textColor
  const titleTwoColor = getV3ColorValue(blockData?.titleTwoColor, language) ?? textColor
  const descriptionColor = getV3ColorValue(blockData?.descriptionColor, language) ?? textColor

  const sectionStyle = {
    background: backgroundColor,
  } as React.CSSProperties

  const updateBlockFields = (fields: Record<string, BlockFieldValues>) => {
    if (dispatch == null || blockData?.id == null) {
      return
    }

    dispatch({
      action: 'UPDATE_BLOCK_FIELDS',
      blockId: blockData.id,
      blockData: fields,
    })
  }

  const editTextField = (
    field: keyof SectionScriptEmbedV3Block,
    fallback: TextData = emptyTextData,
    fieldType: 'text' | 'html' = 'text'
  ) => {
    if (onFieldEdit == null) {
      return
    }

    onFieldEdit({
      action: 'UPDATE',
      field: field.toString(),
      fieldType,
      oldValue: getBlockFieldValue<TextData>(blockData, field) ?? fallback,
    })
  }

  const toggleColumns = () => {
    updateBlockFields({
      columnLayout: makeTextData(hasTwoColumns ? 'one' : 'two'),
    })
  }

  const shouldRenderBody = editMode || hasLeftEmbedHtml || (hasTwoColumns && hasRightEmbedHtml)

  return (
    <V3RoundedSectionBlockFrame
      ref={sectionRef}
      roundedTop={hasRoundedTop}
      overlapTop={hasTopOverlap}
      className={cn(
        'relative w-full overflow-hidden py-16 md:py-20 lg:py-24',
        !backgroundColor && 'bg-pagebuilder-hero-wash',
        blockData?.marginTop,
        blockData?.marginBottom,
        blockData?.paddingTop,
        blockData?.paddingBottom
      )}
      style={sectionStyle}
    >
      <div className='relative z-10 mx-auto w-full max-w-[1180px] px-[var(--space-shell-sm)] md:px-[var(--space-shell)]'>
        {(hasHeader || editMode) && (
          <div
            data-v3-rich-text-reveal
            className='mb-10 max-w-[720px] md:mb-14'
          >
            {(hasEyebrow || editMode) && (
              <div className={hasEyebrow ? 'mb-5' : 'mb-3'}>
                {hasEyebrow && (
                  <p
                    className={`m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${eyebrowColor ? 'text-[inherit]' : 'text-spontaine-gray-cool'}`}
                    style={{ color: eyebrowColor }}
                  >
                    <Localization
                      text={blockData?.eyebrow ?? emptyTextData}
                      language={language}
                    />
                  </p>
                )}
                {editMode && onFieldEdit != null && (
                  <EditLabel
                    label='Edit Eyebrow'
                    onClick={() => editTextField('eyebrow')}
                  />
                )}
              </div>
            )}

            {(hasTitleOne || hasTitleTwo || editMode) && (
              <h2 className='m-0 font-display text-3xl font-bold leading-[0.95] tracking-[-0.06em] md:text-4xl lg:text-5xl'>
                {hasTitleOne && (
                  <strong
                    className={`block font-bold leading-[inherit] tracking-[inherit] ${titleOneColor ? 'text-[inherit]' : 'text-spontaine-text-primary'}`}
                    style={{ color: titleOneColor }}
                  >
                    <Localization
                      text={blockData?.titleOne ?? emptyTextData}
                      language={language}
                    />
                  </strong>
                )}
                {hasTitleTwo && (
                  <strong
                    className={`block font-bold leading-[inherit] tracking-[inherit] ${titleTwoColor ? 'text-[inherit]' : 'text-spontaine-text-accent-dark'}`}
                    style={{ color: titleTwoColor }}
                  >
                    <Localization
                      text={blockData?.titleTwo ?? emptyTextData}
                      language={language}
                    />
                  </strong>
                )}
              </h2>
            )}

            {editMode && onFieldEdit != null && (
              <div className='mt-3 flex flex-wrap gap-2'>
                <EditLabel
                  label='Edit Title Line 1'
                  onClick={() => editTextField('titleOne', defaultTitle)}
                />
                <EditLabel
                  label='Edit Title Line 2'
                  onClick={() => editTextField('titleTwo')}
                />
              </div>
            )}

            {(hasDescription || editMode) && (
              <div className={hasDescription ? 'mt-6' : 'mt-3'}>
                {hasDescription && (
                  <p
                    className={`m-0 max-w-[600px] font-body text-base leading-[1.52] ${descriptionColor ? 'text-[inherit]' : 'text-spontaine-text-secondary'}`}
                    style={{ color: descriptionColor }}
                  >
                    <Localization
                      text={blockData?.description ?? emptyTextData}
                      language={language}
                    />
                  </p>
                )}
                {editMode && onFieldEdit != null && (
                  <EditLabel
                    label='Edit Description'
                    onClick={() => editTextField('description')}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {shouldRenderBody && (
          <div data-v3-rich-text-reveal>
            {editMode && (
              <p className='mb-4 rounded-lg bg-spontaine-surface-paper p-3 font-body text-sm leading-[1.5] text-spontaine-text-secondary shadow-surface'>
                {trustedScriptWarning}
              </p>
            )}

            {hasTwoColumns ? (
              <div
                className={cn(
                  'grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12',
                  !hasRightEmbedHtml && !editMode && 'md:grid-cols-1'
                )}
              >
                <div>
                  {(hasLeftEmbedHtml || editMode) && (
                    <ScriptEmbedDisplay
                      data={leftEmbedHtml}
                      executeScripts={!editMode}
                    />
                  )}
                  {editMode && onFieldEdit != null && (
                    <div className='mt-3'>
                      <EditLabel
                        label='Edit Left Embed HTML'
                        onClick={() => editTextField('embedHtml', defaultEmbedHtml, 'html')}
                      />
                    </div>
                  )}
                </div>
                {(hasRightEmbedHtml || editMode) && (
                  <div>
                    <ScriptEmbedDisplay
                      data={rightEmbedHtml}
                      executeScripts={!editMode}
                    />
                    {editMode && onFieldEdit != null && (
                      <div className='mt-3'>
                        <EditLabel
                          label='Edit Right Embed HTML'
                          onClick={() =>
                            editTextField('embedHtmlRight', defaultRightEmbedHtml, 'html')
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <>
                {(hasLeftEmbedHtml || editMode) && (
                  <ScriptEmbedDisplay
                    data={leftEmbedHtml}
                    executeScripts={!editMode}
                  />
                )}
                {editMode && onFieldEdit != null && (
                  <div className='mt-3'>
                    <EditLabel
                      label='Edit Embed HTML'
                      onClick={() => editTextField('embedHtml', defaultEmbedHtml, 'html')}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {editMode && (
          <div className='mt-8 rounded-lg bg-spontaine-surface-paper p-4 shadow-surface'>
            <div className='flex flex-wrap gap-4'>
              {dispatch != null && blockData?.id != null && (
                <div className='flex flex-wrap items-center gap-2'>
                  <p className='m-0 text-sm font-medium text-spontaine-text-primary'>
                    Section Shape:
                  </p>
                  <V3RoundedTopToggle
                    blockId={blockData.id}
                    dispatch={dispatch}
                    language={language}
                    overlapTop={blockData.overlapTop}
                    roundedTop={blockData.roundedTop}
                  />
                </div>
              )}
              {dispatch != null && (
                <div className='flex flex-wrap items-center gap-2'>
                  <p className='m-0 text-sm font-medium text-spontaine-text-primary'>
                    Embed Layout:
                  </p>
                  <EditLabel
                    label={hasTwoColumns ? 'Use One Column' : 'Use Two Columns'}
                    onClick={toggleColumns}
                  />
                </div>
              )}
              <V3ColorControls
                backgroundColor={blockData?.backgroundColor}
                descriptionColor={blockData?.descriptionColor}
                eyebrowColor={blockData?.eyebrowColor}
                onFieldEdit={onFieldEdit}
                textColor={blockData?.textColor}
                titleOneColor={blockData?.titleOneColor}
                titleTwoColor={blockData?.titleTwoColor}
              />
            </div>
          </div>
        )}
      </div>
    </V3RoundedSectionBlockFrame>
  )
}

export default SectionScriptEmbedV3
