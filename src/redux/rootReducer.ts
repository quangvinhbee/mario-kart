import authReducer, { namespace as AuthNameSpace } from './common/auth'
import promoteReducer, { namespace as PromoteNameSpace } from './common/coin'
import settingReducer, { namespace as SettingNameSpace } from './common/setting'
import addCoinReducer, { namespace as AddCoinNameSpace } from './common/add-coin'

const rootReducer = {
  [PromoteNameSpace]: promoteReducer,
  [SettingNameSpace]: settingReducer,
  [AuthNameSpace]: authReducer,
  [AddCoinNameSpace]: addCoinReducer,
}

export default rootReducer
