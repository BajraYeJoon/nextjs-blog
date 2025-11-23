import { EditPost } from "@/components/editor/edit-post";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditPost postId={id} />;
}
