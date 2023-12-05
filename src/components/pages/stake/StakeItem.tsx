import { ButtonGreen } from '@/components/common/Button/ButtonGreen'
import { FC, useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useAccount } from 'wagmi'

interface IStakeItemProps {
  stake: any
}

export const StakeItem: FC<IStakeItemProps> = (props) => {
  const { stake } = props
  const { address } = useAccount()
  const [amount, setAmount] = useState(0)

  useEffect(() => {}, [address])

  return (
    <div className="bg-[#545454] rounded-[22px] text-white">
      <div className="p-[20px]">
        <div className="flex items-center space-x-[8px]">
          <img className="w-[28px] h-[28px] object-contain" src={stake?.icon} alt="" />
          <div className="flex-grow">
            <p className="text-[10px]">Total rewards</p>
            <p className="text-[18px]">
              <span className="text-[10px] text-[#FFD91D]">{stake?.symbolPrefix}</span>
              {stake?.symbol}
            </p>
          </div>
          <div className="">
            <p className="text-[8px] text-[#B6B7BC]">Price</p>
            <p className="text-[15px] text-[#4EB947]">${stake?.price}</p>
          </div>
        </div>
        <p className="text-[19px] mt-[16px]">0.00000 ($0.00)</p>
        <div className="flex space-x-[8px] mt-[24px]">
          <ButtonGreen className="text-[8px] w-[80px]">Compound</ButtonGreen>
          <ButtonGreen className="text-[9px] w-[80px]">Claim</ButtonGreen>
        </div>
      </div>
      <div className="bg-[#373737] rounded-[22px] p-[20px]">
        <div className="flex items-center space-x-[8px]">
          <img className="w-[28px] h-[28px] object-contain" src={stake?.icon} alt="" />
          <div className="flex-grow">
            <p className="text-[10px]">Enter stake amount</p>
            <p className="text-[18px]">
              <span className="text-[10px] text-[#FFD91D]">{stake?.symbolPrefix}</span>
              {stake?.symbol}
            </p>
          </div>
        </div>
        <NumericFormat
          className="w-full mt-[20px] text-[19px] placeholder:text-[#A2A2A2] text-[#A2A2A2] outline-none text-right font-retro"
          value={amount || ''}
          onValueChange={(e) => setAmount(+e?.value || 0)}
          placeholder="0.00000"
          decimalScale={5}
          thousandSeparator
        />
        <ButtonGreen className="text-[9px] w-[80px] block mx-auto mt-[12px]">Stake</ButtonGreen>
      </div>
    </div>
  )
}
