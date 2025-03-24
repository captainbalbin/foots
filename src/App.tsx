import { createClient } from '@supabase/supabase-js'
import { Button } from './components/ui/button'

function App() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  const getTeams = async () => {
    const { data, error } = await supabase.from('Teams').select()

    console.log(data)
    console.log(error)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={() => getTeams()}>Click me</Button>
    </div>
  )
}

export default App
