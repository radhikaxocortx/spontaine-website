import StaticHomePage2 from '@/Layouts/StaticHomePage2'
import { Page } from '@/Modules/PageBuilder/page_interfaces'

interface HomePageProps {
  featuredVideoPosts?: Page[]
  featuredBlogs?: Page[]
}

export default function HomePage({ featuredVideoPosts = [], featuredBlogs = [] }: HomePageProps) {
  return (
    <StaticHomePage2
      featuredVideoPosts={featuredVideoPosts}
      featuredBlogs={featuredBlogs}
    />
  )
}
