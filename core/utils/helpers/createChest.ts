import { type ExpoWebGLRenderingContext } from "expo-gl"
import { Renderer } from "expo-three"
import * as THREE from "three"

export const onContextCreateChest = (gl: ExpoWebGLRenderingContext) => {
  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  const renderer = new Renderer({ gl })
  renderer.setSize(width, height)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  const baseGeometry = new THREE.BoxGeometry(2, 1, 1)
  const baseMaterial = new THREE.MeshStandardMaterial({ color: "#8B4513" })
  const base = new THREE.Mesh(baseGeometry, baseMaterial)
  scene.add(base)

  const lidGeometry = new THREE.BoxGeometry(2, 0.5, 1)
  const lidMaterial = new THREE.MeshStandardMaterial({ color: "#A0522D" })
  const lid = new THREE.Mesh(lidGeometry, lidMaterial)
  lid.position.y = 0.75
  scene.add(lid)

  const lockGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.1)
  const lockMaterial = new THREE.MeshStandardMaterial({ color: "gold" })
  const lock = new THREE.Mesh(lockGeometry, lockMaterial)
  lock.position.set(0, 0, 0.55)
  scene.add(lock)

  const animate = () => {
    requestAnimationFrame(animate)

    base.rotation.y += 0.02
    lid.rotation.y += 0.02
    lock.rotation.y += 0.02

    renderer.render(scene, camera)
    gl.endFrameEXP()
  }

  animate()
}
