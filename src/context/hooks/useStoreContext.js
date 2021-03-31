import { useContext } from 'react'
import storeContext from '../context'

const useStoreContext = () => useContext(storeContext)

export default useStoreContext
