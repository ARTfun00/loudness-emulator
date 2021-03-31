import { v4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POINT':
      return {
        ...state,
        points: [
          ...state.points,
          {
            id: v4(),
            pointName: action.payload.pointName,
            start: moment(action.payload.start).format('HH:mm'),
            end: moment(action.payload.end).format('HH:mm'),
            value: action.payload.value
          }
        ]
      }
    case 'DELETE_POINT': {
      const newTasks = _.remove(state.points, (item) => {
        return item.id === action.payload
      })
      return {
        ...state,
        points: state.points.filter((it) => it.id !== newTasks[0])
      }
    }
    default:
      return state
  }
}

export default rootReducer
