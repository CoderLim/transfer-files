import Link from 'next/link';
import { getAllBlogs } from '@/lib/markdown';

export default async function BlogPage() {
  const allBlogsData = await getAllBlogs();

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>TransferFiles Blog</h1>
        <p>Learn more about file transfers, secure sharing, and cross-device solutions</p>
      </div>

      {allBlogsData.length > 0 ? (
        <div className="blog-list">
          {allBlogsData.map(({ slug, title, date, excerpt }) => (
            <div className="blog-card" key={slug}>
              <Link href={`/blog/${slug}`}>
                <div className="blog-card-content">
                  <h2>{title}</h2>
                  <p className="excerpt">{excerpt}</p>
                  <div className="blog-meta">
                    <span>{new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    <span>Read more →</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-spinner">No blog posts found.</div>
      )}
    </div>
  );
} 
