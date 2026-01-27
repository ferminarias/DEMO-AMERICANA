export default function HomePage() {
  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(to bottom right, rgba(221, 163, 67, 0.1), rgba(221, 163, 67, 0.2))' }}>
      <div className="w-full h-screen">
        <iframe 
          src="/voice/embed" 
          className="w-full h-full border-none"
          allow="microphone"
          title="Asistente Virtual UNAB"
        />
      </div>
    </div>
  )
}
