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
        .then(data => {
          setJobs(data.jobs)
          setSkillGroups(data.skillGroups)
          setContact(data.contact)
          setProjects(data.projects)
        })
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false))
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
