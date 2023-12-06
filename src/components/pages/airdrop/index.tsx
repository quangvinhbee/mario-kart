import { ButtonGreen } from '@/components/common/Button/ButtonGreen'
import axios from 'axios'
import { isAddress } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount } from 'wagmi'

export const AirdropPage = () => {
  const { address } = useAccount()
  const [claimTestnetToken, setClaimTestnetToken] = useState('')
  const [airdropToken, setAirdropToken] = useState('')
  const [isClaiming, setIsClaiming] = useState(false)

  const claim = async () => {
    try {
      if (!isAddress(claimTestnetToken)) {
        toast.error('Invalid ERC20 address, please re-enter correctly.')
        return
      }
      setIsClaiming(true)
      const data = await axios.post('https://api.0xrace.io/claim', {
        wallet: claimTestnetToken,
      })
      const res = data.data
      if (res.status == 200) {
        toast.success(res.message)
      } else if (res.status == 401) {
        toast.error(res.message)
      }
    } catch (e) {
      console.log(e.message)
    } finally {
      setIsClaiming(false)
    }
  }

  useEffect(() => {}, [address])

  return (
    <div className="max-w-[1000px] mx-auto">
      <p className="text-[36px]">CLAIM TESTNET TOKEN</p>
      <div className="flex mt-[20px] items-center">
        <div className="aspect-[394/63] max-w-[394px] w-full relative">
          <img
            src="/assets/game/button-yellow.svg"
            className="w-full text-[#FFFF92] max-w-[394px]"
          />
          <input
            className="absolute top-[50%] translate-y-[-50%] inset-x-[20px] placeholder:text-[#939393] font-retro outline-none"
            value={claimTestnetToken}
            onChange={(e) => setClaimTestnetToken(e?.target?.value)}
            placeholder="Wallet address"
            disabled={isClaiming}
          />
        </div>
        <div className="animate-move-down-up">
          <ButtonGreen
            className="ml-[16px] w-[140px] text-[15px]"
            onClick={() => claim()}
            disabled={isClaiming}
          >
            {isClaiming ? 'Claiming...' : 'Claim'}
          </ButtonGreen>
        </div>
      </div>
      <p className="text-[36px] mt-[60px]">AIRDROP TOKEN</p>
      <div className="flex mt-[20px] items-center">
        <div className="aspect-[394/63] max-w-[394px] w-full relative">
          <img
            src="/assets/game/button-yellow.svg"
            className="w-full text-[#FFFF92] max-w-[394px]"
          />
          <input
            className="absolute top-[50%] translate-y-[-50%] inset-x-[20px] placeholder:text-[#939393] font-retro outline-none"
            value={airdropToken}
            onChange={(e) => setAirdropToken(e?.target?.value)}
            placeholder="Wallet address"
          />
        </div>
        <div className="animate-move-down-up">
          <ButtonGreen className="ml-[16px] w-[140px] text-[15px]" disabled>
            Claim
          </ButtonGreen>
        </div>
      </div>
    </div>
  )
}
