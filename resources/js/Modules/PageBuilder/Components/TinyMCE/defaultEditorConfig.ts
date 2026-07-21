export const defaultStyleFormats = [
  {
    title: 'Custom Typography',
    items: [
      {
        title: 'Large Heading (Urbanist)',
        block: 'h1',
        styles: {
          'font-family': 'Urbanist, sans-serif',
          'font-weight': 'bold',
          'font-size': '2rem',
          color: '#111827',
        },
      },
      {
        title: 'Medium Heading (Urbanist)',
        block: 'h2',
        styles: {
          'font-family': 'Urbanist, sans-serif',
          'font-weight': 'bold',
          'font-size': '1.5rem',
          color: '#111827',
        },
      },
      {
        title: 'Body Text (Space Grotesk)',
        block: 'p',
        styles: {
          'font-family': 'Space Grotesk, sans-serif',
          color: '#374151',
          'line-height': '1.6',
        },
      },
      {
        title: 'Quote Block',
        block: 'blockquote',
        styles: {
          'font-family': 'Space Grotesk, sans-serif',
          'border-left': '4px solid #61B03E',
          'padding-left': '1rem',
          margin: '1.5rem 0',
          color: '#4B5563',
          'font-style': 'italic',
        },
      },
    ],
  },
]

export const defaultContentStyle = `
  body {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #374151;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Urbanist', sans-serif;
    font-weight: bold;
    color: #111827;
  }
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  h4 { font-size: 1.125rem; }
  p, span, li {
    font-family: 'Space Grotesk', sans-serif;
    color: #374151;
  }
  blockquote {
    border-left: 4px solid #61B03E;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-family: 'Space Grotesk', sans-serif;
    color: #4B5563;
    font-style: italic;
    background: transparent;
  }
  strong {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: bold;
    color: #111827;
  }
  em {
    font-family: 'Space Grotesk', sans-serif;
    font-style: italic;
  }
`

export const defaultFontFamilyFormats =
  'Urbanist=Urbanist,sans-serif;' +
  'Space Grotesk=Space Grotesk,sans-serif;' +
  'Arial=arial,helvetica,sans-serif;' +
  'Georgia=georgia,palatino;' +
  'Helvetica=helvetica;' +
  'Times New Roman=times new roman,times;' +
  'Verdana=verdana,geneva'
