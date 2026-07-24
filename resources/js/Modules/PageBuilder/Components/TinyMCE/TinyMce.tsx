import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
import {
  defaultContentStyle,
  defaultFontFamilyFormats,
  defaultStyleFormats,
} from './defaultEditorConfig'
import {
  setupV3Editor,
  v3ColorMap,
  v3ContentStyle,
  v3FontFamilyFormats,
  v3StyleFormats,
} from './v3EditorConfig'

interface Properties {
  data: string
  setData: (value: string) => unknown
  setShowModal: (value: boolean) => unknown
  variant?: 'default' | 'v3' | 'scriptEmbed'
}

const TinyMCE = ({ setData, data, setShowModal, variant = 'default' }: Properties) => {
  const editorRef = useRef<{ getContent: () => string } | null>(null)
  const isV3 = variant === 'v3'
  const isScriptEmbed = variant === 'scriptEmbed'
  const isV3Like = isV3 || isScriptEmbed
  const toolbar = isScriptEmbed
    ? 'undo redo | code | blocks | formatselect | fontfamily | lineheight |' +
      'styles v3style | bold italic forecolor backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help'
    : isV3Like
      ? 'undo redo | blocks | formatselect | fontfamily | lineheight |' +
        'styles v3style | bold italic forecolor backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help'
      : 'undo redo | blocks | formatselect | fontfamily | lineheight |' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help'
  const fontFamilyFormats = isV3Like ? v3FontFamilyFormats : defaultFontFamilyFormats
  const extendedValidElements = isScriptEmbed
    ? 'iframe[src|srcdoc|width|height|name|align|frameborder|allowfullscreen|style|title|allow|loading],script[src|async|defer|type|charset|crossorigin|integrity|referrerpolicy],style[type|media|scoped]'
    : 'iframe[src|srcdoc|width|height|name|align|frameborder|allowfullscreen|style|title|allow|loading]'

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
            toolbar,
            style_formats: isV3Like ? v3StyleFormats : defaultStyleFormats,
            style_formats_merge: true,
            content_style: isV3Like ? v3ContentStyle : defaultContentStyle,
            color_map: isV3Like ? v3ColorMap : undefined,
            setup: isV3Like ? setupV3Editor : undefined,

            font_family_formats: fontFamilyFormats,
            extended_valid_elements: extendedValidElements,
            custom_elements: isScriptEmbed ? 'script,style' : undefined,
            valid_children: isScriptEmbed ? '+body[style|script]' : undefined,
            verify_html: isScriptEmbed ? false : undefined,
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
