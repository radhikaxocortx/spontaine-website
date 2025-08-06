import StaticHomePage from '@/Layouts/StaticHomePage'
import { Page } from '@/Modules/PageBuilder/page_interfaces'

interface HomePageProps {
  featuredVideoPosts?: Page[]
}

export default function HomePage({ featuredVideoPosts = [] }: HomePageProps) {
  return <StaticHomePage featuredVideoPosts={featuredVideoPosts} />
}