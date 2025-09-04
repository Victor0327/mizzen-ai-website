'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

export function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width / devicePixelRatio,
      y: Math.random() * canvas.height / devicePixelRatio,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.4,
      hue: Math.random() * 60 + 200 // Blue to purple range
    })

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const updateParticle = (particle: Particle) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = mouseRef.current.x - rect.left
      const mouseY = mouseRef.current.y - rect.top

      // Attraction to mouse
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 200) {
        const force = (200 - distance) / 200 * 0.05
        particle.vx += (dx / distance) * force
        particle.vy += (dy / distance) * force
      }

      // Apply friction
      particle.vx *= 0.995
      particle.vy *= 0.995

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Boundary check
      const canvasWidth = canvas.width / devicePixelRatio
      const canvasHeight = canvas.height / devicePixelRatio

      if (particle.x < 0 || particle.x > canvasWidth) {
        particle.vx *= -0.8
        particle.x = Math.max(0, Math.min(canvasWidth, particle.x))
      }
      if (particle.y < 0 || particle.y > canvasHeight) {
        particle.vy *= -0.8
        particle.y = Math.max(0, Math.min(canvasHeight, particle.y))
      }
    }

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      
      // Create gradient for particle
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      )
      gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, 0.8)`)
      gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`)
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawConnections = () => {
      const particles = particlesRef.current
      ctx.save()
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            const alpha = (120 - distance) / 120 * 0.4
            ctx.globalAlpha = alpha
            ctx.strokeStyle = `hsla(${particles[i].hue}, 70%, 70%, ${alpha})`
            ctx.lineWidth = Math.max(0.5, (120 - distance) / 120 * 2)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Add mouse connections
      const rect = canvas.getBoundingClientRect()
      const mouseX = mouseRef.current.x - rect.left
      const mouseY = mouseRef.current.y - rect.top

      for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - mouseX
        const dy = particles[i].y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const alpha = (150 - distance) / 150 * 0.6
          ctx.globalAlpha = alpha
          ctx.strokeStyle = `hsla(${particles[i].hue}, 80%, 80%, ${alpha})`
          ctx.lineWidth = (150 - distance) / 150 * 3
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouseX, mouseY)
          ctx.stroke()
        }
      }
      
      ctx.restore()
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio)

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        updateParticle(particle)
        drawParticle(particle)
      })

      // Draw connections
      drawConnections()

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    // Initialize
    resizeCanvas()
    initParticles()
    setIsVisible(true)
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    
    // Start animation
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}