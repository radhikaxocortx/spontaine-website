import StaticHomePageV3 from '@/Layouts/StaticHomePageV3'
import { Page } from '@/Modules/PageBuilder/page_interfaces'

interface HomePageProps {
  featuredVideoPosts?: Page[]
  featuredBlogs?: Page[]
}

export default function HomePage({ featuredVideoPosts = [], featuredBlogs = [] }: HomePageProps) {
  return (
    <StaticHomePageV3
      featuredVideoPosts={featuredVideoPosts}
      featuredBlogs={featuredBlogs}
    />
  )
}
