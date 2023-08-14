import { Theme } from '@mui/material/styles'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import Pagination from './Pagination'
import Paper from './Paper'
import Select from './Select'
import Tabs from './Tabs'

export default function componentsOverrides(theme: Theme) {
  return {
    ...Input(theme),
    ...Select(theme),
    ...Label(theme),
    ...Button(theme),
    ...Tabs(theme),
    ...Paper(theme),
    ...Pagination(theme),
  }
}
