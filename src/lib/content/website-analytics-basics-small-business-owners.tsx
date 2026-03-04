/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';

export default function WebsiteAnalyticsBasics() {
  return (
    <>
      <p>If you walked into a casino, handed the dealer a stack of $100 bills, closed your eyes, and walked out without knowing if you won or lost, it would be sheer insanity. Yet, every single day, thousands of small business owners pour thousands of dollars into website development, Facebook Ads, and SEO agencies without any visibility into their tracking data.</p>

      <p>Flying blind in 2026 is business suicide. <em>Website analytics basics for small business owners</em> isn't about becoming a data scientist; it’s about answering one critical question: <em>"Where exactly is my money coming from, and where exactly am I bleeding cash?"</em> Here are the core metrics you must track to transition from guessing to engineering growth.</p>

      <h2>1. The Foundation: Installing the Right Tech Stack</h2>
      <p>Before you analyze anything, you need the right tracking tools surgically embedded into your website's codebase.</p>

      <ul>
        <li><strong>Google Analytics 4 (GA4):</strong> This is the industry standard. It tracks every click, page view, and user journey across your entire site.</li>
        <li><strong>Google Tag Manager (GTM):</strong> This is the container that holds all your tracking codes (like the Facebook Pixel or LinkedIn Insight Tag) so your website code remains clean and blazingly fast.</li>
        <li><strong>Heatmap Software (e.g., Hotjar or Microsoft Clarity):</strong> This software records anonymous video sessions of users navigating your site, showing you exactly where they click (or aggressively rage-click) before leaving.</li>
      </ul>

      <h2>2. Traffic Acquisition (Where Are They Coming From?)</h2>
      <p>Not all traffic is created equal. 1,000 visitors from an organic Google search (Intent: High) is mathematically worth more than 10,000 visitors from a viral meme on a competitor's TikTok page (Intent: Zero).</p>

      <p>In GA4, navigate to <strong>Acquisition &gt; Traffic Acquisition</strong>. You must memorize these channels:</p>
      <ul>
        <li><strong>Organic Search:</strong> Users finding you on Google for free. This means your SEO is working.</li>
        <li><strong>Direct:</strong> Users typing a specific URL directly into their browser. This signifies strong brand awareness.</li>
        <li><strong>Referral:</strong> Traffic coming from links on other websites (e.g., a local news blog featuring your business).</li>
        <li><strong>Paid Search / Paid Social:</strong> Traffic from your ad campaigns.</li>
      </ul>
      <p>If you are spending $2,000 a month on an SEO agency, but your "Organic Search" traffic has been flatlining for 6 months, you are being robbed. Fire the agency immediately.</p>

      <div className="p-8 my-10 bg-[#1A1A1E] border-l-4 border-[#4A4AFF] rounded-r-2xl">
        <h4 className="text-[#F7F7F7] font-semibold text-2xl mb-4 mt-0">Stop Bleeding Marketing Budget in the Dark.</h4>
        <p className="text-[#A0A0A0] mb-6 text-lg">
          If you don't confidently know your Cost Per Acquisition (CPA) or Conversion Rate, you are guessing at business strategy. Xpeartz builds sophisticated, automated analytics dashboards that grant complete visibility into your highest-ROI channels. Let's illuminate your data.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#4A4AFF] text-white text-base font-bold rounded-xl hover:bg-[#3B3BDD] transition-transform hover:scale-105">
          Request an Analytics Setup & Audit
        </Link>
      </div>

      <h2>3. The Conversion Rate (The Only Metric That Pays the Rent)</h2>
      <p>Traffic is a vanity metric. If you have 5,000 visitors a month, who cares? The <strong>Conversion Rate</strong> is the percentage of those visitors who take a highly valuable action (e.g., buying a product, filling out a lead form, booking a call).</p>

      <p className="font-mono text-center p-4 bg-[#1A1A1E] text-[#F7F7F7] border border-[#2A2A2E] rounded-xl my-4">
        Conversion Rate = (Conversions / Total Visitors) x 100
      </p>

      <p>If your website has 1,000 visitors and 10 of them fill out your contact form, your conversion rate is 1%. If you redesign your website and improve the UX, doubling the conversion rate to 2%, <strong>you just doubled your revenue without spending a single extra penny on advertising.</strong> This is why elite agencies focus relentlessly on Conversion Rate Optimization (CRO).</p>

      <h2>4. The Bounce Rate and Dwell Time (Diagnosing Friction)</h2>
      <p>A "Bounce" is a user landing on a page and immediately leaving without clicking anything else. If your homepage has an 85% bounce rate, it means the page is failing completely. It is likely too slow, visually confusing, or the headline doesn’t match the user’s expectation.</p>

      <p>Conversely, <strong>Dwell Time</strong> (Average Engagement Time) measures how long a user stays glued to your content. If a user spends 3 minutes and 40 seconds reading a blog post, they are deeply engaged and highly primed to purchase your services. By tracking Dwell Time, you identify your highest-performing assets and double down on producing similar content.</p>

      <h2>The Verdict: Data is Security</h2>
      <p>Operating a digital business without analytics is emotional gambling. By setting up strict tracking infrastructure, isolating your most profitable acquisition channels, and obsessively monitoring your conversion rate, you replace anxiety with brutal, mathematical clarity. You will know exactly which levers to pull to scale your revenue to the moon.</p>
    </>
  );
}
