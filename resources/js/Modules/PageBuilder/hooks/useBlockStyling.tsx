import { BlockConfiguration } from '@/Modules/PageBuilder/page_interfaces'

export default function useBlockStyling(configuration: BlockConfiguration): string {
  console.log(configuration)
  return (
    `${configuration.marginTop} ${configuration.marginBottom} ${configuration.paddingTop} ${configuration.paddingBottom}` +
    ` ${configuration.mobileWidth ?? 'col-span-full'} ${configuration.desktopWidth ?? 'xl:col-span-full'} ` +
    ` ${configuration.tabletWidth ?? 'md:col-span-full'} ${configuration.laptopWidth ?? 'lg:col-span-full'}`
  )
}
