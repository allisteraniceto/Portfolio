import { useMemo } from 'react'

const BOOK_COLORS = [
  '#c44040', '#4080c4', '#40c470', '#c4a040',
  '#8040c4', '#c46040', '#40c4c4', '#c44080',
  '#6080c4', '#c48040', '#4040c4', '#80c440',
]

function Book({ position, height, color }: {
  position: [number, number, number]
  height: number
  color: string
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.06, height, 0.28]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  )
}

export default function Bookshelf() {
  const books = useMemo(() => {
    const shelves: Array<Array<{ x: number; height: number; color: string }>> = []
    for (let s = 0; s < 4; s++) {
      const shelfBooks: Array<{ x: number; height: number; color: string }> = []
      const numBooks = 6 + Math.floor(Math.random() * 4)
      let x = -0.65
      for (let b = 0; b < numBooks; b++) {
        const height = 0.2 + Math.random() * 0.18
        const color = BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)]
        shelfBooks.push({ x: x + 0.035, height, color })
        x += 0.075 + Math.random() * 0.02
        if (x > 0.65) break
      }
      shelves.push(shelfBooks)
    }
    return shelves
  }, [])

  return (
    <group position={[-5, 0, -3]}>
      {/* Back panel */}
      <mesh position={[0, 2.2, -0.18]}>
        <boxGeometry args={[1.8, 4.2, 0.04]} />
        <meshStandardMaterial color="#1a1208" roughness={0.7} />
      </mesh>

      {/* Side panels */}
      <mesh position={[-0.88, 2.2, 0]}>
        <boxGeometry args={[0.04, 4.2, 0.4]} />
        <meshStandardMaterial color="#2a1f14" roughness={0.6} />
      </mesh>
      <mesh position={[0.88, 2.2, 0]}>
        <boxGeometry args={[0.04, 4.2, 0.4]} />
        <meshStandardMaterial color="#2a1f14" roughness={0.6} />
      </mesh>

      {/* Top */}
      <mesh position={[0, 4.32, 0]}>
        <boxGeometry args={[1.8, 0.04, 0.4]} />
        <meshStandardMaterial color="#2a1f14" roughness={0.6} />
      </mesh>

      {/* Shelves */}
      {[0.1, 1.15, 2.2, 3.25].map((y, i) => (
        <group key={i}>
          <mesh position={[0, y, 0]}>
            <boxGeometry args={[1.72, 0.04, 0.38]} />
            <meshStandardMaterial color="#2a1f14" roughness={0.6} />
          </mesh>
          {/* Books on this shelf */}
          {books[i]?.map((book, j) => (
            <Book
              key={j}
              position={[book.x, y + 0.02 + book.height / 2, 0]}
              height={book.height}
              color={book.color}
            />
          ))}
        </group>
      ))}
    </group>
  )
}
