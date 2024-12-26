import { Provider } from 'react-redux';
import store from './components/store/store';
const App = () => {
  return (
    <Provider store={store}>
    <Component {...pageProps} />
</Provider>
  )
}

export default App
