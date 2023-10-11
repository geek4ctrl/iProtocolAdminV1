import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()

    const title = String(formData.get('title'))
    const firstname = String(formData.get('firstname'))
    const surname = String(formData.get('surname'))
    const postname = String(formData.get('postname'))
    const category = String(formData.get('category'))
    const diocese = String(formData.get('diocese'))
    const uploadpicture = String(formData.get('uploadpicture'))
    const uploaddocument = String(formData.get('uploaddocument'))

    console.log('Show me the form object: ', {
        title,
        firstname,
        surname,
        postname,
        category,
        diocese,
        uploadpicture,
        uploaddocument,
    })
}
