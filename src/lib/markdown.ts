import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Path to blog posts directory
const blogsDirectory = path.join(process.cwd(), 'src/data/blogs');

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
}

export interface BlogData extends BlogMeta {
  contentHtml: string;
}

// Get data for all blog posts
export async function getAllBlogs(): Promise<BlogMeta[]> {
  // Get all file names in the blogs directory
  const fileNames = fs.readdirSync(blogsDirectory);
  
  // Get all blog data
  const allBlogsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Only process markdown files
    .map(fileName => {
      // Read markdown file
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse front matter data with gray-matter
      const matterResult = matter(fileContents);
      
      // Combine data with file name
      return {
        slug: matterResult.data.slug || fileName.replace(/\.md$/, ''),
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        author: matterResult.data.author,
      };
    })
    // Sort by date
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  
  return allBlogsData;
}

// Get list of all blog slugs
export async function getAllBlogSlugs() {
  const fileNames = fs.readdirSync(blogsDirectory);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Read markdown file
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse front matter data with gray-matter
      const matterResult = matter(fileContents);
      
      return matterResult.data.slug || fileName.replace(/\.md$/, '');
    });
}

// Get blog content by slug
export async function getBlogData(slug: string): Promise<BlogData> {
  const fileNames = fs.readdirSync(blogsDirectory);
  let fullPath = '';
  
  // Find matching file
  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;
    
    const filePath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);
    
    if (matterResult.data.slug === slug || fileName.replace(/\.md$/, '') === slug) {
      fullPath = filePath;
      break;
    }
  }
  
  if (!fullPath) {
    throw new Error(`Blog with slug ${slug} not found`);
  }
  
  // Read markdown file
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Parse front matter data with gray-matter
  const matterResult = matter(fileContents);
  
  // Convert markdown content to HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  // Combine data
  return {
    slug,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.data.excerpt,
    author: matterResult.data.author,
  };
} 
