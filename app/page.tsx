'use client'
import {Provider} from 'react-redux'
import store from '@/store/store'
import App from './app'


export default  function Home() {

  return (
    <Provider store={store}>
     <App />
    </Provider>
  )
}
