import Home from '@/sections/Home'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Experience from '@/sections/Experience'
import Contact from '@/sections/Contact'

export default function App() {
  return (
    <main className="bg-[#0a0e1a] min-h-screen">
      <Home />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </main>
  )
}