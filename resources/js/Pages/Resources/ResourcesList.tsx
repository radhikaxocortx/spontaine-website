import BlogDetailDrawer from '@/components/BlogDetailDrawer'
import { useResourceDrawer } from '@/hooks/useResourceDrawer'
import AppLayout from '@/Layouts/AppLayout'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import { Page } from '@/Modules/PageBuilder/page_interfaces'
import AllResources from '@/Pages/Resources/components/AllResources'
import BreadcrumbsResources from '@/Pages/Resources/components/BreadcrumbsResources'
import FeaturedResources from '@/Pages/Resources/components/FeaturedResources'
import ResourcesBanner from '@/Pages/Resources/components/ResourcesBanner'

interface ResourcesListProps {
  featuredPosts: Page[]
  allPosts: {
    data: Page[]
    current_page: number
    last_page: number
  }
  resourceTabs: Array<{
    type: string
    count: number
  }>
  activeResourceType: string | null
  selectedResourceSlug?: string
}

const ResourcesList = ({
  featuredPosts,
  allPosts,
  resourceTabs,
  activeResourceType,
  selectedResourceSlug,
}: ResourcesListProps) => {
  const { isDrawerOpen, selectedPost, handlePostClick, handleCloseDrawer } = useResourceDrawer({
    featuredPosts,
    allPosts: allPosts.data,
    selectedResourceSlug,
  })

  return (
    <div className='bg-spontaine-resources-bg'>
      <AppLayout>
        <ResourcesBanner />
        <BreadcrumbsResources />

        <div className='min-h-screen pb-48 pt-10'>
          <AppLayoutPadding>
            <FeaturedResources
              featuredPosts={featuredPosts}
              onPostClick={handlePostClick}
            />
            <AllResources
              posts={allPosts.data}
              currentPage={allPosts.current_page}
              lastPage={allPosts.last_page}
              resourceTabs={resourceTabs}
              activeResourceType={activeResourceType}
              onPostClick={handlePostClick}
            />
          </AppLayoutPadding>
        </div>

        <BlogDetailDrawer
          isOpen={isDrawerOpen}
          post={selectedPost}
          onClose={handleCloseDrawer}
          sharePathBase='/resource'
          downloadCaptureBasePath='/resource-download'
        />
      </AppLayout>
    </div>
  )
}

export default ResourcesList
