import { EditPost } from '@/components/editor/edit-post'

export default function EditPostPage({
  params,
}: {
  params: { id: string }
}) {
  return <EditPost postId={params.id} />
}
