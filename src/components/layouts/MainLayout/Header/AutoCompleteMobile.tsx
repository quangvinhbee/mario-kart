import useDebounce from '@/lib/hooks/useDebounce'
import CoinApi from '@/services/coin.api'
import { IconButton, InputAdornment, MenuItem, MenuList, Paper, TextField } from '@mui/material'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillCloseCircle, AiOutlineClose } from 'react-icons/ai'
import { IoIosArrowRoundBack, IoIosSearch } from 'react-icons/io'

interface AutoCompleteMobileProps {
  onClose: VoidFunction
}

const AutoCompleteMobile = ({ onClose }: AutoCompleteMobileProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'mainLayout.autoComplete' })
  const [isShowSuggestion, setShowSuggestion] = useState(false)
  const [search, setSearch] = useState('')
  const [coins, setCoins] = useState([])
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const searchDebounce = useDebounce(search, 500)

  useEffect(() => {
    const getListCoin = async () => {
      const res = await CoinApi.getCoins({ search })
      setCoins(res?.data)
    }
    getListCoin()
    setShowSuggestion(true)
  }, [searchDebounce])

  useEffect(() => {
    function closeMoreMenu(e: MouseEvent) {
      if (e.target !== wrapperRef.current && !wrapperRef.current?.contains(e.target as Node)) {
        setShowSuggestion(false)
      }
    }
    window.addEventListener('mousedown', closeMoreMenu)
    return () => {
      window.removeEventListener('mousedown', closeMoreMenu)
    }
  })

  return (
    <>
      <div className="fixed top-0 left-0 flex h-18 w-full items-center justify-between border-b border-black bg-white p-3 dark:bg-[#1B1B44] sm:hidden">
        <IoIosArrowRoundBack className="cursor-pointer text-[32px]" onClick={onClose} />
        <TextField
          size="small"
          placeholder={t('findSomething') + '...'}
          value={search}
          className="ml-4 flex-grow"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowSuggestion(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton size="small" onClick={() => setShowSuggestion(true)}>
                  <IoIosSearch className="text-[24px] leading-none text-white" />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <AiFillCloseCircle className="text-[24px] leading-none text-[#7E7EA0]" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '.MuiOutlinedInput-root': {
              backgroundColor: '#11112C',
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none !important',
            },
            input: {
              '&::placeholder': {
                color: '#7E7EA0',
              },
            },
          }}
        />
      </div>
      <div ref={wrapperRef} className="relative px-2 sm:hidden">
        {isShowSuggestion && (
          <div className="absolute top-full left-0 right-0 text-sm">
            <Paper className="p-2">
              <p className="flex items-center justify-between">
                {t('suggestion')}
                <AiOutlineClose onClick={() => setShowSuggestion(false)} />
              </p>
              {coins?.length > 0 ? (
                <MenuList>
                  {coins.map((item, i) => (
                    <Link className="flex" href={`/coin/${item?.slug}`}>
                      <MenuItem
                        className="group flex items-center"
                        onClick={() => setShowSuggestion(false)}
                      >
                        <img className="mr-2 w-[26px] rounded-full" src={item?.logo} alt="" />
                        <div className="grow text-sm font-semibold group-hover:text-[#FFF]">
                          {item?.name}
                        </div>
                        <div className="text-sm group-hover:text-[#FFF]">{item?.symbol}</div>
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              ) : (
                <div className="flex min-h-[150px] items-center justify-center opacity-40">
                  {t('empty')}
                </div>
              )}
            </Paper>
          </div>
        )}
      </div>
    </>
  )
}

export default AutoCompleteMobile
