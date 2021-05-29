import { useContext } from 'react'
import storeContext from '../context'

const useStore = () => useContext(storeContext).store

export default useStore
