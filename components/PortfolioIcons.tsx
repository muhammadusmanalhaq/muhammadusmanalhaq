export function Arrow({ direction = 'up' }: { direction?: 'up' | 'down' | 'right' | 'left' }) {
  const paths = {
    up: 'M4 12 12 4M5 4h7v7',
    down: 'M8 3v10m-4-4 4 4 4-4',
    right: 'M3 8h10M9 4l4 4-4 4',
    left: 'M13 8H3m4-4L3 8l4 4',
  }
  return <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={paths[direction]} /></svg>
}

export function Mark() {
  return <svg aria-hidden="true" viewBox="0 0 36 36" width="36" height="36" fill="none"><rect x=".5" y=".5" width="35" height="35" stroke="currentColor" /><path d="M8 24V12l5 6 5-6v12m4-12v8a4 4 0 0 0 8 0v-8" stroke="currentColor" strokeWidth="1.6" /></svg>
}
