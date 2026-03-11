'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { fetchData } from '@/lib/api'
import { Job, SkillGroup, ContactLink, Project } from '@/types/types'

interface DataContextValue {
  jobs: Job[]
  skillGroups: SkillGroup[]
  contact: ContactLink[]
  projects: Project[]
  isLoading: boolean
  error: string | null
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([])
  const [contact, setContact] = useState<ContactLink[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  fetchData()
    .then(async (data) => {
      setJobs(data.jobs)
      setSkillGroups(data.skillGroups)
      setContact(data.contact)
      setProjects(data.projects)

      // NO CACHING — always re-fetches on mount (for human-testing purposes)
      // To cache: use a module-level Set of already-loaded paths
      const imagePaths = data.projects.map((p) => p.image).filter(Boolean)
      await Promise.all(
        imagePaths.map(
          (src) =>
            new Promise<void>((resolve) => {
              const img = new window.Image()
              img.src = src
              img.onload = () => resolve()
              img.onerror = () => {
                console.warn(`[DataContext] failed to preload: ${src}`)
                resolve() // don't block on broken images
              }
            })
        )
      )
    })
    .catch((err) => setError(err.message))
    .finally(() => setIsLoading(false)) // fires only after images are done
  }, [])

  return (
    <DataContext.Provider value={{ jobs, skillGroups, contact, projects, isLoading, error }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used inside <DataProvider>')
  return ctx
}
