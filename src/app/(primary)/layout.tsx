import Sidebar from '@/components/Sidebar'
import { ReactNode } from 'react'

export default function LayoutPrimary({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div>{children}</div>
    </>
  )
}
