import * as yup from 'yup'

export const createPostSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  category: yup.string().required('Category is required'),
  body: yup
    .string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters'),
})

export const updatePostSchema = createPostSchema

export type CreatePostInput = yup.InferType<typeof createPostSchema>
export type UpdatePostInput = yup.InferType<typeof updatePostSchema>
