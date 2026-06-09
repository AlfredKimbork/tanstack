import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ 
  component: App,
  loader: () => {
    // something
  }
})

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h2>Hello World</h2>
    </main>
  )
}
