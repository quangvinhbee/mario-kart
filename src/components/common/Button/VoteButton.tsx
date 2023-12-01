import { RECAPTCHA_SITE_KEY } from '@/configs/app'
import { upvoteCoin } from '@/redux/common/coin'
import CoinApi from '@/services/coin.api'
import { Button, ButtonProps } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { AiOutlineLoading } from 'react-icons/ai'
import { IoRocketSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

type VoteButtonProps = ButtonProps & {
  className?: string
  coin: any
}

export function VoteButton({ coin, className = '', ...props }: VoteButtonProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'upvoteButtonComponent' })
  const dispatch = useDispatch()
  const lastVotedAt = useSelector((state: any) => state.CoinCommonSlice?.lastVotedAt)
  const [isLoading, setLoading] = useState(false)
  const [totalVotes, setTotalVotes] = useState(coin?.totalVotes || 0)

  const coinLastVotedAt = new Date(lastVotedAt?.[coin?.slug] || null)
  const coinLastVotedFromNowByMinutes = (Date.now() - coinLastVotedAt.valueOf()) / (1000 * 60)

  const handleUpvote = async (slug: string, token: string) => {
    try {
      if (coinLastVotedFromNowByMinutes < 30) {
        setLoading(false)
        return toast.error(
          t('voteErrorWait', { minutes: Math.ceil(30 - coinLastVotedFromNowByMinutes) })
        )
      }
      await CoinApi.upvoteCoinBySlug({ slug, recaptchaToken: token })
      setTotalVotes(totalVotes + 1)
      dispatch(upvoteCoin(slug as any))
      toast.success(t('voteSuccess'))
    } catch (error) {}
    setLoading(false)
  }

  const handleExecuteReCaptchaToVote = () => {
    setLoading(true)

    const w: any = window

    w.grecaptcha.ready(() => {
      w.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' }).then((token: any) => {
        handleUpvote(coin?.slug, token)
      })
    })
  }

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleExecuteReCaptchaToVote()
        }}
        {...props}
      >
        <div className="shake flex items-center space-x-2">
          {isLoading ? (
            <AiOutlineLoading className="animate-spin text-[#9570FF]" />
          ) : (
            <IoRocketSharp
              className={
                'rocket' +
                ` ${props?.variant === 'contained' ? 'text-[#FFFFFF]' : 'text-[#9570FF]'}`
              }
            />
          )}
          <p>{totalVotes}</p>
        </div>
      </Button>
    </>
  )
}
