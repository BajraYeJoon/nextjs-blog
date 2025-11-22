import { NextResponse } from 'next/server'

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export class ApiResponseHandler {
  static success<T>(data: T, message: string = 'Success', status: number = 200) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      } as ApiResponse<T>,
      { status }
    )
  }

  static error(error: string, status: number = 500) {
    return NextResponse.json(
      {
        success: false,
        message: error,
        error,
      } as ApiResponse,
      { status }
    )
  }

  static badRequest(error: string) {
    return this.error(error, 400)
  }

  static unauthorized(error: string = 'Unauthorized') {
    return this.error(error, 401)
  }

  static notFound(error: string = 'Not found') {
    return this.error(error, 404)
  }

  static internalError(error: string = 'Internal server error') {
    return this.error(error, 500)
  }
}
