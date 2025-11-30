import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] gap-10 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <h2>404 Not Found</h2>
        <div className="divider divider-horizontal h-10 my-auto"></div>
        <p>Could not find requested resource</p>
      </div>
      <Link href="/" className="link text-primary">Return Home</Link>
    </div>
  )
}
