import { setupV3Editor } from './v3InlineStyle'

export const v3StyleFormats = [
  {
    title: 'Spontaine V3',
    items: [
      {
        title: 'V3 Heading',
        block: 'h2',
        styles: {
          'font-family': 'Urbanist, sans-serif',
          'font-weight': '700',
          'font-size': '28px',
          'letter-spacing': '-0.02em',
          'line-height': '1.08',
          color: 'var(--spontaine-text-primary)',
        },
      },
      {
        title: 'V3 Subheading',
        block: 'h3',
        styles: {
          'font-family': 'Urbanist, sans-serif',
          'font-weight': '600',
          'font-size': '20px',
          'line-height': '1.2',
          color: 'var(--spontaine-text-primary)',
        },
      },
      {
        title: 'V3 Body',
        block: 'p',
        styles: {
          'font-family': 'Geist, sans-serif',
          'font-size': '15.5px',
          'line-height': '1.65',
          color: 'var(--spontaine-text-secondary)',
        },
      },
      {
        title: 'V3 Muted Body',
        block: 'p',
        styles: {
          'font-family': 'Geist, sans-serif',
          'font-size': '15px',
          'line-height': '1.65',
          color: 'var(--spontaine-text-tertiary)',
        },
      },
      {
        title: 'V3 Accent Link',
        selector: 'a',
        styles: {
          color: 'var(--spontaine-accent-dark)',
          'text-decoration': 'underline',
        },
      },
      {
        title: 'V3 Quote',
        block: 'blockquote',
        styles: {
          'border-left': '3px solid var(--spontaine-accent)',
          'padding-left': '16px',
          margin: '20px 0',
          color: 'var(--spontaine-text-secondary)',
          'font-family': 'Geist, sans-serif',
          'font-style': 'italic',
        },
      },
      {
        title: 'V3 Accent Highlight',
        inline: 'span',
        styles: {
          background:
            'linear-gradient(120deg, var(--spontaine-accent-soft), var(--spontaine-surface-ice))',
          color: 'var(--spontaine-accent-dark)',
          'font-weight': '600',
        },
      },
    ],
  },
]

export const v3ContentStyle = `
  :root {
    --spontaine-text-primary: #2e2e2e;
    --spontaine-text-secondary: rgb(74 74 74 / 72%);
    --spontaine-text-tertiary: rgb(74 74 74 / 60%);
    --spontaine-accent: #0fe5a8;
    --spontaine-accent-dark: #0cce97;
    --spontaine-accent-soft: rgb(15 229 168 / 12%);
    --spontaine-surface-ice: #d4eeff;
    --spontaine-surface-cream: #ebe9d9;
    --spontaine-surface-paper: #ffffff;
  }
  body {
    font-family: 'Geist', sans-serif;
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--spontaine-text-secondary);
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Urbanist', sans-serif;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--spontaine-text-primary);
  }
  h1 { font-size: 36px; line-height: 1; }
  h2 { font-size: 28px; line-height: 1.08; }
  h3 { font-size: 20px; line-height: 1.2; }
  h4 { font-size: 18px; line-height: 1.25; }
  p, span, li {
    font-family: 'Geist', sans-serif;
    color: var(--spontaine-text-secondary);
  }
  a {
    color: var(--spontaine-accent-dark);
    text-decoration: underline;
  }
  blockquote {
    border-left: 3px solid var(--spontaine-accent);
    padding-left: 16px;
    margin: 20px 0;
    font-family: 'Geist', sans-serif;
    color: var(--spontaine-text-secondary);
    font-style: italic;
    background: transparent;
  }
  strong {
    font-family: 'Geist', sans-serif;
    font-weight: 600;
    color: var(--spontaine-text-primary);
  }
  em {
    font-family: 'Geist', sans-serif;
    font-style: italic;
  }
`

export const v3ColorMap = [
  '2e2e2e',
  'V3 Primary Text',
  '4a4a4a',
  'V3 Secondary Text',
  '0cce97',
  'V3 Accent Dark',
  '0fe5a8',
  'V3 Accent',
  'd4eeff',
  'V3 Ice Surface',
  'ebe9d9',
  'V3 Cream Surface',
]

export const v3FontFamilyFormats =
  'Urbanist=Urbanist,sans-serif;' +
  'Geist=Geist,sans-serif;' +
  'Geist Mono=Geist Mono,monospace;' +
  'Space Grotesk=Space Grotesk,sans-serif;' +
  'Arial=arial,helvetica,sans-serif;' +
  'Georgia=georgia,palatino;' +
  'Helvetica=helvetica;' +
  'Times New Roman=times new roman,times;' +
  'Verdana=verdana,geneva'

export { setupV3Editor }
