import { Language } from '@/components/ui/ui_interfaces'
import { trackEvent } from '@/lib/analytics'
import Localization from '@/Modules/PageBuilder/Components/Localization'
import { BlockLink, NavMenu, NavSectionLinks } from '@/Modules/PageBuilder/page_interfaces'

export const hasLinkDescription = (link: BlockLink) =>
  Boolean(link.description?.english || link.description?.malayalam)

export const menuHasDescriptions = (sections: readonly NavSectionLinks[]) =>
  sections.some((section) => section.links.some(hasLinkDescription))

/** Reports clicks on Solutions menu links; other menus are not tracked. */
export const trackNavLink = (menu: NavMenu, link: BlockLink, location: 'header' | 'sheet') => {
  if (menu.title !== 'Solutions') {
    return
  }

  trackEvent('solutions_menu_item_clicked', { item: link.name.english ?? '', location })
}

interface NavLinkContentProps {
  readonly link: BlockLink
  readonly lang: Language
}

/** A menu link's title, with its one-line description underneath when one is set. */
export default function NavLinkContent({ link, lang }: NavLinkContentProps) {
  return (
    <>
      <span className='block'>
        <Localization
          text={link.name}
          language={lang}
        />
      </span>
      {hasLinkDescription(link) && (
        <span className='mt-0.5 block font-body text-[13px] font-normal leading-[1.4] text-spontaine-text-tertiary'>
          <Localization
            text={link.description}
            language={lang}
          />
        </span>
      )}
    </>
  )
}
