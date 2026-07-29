'use client'

import React from 'react'
import { Play } from 'lucide-react'

type VideoEmbedProps = {
  url: string
}

export default function VideoEmbed({ url }: VideoEmbedProps) {
  if (!url) return null

  const getEmbedInfo = (url: string) => {
    try {
      const parsed = new URL(url)
      
      // YouTube
      if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
        let videoId = ''
        if (parsed.hostname.includes('youtu.be')) {
          videoId = parsed.pathname.slice(1)
        } else {
          videoId = parsed.searchParams.get('v') || ''
        }
        if (videoId) {
          return { type: 'youtube', src: `https://www.youtube.com/embed/${videoId}` }
        }
      }

      // TikTok
      if (parsed.hostname.includes('tiktok.com')) {
        const matches = parsed.pathname.match(/\/video\/(\d+)/)
        if (matches && matches[1]) {
          return { type: 'tiktok', src: `https://www.tiktok.com/embed/v2/${matches[1]}` }
        }
      }

      // Instagram
      if (parsed.hostname.includes('instagram.com')) {
        const matches = parsed.pathname.match(/\/(p|reel)\/([a-zA-Z0-9_-]+)/)
        if (matches && matches[2]) {
          return { type: 'instagram', src: `https://www.instagram.com/p/${matches[2]}/embed/` }
        }
      }
    } catch (e) {
      // url parse error
    }
    
    return null
  }

  const embedInfo = getEmbedInfo(url)

  if (!embedInfo) {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-gray-100 text-brand-600 font-bold p-4 rounded-2xl hover:bg-gray-200 transition-colors"
      >
        <Play size={20} /> Assistir Vídeo do Imóvel
      </a>
    )
  }

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gray-100 mt-6 shadow-sm border border-gray-100 aspect-video">
      <iframe
        src={embedInfo.src}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        scrolling="no"
        frameBorder="0"
      />
    </div>
  )
}
