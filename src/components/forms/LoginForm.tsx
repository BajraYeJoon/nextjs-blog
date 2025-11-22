'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { loginSchema, LoginFormData } from '@/schemas/auth'
import { useToast } from '@/hooks/useToast'
import { loginAction } from '@/actions/auth-actions'

export default function LoginForm() {
  const router = useRouter()
  const toast = useToast()
  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log('Form submitted with data:', data)
    console.log('Form errors:', form.formState.errors)
    
    // Check if form is valid before submitting
    const isValid = await form.trigger()
    if (!isValid) {
      console.log('Form validation failed')
      return
    }
    
    try {
      const result = await loginAction(data.email, data.password)
      
      if (result.success) {
        toast.success(result.message)
        router.push('/dashboard')
        return
      }

      toast.error(result.error || result.message || 'Login failed. Please try again.')
      form.setError('root', { message: result.error || result.message })
    } catch (error) {
      const errorMessage = 'Login failed. Please try again.'
      form.setError('root', { message: errorMessage })
      toast.error(errorMessage)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="admin@test.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm text-red-500 text-center">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Form>
  )
}