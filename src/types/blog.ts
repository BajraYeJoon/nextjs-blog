export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  authorId: string
  authorName: string
  createdAt: string
  updatedAt: string
  published: boolean
}

export interface CreatePostData {
  title: string
  content: string
  excerpt: string
}

export interface UpdatePostData extends Partial<CreatePostData> {
  published?: boolean
}