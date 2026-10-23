import { cookies } from 'next/headers'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = getSupabase()

  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo: { id: number; name: string }) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  )
}