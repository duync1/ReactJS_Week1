import storage from 'redux-persist/lib/storage'

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // chỉ lưu auth, không lưu products
}
