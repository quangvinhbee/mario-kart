import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export const YourGaragePage = () => {
  const { address } = useAccount()

  useEffect(() => {}, [address])

  return (
    <div className="flex justify-center items-center">
      <p className="text-center text-[#BDBDBD] text-[68px]">(Coming soon)</p>
    </div>
  )
}
