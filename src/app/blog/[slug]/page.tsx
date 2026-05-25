import { getBlogData, getAllBlogSlugs } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const blogData = await getBlogData(params.slug);
    return {
      title: `${blogData.title} | TransferFiles Blog`,
      description: blogData.excerpt,
    };
  } catch (error) {
    return {
      title: 'Blog Post Not Found | TransferFiles',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const blogData = await getBlogData(params.slug);
    
    return (
      <article className="blog-post">
        <div className="blog-post-header">
          <h1>{blogData.title}</h1>
          <div className="blog-post-meta">
            <span>{new Date(blogData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            {blogData.author && (
              <span> • {blogData.author}</span>
            )}
          </div>
        </div>
        
        <div 
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} 
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
} 
