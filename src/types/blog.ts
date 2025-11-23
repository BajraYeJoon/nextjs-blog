export interface BlogPost {
  id: string | number
  title: string
  body: string
  userId: string | number
  category?: string
  image?: string
  excerpt?: string
  createdAt?: string
  updatedAt?: string
}
export interface CreatePostData {
  title: string
  content: string
  excerpt: string
}

export interface UpdatePostData extends Partial<CreatePostData> {
  published?: boolean
}