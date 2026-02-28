import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-data'
import SectionReveal from '@/components/ui/SectionReveal'
import { ArrowLeft, ArrowRight, Tag, Calendar, User, Clock } from 'lucide-react'
import { blogContent } from '@/lib/blog-content'

// Generate static routes for all 50 blog posts at build time
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate dynamic SEO metadata for each post based on the Topical Map
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const hasContent = !!blogContent[post.slug];

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keyword.split(' '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://xpeartz.com/blog/${post.slug}`,
    },
    alternates: {
      canonical: `https://xpeartz.com/blog/${post.slug}`,
    },
    robots: {
      index: hasContent,
      follow: true,
    }
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: 'Xpeartz',
      url: 'https://xpeartz.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xpeartz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://xpeartz.com/logo.png',
      },
    },
    datePublished: new Date().toISOString(), // In a real app, use the actual publish date from CMS
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://xpeartz.com/blog/${post.slug}`,
    },
  };

  return (
    <article className="min-h-screen pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-max-w-3xl mx-auto px-6 md:px-12">
        <SectionReveal>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-[#4A4AFF] transition-colors mb-8 text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to All Insights
          </Link>

          <header className="mb-12 border-b border-[#2A2A2E] pb-10">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CC44BB]/10 text-[#CC44BB] text-xs font-semibold uppercase tracking-wider">
                <Tag size={12} />
                {post.category}
              </span>
              <span className="text-[#8A8A8C] text-sm flex items-center gap-1.5">
                <Calendar size={14} /> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
              </span>
              <span className="text-[#8A8A8C] text-sm flex items-center gap-1.5 hidden sm:flex">
                <Clock size={14} /> 5 min read
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#F7F7F7] leading-tight tracking-tight mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-[#A0A0A0] leading-relaxed font-light">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1E] border border-[#2A2A2E] flex items-center justify-center text-[#4A4AFF]">
                <User size={18} />
              </div>
              <div>
                <div className="text-[#F7F7F7] text-sm font-medium">Xpeartz Agency</div>
                <div className="text-[#8A8A8C] text-xs">Digital Growth Experts</div>
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-[#4A4AFF] prose-p:text-[#A0A0A0] prose-p:leading-relaxed prose-li:text-[#A0A0A0]">
            {blogContent[post.slug] || (
              <>
                {/* Fallback Placeholder Content for the SEO Page */}
                <h2>Understanding the Strategy</h2>
                <p>
                  Growing your online business requires a deliberate strategy. In this article, we cover everything you need to know about <strong>{post.keyword}</strong>.
                  Whether you are an established brand or a growing startup, mastering these concepts will separate you from the competition.
                </p>
                
                <h3>Core Principles</h3>
                <ul>
                  <li>Identify your most profitable customer segments.</li>
                  <li>Eliminate friction in your sales and conversion processes.</li>
                  <li>Consistently optimize your digital presence for search engines and user experience.</li>
                  <li>Leverage automated systems to scale without exponentially increasing headcount.</li>
                </ul>

                <div className="p-8 my-10 bg-[#1A1A1E] border-l-4 border-[#4A4AFF] rounded-r-2xl">
                  <h4 className="text-[#F7F7F7] font-semibold text-xl mb-3 mt-0">Need Expert Implementation?</h4>
                  <p className="text-[#A0A0A0] mb-5 text-base">
                    Reading about strategy is one thing. Executing it perfectly is another. Let Xpeartz handle the heavy lifting for your brand.
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A4AFF] text-white text-sm font-medium rounded-xl hover:bg-[#3B3BDD] transition-colors">
                    Schedule a Strategy Call <ArrowRight size={14} />
                  </Link>
                </div>

                <h3>Next Steps</h3>
                <p>
                  Start implementing these changes today. Monitor your analytics closely to see how modifications impact your bottom line. If you need help with the technical execution 
                  or strategic planning side of <strong>{post.keyword}</strong>, reach out to our team at Xpeartz.
                </p>
              </>
            )}
          </div>
        </SectionReveal>
      </div>
    </article>
  )
}
