import { ReactNode } from 'react'

export default function LayoutCategory({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='child-blog container mx-auto'>{children}</div>
    </>
  )
}
