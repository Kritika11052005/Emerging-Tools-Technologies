import { useEffect, useRef } from "react"
import * as THREE from "three"

// Singleton instance tracker
class SceneManager {
  private static instance: THREE.Scene | null = null
  private static renderer: THREE.WebGLRenderer | null = null
  private static animationId: number | null = null
  private static isCreating: boolean = false

  static hasInstance(): boolean {
    return this.instance !== null
  }

  static setInstance(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
    this.instance = scene
    this.renderer = renderer
  }

  static setAnimationId(id: number) {
    this.animationId = id
  }

  static cleanup() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    this.instance = null
    this.renderer?.dispose()
    this.renderer = null
    this.isCreating = false
  }

  static startCreating() {
    this.isCreating = true
  }

  static isCurrentlyCreating() {
    return this.isCreating
  }
}

export function DataSphereBooks3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const localSceneRef = useRef<THREE.Scene | null>(null)
  const localRendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    // Prevent double initialization in StrictMode
    if (mountedRef.current) return
    mountedRef.current = true

    if (!containerRef.current) return
    
    // Check if scene already exists or is being created
    if (SceneManager.hasInstance() || SceneManager.isCurrentlyCreating()) {
      console.log("Scene already exists or being created, skipping...")
      return
    }

    SceneManager.startCreating()
    console.log("Creating SINGLE 3D scene (StrictMode safe)")

    const scene = new THREE.Scene()
    localSceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 6
    camera.position.y = 0

    const container = containerRef.current
    const size = Math.min(container.clientWidth, container.clientHeight, 600)
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    localRendererRef.current = renderer

    // Register with singleton manager
    SceneManager.setInstance(scene, renderer)

    const orangeColor = 0xff6b35
    const lightOrangeColor = 0xff8c5a
    const creamColor = 0xfff5e6

    // ===== BOOKS =====
    const books: THREE.Mesh[] = []
    const bookCount = 6

    for (let i = 0; i < bookCount; i++) {
      const width = 0.6 + Math.random() * 0.3
      const height = 0.8 + Math.random() * 0.4
      const depth = 0.12
      
      const bookGeometry = new THREE.BoxGeometry(width, height, depth)
      const bookMaterial = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? orangeColor : lightOrangeColor,
        metalness: 0.3,
        roughness: 0.5,
      })
      const book = new THREE.Mesh(bookGeometry, bookMaterial)
      
      const angle = (i / bookCount) * Math.PI * 2
      const radius = 3.5
      book.position.x = Math.cos(angle) * radius
      book.position.z = Math.sin(angle) * radius
      book.position.y = -0.5 + Math.random() * 1
      
      book.rotation.x = Math.random() * 0.3
      book.rotation.y = angle + Math.PI / 2
      book.rotation.z = Math.random() * 0.2
      
      scene.add(book)
      books.push(book)
    }

    // ===== DOCUMENTS =====
    const documents: THREE.Mesh[] = []
    const documentCount = 5

    for (let i = 0; i < documentCount; i++) {
      const docGeometry = new THREE.PlaneGeometry(0.8, 1.1)
      const docMaterial = new THREE.MeshStandardMaterial({
        color: creamColor,
        side: THREE.DoubleSide,
        metalness: 0.1,
        roughness: 0.7,
      })
      const document = new THREE.Mesh(docGeometry, docMaterial)
      
      const angle = (i / documentCount) * Math.PI * 2 + Math.PI / 5
      const radius = 3
      document.position.x = Math.cos(angle) * radius
      document.position.z = Math.sin(angle) * radius
      document.position.y = Math.random() * 2 - 1
      
      document.rotation.y = angle
      
      scene.add(document)
      documents.push(document)
    }

    // ===== SINGLE SPHERE =====
    console.log("Adding SINGLE sphere to scene")
    const sphereGeometry = new THREE.SphereGeometry(2.2, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: orangeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(0, 0, 0)
    scene.add(sphere)

    // ===== DATA POINTS =====
    const dataPoints: THREE.Mesh[] = []
    const dataPointCount = 40

    for (let i = 0; i < dataPointCount; i++) {
      const pointGeometry = new THREE.SphereGeometry(0.06, 8, 8)
      const pointMaterial = new THREE.MeshStandardMaterial({
        color: lightOrangeColor,
        emissive: orangeColor,
        emissiveIntensity: 0.6,
      })
      const point = new THREE.Mesh(pointGeometry, pointMaterial)
      
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 2.4
      
      point.position.x = radius * Math.sin(phi) * Math.cos(theta)
      point.position.y = radius * Math.cos(phi)
      point.position.z = radius * Math.sin(phi) * Math.sin(theta)
      
      scene.add(point)
      dataPoints.push(point)
    }

    // ===== LINES =====
    const linesMaterial = new THREE.LineBasicMaterial({
      color: orangeColor,
      transparent: true,
      opacity: 0.4,
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(orangeColor, 1.2, 50)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(lightOrangeColor, 0.8, 50)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0xffffff, 0.5, 50)
    pointLight3.position.set(0, 5, -5)
    scene.add(pointLight3)

    // ===== ANIMATION =====
    const clock = new THREE.Clock()

    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      SceneManager.setAnimationId(animationId)
      
      const elapsedTime = clock.getElapsedTime()

      scene.rotation.y = elapsedTime * 0.08

      books.forEach((book, i) => {
        book.position.y += Math.sin(elapsedTime * 0.5 + i) * 0.001
        book.rotation.y += 0.002
      })

      documents.forEach((doc, i) => {
        doc.position.y = Math.sin(elapsedTime * 0.6 + i * 0.5) * 0.4
        doc.rotation.x = Math.sin(elapsedTime + i) * 0.08
      })

      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.1
      sphere.scale.set(scale, scale, scale)
      sphere.rotation.x += 0.004
      sphere.rotation.y += 0.005

      dataPoints.forEach((point, i) => {
        const angle = elapsedTime * 0.25 + (i / dataPointCount) * Math.PI * 2
        const radius = 2.4 + Math.sin(elapsedTime * 1.5 + i) * 0.2
        
        point.position.x = radius * Math.sin(angle)
        point.position.z = radius * Math.cos(angle)
        point.position.y = Math.sin(elapsedTime * 0.4 + i) * 0.5
        
        const pointScale = 1 + Math.sin(elapsedTime * 3 + i) * 0.3
        point.scale.set(pointScale, pointScale, pointScale)
      })

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

    const handleResize = () => {
      if (!containerRef.current) return
      const newSize = Math.min(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
        600
      )
      camera.aspect = 1
      camera.updateProjectionMatrix()
      renderer.setSize(newSize, newSize)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      console.log("Cleaning up 3D scene")
      mountedRef.current = false
      
      window.removeEventListener("resize", handleResize)
      
      if (containerRef.current && localRendererRef.current?.domElement) {
        containerRef.current.removeChild(localRendererRef.current.domElement)
      }
      
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
      lines.geometry.dispose()
      linesMaterial.dispose()
      
      SceneManager.cleanup()
      localSceneRef.current = null
      localRendererRef.current = null
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center"
    />
  )
}