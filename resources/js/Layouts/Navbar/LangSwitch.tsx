import { router, usePage } from '@inertiajs/react'

const LangSwitch = () => {
  const { lang } = usePage().props as unknown as { lang: 'en' | 'mal' }

  const changeLang = (lang: 'en' | 'mal') => {
    router.reload({
      data: {
        lang,
      },
    })
  }

  return (
    <>
      {lang === 'mal' && (
        <div
          className=''
          onClick={() => changeLang('en')}
        >
          <img
            alt='Malayalam'
            className='h-auto w-16 cursor-pointer md:w-20'
            src='/lang-mal.svg'
          />
        </div>
      )}
      {lang === 'en' && (
        <div
          className=''
          onClick={() => changeLang('mal')}
        >
          <img
            alt='English'
            className='h-auto w-16 cursor-pointer md:w-20'
            src='/lang-eng.svg'
          />
        </div>
      )}
    </>
  )
}

export default LangSwitch
