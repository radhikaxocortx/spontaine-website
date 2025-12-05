import StaticHomePage2 from '@/Layouts/StaticHomePage2'
import { Page } from '@/Modules/PageBuilder/page_interfaces'

interface HomePageProps {
  featuredVideoPosts?: Page[]
}

export default function HomePage({ featuredVideoPosts = [] }: HomePageProps) {
  return <StaticHomePage2 featuredVideoPosts={featuredVideoPosts} />
}
