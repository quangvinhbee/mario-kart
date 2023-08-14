import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'
const reducer = combineReducers(rootReducer)

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  reducer: persistedReducer,
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export default store
