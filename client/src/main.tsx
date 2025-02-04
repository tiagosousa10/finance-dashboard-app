import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {api} from '@/state/api'

export const store = configureStore({ // configure store to handle api requests
  reducer: {
    [api.reducerPath]: api.reducer, // api to handle api requests
  },
  middleware: (getDefault) => getDefault().concat(api.middleware) //middleware to handle api requests
})

setupListeners(store.dispatch)


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
