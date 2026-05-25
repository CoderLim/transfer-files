import React from 'react';
import Link from 'next/link';
import { siteDomain } from '@/lib/site';

interface FriendLink {
  link: string;
  siteName: string;
}

// 从API获取友链数据
async function getFriendLinks(): Promise<FriendLink[]> {
  try {
    const response = await fetch('https://api.driftbossgame.org/get-friend-links');
    
    if (!response.ok) {
      console.error('获取友链数据失败:', response.statusText);
      return [];
    }
    
    // 解析JSON响应
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('获取友链数据时发生错误:', error);
    return [];
  }
}

// 友链服务端组件
export default async function FriendLinks() {
  // 获取友链数据
  const links = await getFriendLinks();
  
  // 过滤掉当前站点的链接，只基于域名匹配
  const filteredLinks = links.filter(link => {
    // 检查链接URL是否包含当前站点域名
    return !siteDomain || !link.link.includes(siteDomain);
  });
  
  // 如果没有友链数据，不渲染组件
  if (!filteredLinks || filteredLinks.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-3">
    {filteredLinks.map((link, index) => (
        <div key={`${link.link}-${index}`}>
            <Link
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm py-1 px-3 rounded hover:bg-gray-700/40 transition-colors"
            >
            {link.siteName}
            </Link>
        </div>
    ))}
    </div>
  );
} 
