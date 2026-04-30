import { useEffect, useRef, useState } from 'react'
 
interface UseIntersectionObserverOptions {
  threshold?: number
  delay?: number
  rootMargin?: string
}
 
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0.3, delay = 0, rootMargin = '0px' } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)
 
  useEffect(() => {
    const element = ref.current
    if (!element) return
 
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay)
          } else {
            setIsVisible(true)
          }
        }
      },
      { threshold, rootMargin }
    )
 
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, delay, rootMargin])
 
  return { ref, isVisible }
}