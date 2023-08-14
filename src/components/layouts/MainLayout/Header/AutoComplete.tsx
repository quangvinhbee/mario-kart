import useDebounce from '@/lib/hooks/useDebounce'
import CoinApi from '@/services/coin.api'
import {
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  TextField,
} from '@mui/material'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosSearch } from 'react-icons/io'
import { IoInformation } from 'react-icons/io5'

const AutoComplete = () => {
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
    <div ref={wrapperRef} className="relative px-2">
      <TextField
        size="small"
        placeholder={t('findSomething') + '...'}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setShowSuggestion(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton size="small">
                <IoIosSearch className="text-[24px] leading-none text-white" />
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
      {isShowSuggestion && (
        <div className="absolute top-full left-0 right-0 pt-[12px] text-sm">
          <Paper className="p-2">
            <p>{t('suggestion')}</p>
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
  )
}

export default AutoComplete
