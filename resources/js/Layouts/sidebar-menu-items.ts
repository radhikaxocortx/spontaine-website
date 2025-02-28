export interface SvgImage {
  svg: string
}

interface SidebarMenuItem {
  name: string
  url?: string
  value: string
  image: SvgImage | string
}

const SidebarMenuItems: SidebarMenuItem[] = [
  {
    name: 'Reference Data',
    url: '/reference-data',
    value: 'reference-data',
    image: {
      svg: `<svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.75 14H11.75V20H26.75V14Z" stroke="white" strokeWidth="2.25" strokeLinejoin="round"/>
<path d="M22.25 3.5H11.75V9.5H22.25V3.5Z" stroke="white" strokeWidth="2.25" strokeLinejoin="round"/>
<path d="M31.25 24.5H11.75V30.5H31.25V24.5Z" stroke="white" strokeWidth="2.25" strokeLinejoin="round"/>
<path d="M11 6.5H2" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 17H2" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 27.5H2" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 32V2" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
</svg>`,
    },
  },
  {
    name: 'Price Plan',
    url: '/price-plan',
    value: 'price-plan',
    image: { svg: `` },
  },
  {
    name: 'Country',
    url: '/country',
    value: 'country',
    image: { svg: `` },
  },
  {
    name: 'Workflow',
    url: '/workflow',
    value: 'workflow',
    image: { svg: `` },
  },
]
export default SidebarMenuItems
