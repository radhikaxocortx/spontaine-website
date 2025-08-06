import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'

interface Properties {
  data: string
  setData: (value: string) => unknown
  setShowModal: (value: boolean) => unknown
}

const TinyMCE = ({ setData, data, setShowModal }: Properties) => {
  const editorRef = useRef<any>(null)

  const updateData = () => {
    if (editorRef.current) {
      setData(editorRef.current.getContent())
    }
  }

  return (
    <div className='card grid grid-cols-1 gap-2 md:p-5'>
      <div className='flex items-center justify-end'>
        <div
          onClick={() => setShowModal(false)}
          className='cursor-pointer transition duration-150 ease-in-out hover:bg-gray-400'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            aria-label='Close'
            className='icon icon-tabler icon-tabler-x'
            width={20}
            height={20}
            viewBox='0 0 24 24'
            strokeWidth='2.5'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path
              stroke='none'
              d='M0 0h24v24H0z'
            />
            <line
              x1={18}
              y1={6}
              x2={6}
              y2={18}
            />
            <line
              x1={6}
              y1={6}
              x2={18}
              y2={18}
            />
          </svg>
        </div>
      </div>
      <div className='w-full'>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={data}
          tinymceScriptSrc='/tinymce/js/tinymce/tinymce.min.js'
          init={{
            height: 500,
            menubar: true,
            plugins:
              'advlist autolink lists link image charmap preview anchor emoticons ' +
              'searchreplace visualblocks code' +
              'media table  code help wordcount pagebreak',
            toolbar:
              'undo redo | blocks | formatselect | fontfamily | lineheight |' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            style_formats: [
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
            ],
            style_formats_merge: true,

            content_style: `
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
            `,

            font_family_formats:
              'Urbanist=Urbanist,sans-serif;' +
              'Space Grotesk=Space Grotesk,sans-serif;' +
              'Arial=arial,helvetica,sans-serif;' +
              'Georgia=georgia,palatino;' +
              'Helvetica=helvetica;' +
              'Times New Roman=times new roman,times;' +
              'Verdana=verdana,geneva',
            extended_valid_elements:
              'iframe[src|srcdoc|width|height|name|align|frameborder|allowfullscreen|style|title|allow|loading]',
          }}
        />
      </div>
      <div className='flex'>
        <button
          className='standard-button primary-button'
          onClick={updateData}
        >
          SAVE
        </button>
      </div>
    </div>
  )
}

export default TinyMCE
