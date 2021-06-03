import { v4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'

const rootReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_POINT':
      return {
        ...state,
        points: [
          ...state.points,
          {
            id: v4(),
            name: payload.name,
            L0: payload.L0,
            start: moment(payload.start).format('HH:mm'),
            end: moment(payload.end).format('HH:mm'),
            value: payload.value,
            x: payload.x,
            y: payload.y
          }
        ]
      }
    case 'DELETE_POINT': {
      const newTasks = _.remove(state.points, (item) => {
        return item.id === payload
      })
      return {
        ...state,
        points: state.points.filter((it) => it.id !== newTasks[0])
      }
    }
    case 'UPDATE_POINT_LOCATION': {
      const indexOfUpdationElement = _.findIndex(
        state.points,
        (point) => point.id === payload.id
      )
      const updationObject = state.points[indexOfUpdationElement]

      updationObject.x = payload.x
      updationObject.y = payload.y

      return state
    }
    case 'UPDATE_POINT_DISTANCES': {
      return Object.assign({ ...state, linksData: payload })
    }
    default:
      return state
  }
}

export default rootReducer
