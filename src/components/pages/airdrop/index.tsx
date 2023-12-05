import { ButtonGreen } from '@/components/common/Button/ButtonGreen'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const AirdropPage = () => {
  const { address } = useAccount()
  const [claimTestnetToken, setClaimTestnetToken] = useState('')
  const [airdropToken, setAirdropToken] = useState('')

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
          />
        </div>
        <div className="animate-move-down-up">
          <ButtonGreen className="ml-[16px] w-[140px] text-[15px]">Claim</ButtonGreen>
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
