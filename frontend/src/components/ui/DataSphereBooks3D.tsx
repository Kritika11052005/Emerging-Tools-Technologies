import { useEffect, useRef } from "react"
import * as THREE from "three"

export function DataSphereBooks3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      1,
      0.1,
      1000
    )
    camera.position.z = 8
    camera.position.y = 2

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    renderer.setSize(400, 400)
    renderer.setClearColor(0x000000, 0) // Transparent background
    containerRef.current.appendChild(renderer.domElement)

    // Colors (Manipal Orange theme)
    const orangeColor = 0xff6b35
    const lightOrangeColor = 0xff8c5a
    const creamColor = 0xfff5e6

    // ===== CREATE FLOATING BOOKS =====
    const books: THREE.Mesh[] = []
    const bookCount = 5

    for (let i = 0; i < bookCount; i++) {
      // Book geometry (thin box)
      const width = 0.8 + Math.random() * 0.4
      const height = 1 + Math.random() * 0.5
      const depth = 0.15
      
      const bookGeometry = new THREE.BoxGeometry(width, height, depth)
      const bookMaterial = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? orangeColor : lightOrangeColor,
        metalness: 0.3,
        roughness: 0.6,
      })
      const book = new THREE.Mesh(bookGeometry, bookMaterial)
      
      // Position books in a circle around the sphere
      const angle = (i / bookCount) * Math.PI * 2
      const radius = 4
      book.position.x = Math.cos(angle) * radius
      book.position.z = Math.sin(angle) * radius
      book.position.y = -1 + Math.random() * 2
      
      // Random rotation
      book.rotation.x = Math.random() * 0.3
      book.rotation.y = angle + Math.PI / 2
      book.rotation.z = Math.random() * 0.2
      
      scene.add(book)
      books.push(book)
    }

    // ===== CREATE DOCUMENTS/PAPERS =====
    const documents: THREE.Mesh[] = []
    const documentCount = 4

    for (let i = 0; i < documentCount; i++) {
      const docGeometry = new THREE.PlaneGeometry(1, 1.4)
      const docMaterial = new THREE.MeshStandardMaterial({
        color: creamColor,
        side: THREE.DoubleSide,
        metalness: 0.1,
        roughness: 0.8,
      })
      const document = new THREE.Mesh(docGeometry, docMaterial)
      
      // Position documents
      const angle = (i / documentCount) * Math.PI * 2 + Math.PI / 4
      const radius = 3.5
      document.position.x = Math.cos(angle) * radius
      document.position.z = Math.sin(angle) * radius
      document.position.y = Math.random() * 3 - 1
      
      document.rotation.y = angle
      
      scene.add(document)
      documents.push(document)
    }

    // ===== CREATE CENTRAL DATA SPHERE =====
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: orangeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.y = 0.5
    scene.add(sphere)

    // ===== CREATE ORBITING DATA POINTS =====
    const dataPoints: THREE.Mesh[] = []
    const dataPointCount = 30

    for (let i = 0; i < dataPointCount; i++) {
      const pointGeometry = new THREE.SphereGeometry(0.08, 8, 8)
      const pointMaterial = new THREE.MeshStandardMaterial({
        color: lightOrangeColor,
        emissive: orangeColor,
        emissiveIntensity: 0.5,
      })
      const point = new THREE.Mesh(pointGeometry, pointMaterial)
      
      // Random position around sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 1.3
      
      point.position.x = radius * Math.sin(phi) * Math.cos(theta)
      point.position.y = radius * Math.cos(phi) + 0.5
      point.position.z = radius * Math.sin(phi) * Math.sin(theta)
      
      scene.add(point)
      dataPoints.push(point)
    }

    // ===== CREATE CONNECTING LINES =====
    const linesMaterial = new THREE.LineBasicMaterial({
      color: orangeColor,
      transparent: true,
      opacity: 0.3,
    })

    const linesGeometry = new THREE.BufferGeometry()
    const linePositions: number[] = []

    for (let i = 0; i < dataPoints.length; i++) {
      const point1 = dataPoints[i]
      const point2 = dataPoints[(i + 1) % dataPoints.length]
      
      linePositions.push(point1.position.x, point1.position.y, point1.position.z)
      linePositions.push(point2.position.x, point2.position.y, point2.position.z)
    }

    linesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    )
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(lines)

    // ===== LIGHTS =====
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(orangeColor, 1, 50)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(lightOrangeColor, 0.5, 50)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // ===== ANIMATION =====
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Rotate entire scene slowly
      scene.rotation.y = elapsedTime * 0.1

      // Animate books (gentle floating)
      books.forEach((book, i) => {
        book.position.y += Math.sin(elapsedTime * 0.5 + i) * 0.002
        book.rotation.y += 0.003
      })

      // Animate documents (gentle wave)
      documents.forEach((doc, i) => {
        doc.position.y = Math.sin(elapsedTime * 0.8 + i * 0.5) * 0.5
        doc.rotation.x = Math.sin(elapsedTime + i) * 0.1
      })

      // Animate sphere (pulsing)
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.05
      sphere.scale.set(scale, scale, scale)
      sphere.rotation.x += 0.002
      sphere.rotation.y += 0.003

      // Animate data points (orbiting)
      dataPoints.forEach((point, i) => {
        const angle = elapsedTime * 0.3 + (i / dataPointCount) * Math.PI * 2
        const radius = 1.3 + Math.sin(elapsedTime * 2 + i) * 0.1
        
        point.position.x = radius * Math.sin(angle)
        point.position.z = radius * Math.cos(angle)
        point.position.y = Math.sin(elapsedTime * 0.5 + i) * 0.3 + 0.5
      })

      // Update connecting lines
      const newLinePositions: number[] = []
      for (let i = 0; i < dataPoints.length; i++) {
        const point1 = dataPoints[i]
        const point2 = dataPoints[(i + 1) % dataPoints.length]
        
        newLinePositions.push(point1.position.x, point1.position.y, point1.position.z)
        newLinePositions.push(point2.position.x, point2.position.y, point2.position.z)
      }
      lines.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(newLinePositions, 3)
      )

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const size = Math.min(containerRef.current.clientWidth, 500)
      camera.aspect = 1
      camera.updateProjectionMatrix()
      renderer.setSize(size, size)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      
      // Dispose geometries and materials
      books.forEach(book => {
        book.geometry.dispose()
        ;(book.material as THREE.Material).dispose()
      })
      documents.forEach(doc => {
        doc.geometry.dispose()
        ;(doc.material as THREE.Material).dispose()
      })
      sphere.geometry.dispose()
      ;(sphere.material as THREE.Material).dispose()
      dataPoints.forEach(point => {
        point.geometry.dispose()
        ;(point.material as THREE.Material).dispose()
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center"
    />
  )
}