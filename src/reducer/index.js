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
    case 'UPDATE_POINT': {
      const { points } = state
      const { id, x, y, linksData } = payload

      if (id) {
        const indexOfUpdationElement = _.findIndex(
          points,
          (point) => point.id === id
        )
        const updationObject = points[indexOfUpdationElement]

        updationObject.x = x
        updationObject.y = y
      }

      // updating of distance between points
      if (linksData?.length) {
        linksData.forEach(({ sourceId, distanceInMetersToSource }) => {
          points.forEach((point) => {
            if (point.id === sourceId) {
              point.distanceInMetersToSource = distanceInMetersToSource
            }
          })
        })
      }

      return Object.assign({ ...state, linksData: linksData })
    }
    case 'INIT_POINTS': {
      const { points } = state
      const { linksData } = payload

      // updating of distance between points
      if (linksData?.length) {
        linksData.forEach(({ sourceId, distanceInMetersToSource }) => {
          points.forEach((point) => {
            if (point.id === sourceId) {
              point.distanceInMetersToSource = distanceInMetersToSource
            }
          })
        })
      }

      return Object.assign({ ...state, linksData: linksData || [] })
    }
    default:
      return state
  }
}

export default rootReducer
