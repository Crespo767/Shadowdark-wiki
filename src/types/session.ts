export type BlockType =
  | 'paragraph'
  | 'quote'
  | 'image'
  | 'gallery'
  | 'npc'
  | 'highlight'
  | 'divider'

export interface ParagraphBlock { type: 'paragraph'; text: string }
export interface QuoteBlock { type: 'quote'; text: string; attribution?: string }
export interface ImageBlock {
  type: 'image'
  src: string
  alt: string
  caption?: string
  position?: 'full' | 'left' | 'right'
}
export interface GalleryBlock {
  type: 'gallery'
  images: { src: string; alt: string; caption?: string }[]
}
export interface NpcReferenceBlock { type: 'npc'; npcId: string }
export interface HighlightBlock { type: 'highlight'; text: string; label?: string }
export interface DividerBlock { type: 'divider' }

export type Block =
  | ParagraphBlock
  | QuoteBlock
  | ImageBlock
  | GalleryBlock
  | NpcReferenceBlock
  | HighlightBlock
  | DividerBlock

export interface Session {
  id: string
  number: number
  title: string
  subtitle?: string
  date: string
  coverImage?: string
  teaser: string
  tags?: string[]
  content: Block[]
}
