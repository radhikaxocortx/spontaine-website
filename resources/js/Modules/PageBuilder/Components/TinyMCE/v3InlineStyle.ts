const normalizePxValue = (value?: string | null) => {
  const trimmedValue = value?.trim()

  if (!trimmedValue) {
    return null
  }

  const numericValue = Number(trimmedValue.replace(/px$/i, ''))

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return null
  }

  return `${numericValue}px`
}

const normalizeHexValue = (value?: string | null) => {
  const trimmedValue = value?.trim()

  if (!trimmedValue) {
    return null
  }

  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(trimmedValue)
    ? trimmedValue
    : null
}

const buildInlineStyle = (data: Record<string, string>) => {
  const styles: Record<string, string> = {}
  const fontSizePx = normalizePxValue(data.fontSizePx)
  const lineHeightPx = normalizePxValue(data.lineHeightPx)
  const letterSpacingPx = normalizePxValue(data.letterSpacingPx)
  const textColorHex = normalizeHexValue(data.textColorHex)
  const backgroundColorHex = normalizeHexValue(data.backgroundColorHex)

  if (fontSizePx) {
    styles.fontSize = fontSizePx
  }

  if (lineHeightPx) {
    styles.lineHeight = lineHeightPx
  }

  if (letterSpacingPx) {
    styles.letterSpacing = letterSpacingPx
  }

  if (textColorHex) {
    styles.color = textColorHex
  }

  if (backgroundColorHex) {
    styles.backgroundColor = backgroundColorHex
  }

  return styles
}

const toStyleAttribute = (styles: Record<string, string>) =>
  Object.entries(styles)
    .map(
      ([property, value]) =>
        `${property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}: ${value}`
    )
    .join('; ')

export const setupV3Editor = (editor: any) => {
  editor.ui.registry.addButton('v3style', {
    text: 'V3 Style',
    tooltip: 'Apply V3 inline style values',
    onAction: () => {
      editor.windowManager.open({
        title: 'V3 Inline Style',
        body: {
          type: 'panel',
          items: [
            {
              type: 'htmlpanel',
              html:
                '<p style="margin:0 0 12px;color:var(--spontaine-text-secondary);font-size:13px;">Use numeric px values. Colors accept hex values such as #2e2e2e.</p>',
            },
            {
              type: 'input',
              name: 'fontSizePx',
              label: 'Font size px',
            },
            {
              type: 'input',
              name: 'lineHeightPx',
              label: 'Line height px',
            },
            {
              type: 'input',
              name: 'letterSpacingPx',
              label: 'Letter spacing px',
            },
            {
              type: 'input',
              name: 'textColorHex',
              label: 'Text color hex',
            },
            {
              type: 'input',
              name: 'backgroundColorHex',
              label: 'Background color hex',
            },
          ],
        },
        buttons: [
          {
            type: 'cancel',
            text: 'Cancel',
          },
          {
            type: 'submit',
            text: 'Apply',
            primary: true,
          },
        ],
        initialData: {
          fontSizePx: '',
          lineHeightPx: '',
          letterSpacingPx: '',
          textColorHex: '',
          backgroundColorHex: '',
        },
        onSubmit: (api: any) => {
          const styles = buildInlineStyle(api.getData())
          const styleAttribute = toStyleAttribute(styles)

          if (styleAttribute) {
            const selectedContent = editor.selection.getContent({ format: 'html' })

            if (selectedContent) {
              editor.selection.setContent(`<span style="${styleAttribute}">${selectedContent}</span>`)
            } else {
              editor.dom.setStyles(editor.selection.getNode(), styles)
            }
          }

          api.close()
        },
      })
    },
  })
}
