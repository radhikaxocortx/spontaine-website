import BlogDetailDrawer from '@/components/BlogDetailDrawer'
import { BlogsListProps } from '@/components/ui/ui_interfaces'
import { useBlogDrawer } from '@/hooks/useBlogDrawer'
import AppLayout from '@/Layouts/AppLayout'
import AppLayoutPadding from '@/Layouts/AppLayoutPadding'
import AllPosts from './components/AllPosts'
import BlogsBanner from './components/BlogsBanner'
import Breadcrumbs from './components/Breadcrumbs'
import FeaturedArticles from './components/FeaturedArticles'

const BlogsList = ({ featuredPosts, allPosts, selectedBlogSlug }: BlogsListProps) => {
  const { isDrawerOpen, selectedPost, handlePostClick, handleCloseDrawer } = useBlogDrawer({
    featuredPosts,
    allPosts: allPosts.data,
    selectedBlogSlug,
  })

  return (
    <AppLayout>
      {/* Banner Section */}
      <BlogsBanner />

      {/* Breadcrumbs */}
      <Breadcrumbs />

      <div className='min-h-screen bg-[#FEF9F4] pb-48 pt-10'>
        <AppLayoutPadding>
          {/* Featured Articles Section */}
          <FeaturedArticles
            featuredPosts={featuredPosts}
            onPostClick={handlePostClick}
          />

          {/* All Posts Section */}
          <AllPosts
            posts={allPosts.data}
            currentPage={allPosts.current_page}
            lastPage={allPosts.last_page}
            onPostClick={handlePostClick}
          />
        </AppLayoutPadding>
      </div>

      {/* Blog Detail Drawer */}
      <BlogDetailDrawer
        isOpen={isDrawerOpen}
        post={selectedPost}
        onClose={handleCloseDrawer}
      />
    </AppLayout>
  )
}

export default BlogsList
