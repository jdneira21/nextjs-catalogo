import Sidebar from '@/components/Sidebar'
import { ReactNode } from 'react'

export default function LayoutPrimary({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className='tw-border tw-border-red-400' >{children}</div>
    </>
  )
}
