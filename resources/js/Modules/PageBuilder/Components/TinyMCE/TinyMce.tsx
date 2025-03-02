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
                title: 'TP Custom Formats',
                items: [
                  {
                    title: 'TP Section heading',
                    inline: 'span',
                    classes: 'lg:supersizethick md:supersizethick-md supersizethick-sm',
                  },
                  {
                    title: 'TP Sub heading',
                    inline: 'span',
                    classes: 'lg:maindescription md:maindescription-md maindescription-sm',
                  },
                  {
                    title: 'TP Body text',
                    inline: 'span',
                    classes: 'lg:subheadingthin md:subheadingthin-md subheadingthin-sm',
                  },
                  {
                    title: 'TP small text',
                    inline: 'span',
                    classes: 'bodysmall',
                  },
                ],
              },
            ],
            style_formats_merge: true,

            content_style: 'body { font-family:GeneralSans; font-size:16px }',

            font_family_formats:
              'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif;' +
              'Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino;' +
              'Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier;' +
              'Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago;' +
              'Satoshi=Satoshi,NotoSerifMalayalam,sans-serif;Quilon=Quilon,NotoSerifMalayalam,sans-serif; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif;' +
              'Terminal=terminal,monaco; Times New Roman=times new roman,times;' +
              'Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
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
