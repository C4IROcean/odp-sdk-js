import * as https from "https"
import { IBoundingBox, IGeoLocation } from "./types"

export const throttleActions = (listOfCallableActions, limit, stream?) => {
  // We'll need to store which is the next promise in the list.
  let i = 0
  const resultArray = new Array(listOfCallableActions.length)

  // Now define what happens when any of the actions completes. Javascript is
  // (mostly) single-threaded, so only one completion handler will call at a
  // given time. Because we return doNextAction, the Promise chain continues as
  // long as there's an action left in the list.
  const doNextAction = () => {
    if (i < listOfCallableActions.length) {
      // Save the current value of i, so we can put the result in the right place
      const actionIndex = i++
      const nextAction = listOfCallableActions[actionIndex]
      return Promise.resolve(nextAction())
        .then(result => {
          // Save results to the correct array index.
          if (stream) {
            stream.push(result)
          } else {
            resultArray[actionIndex] = result
          }
          return
        })
        .then(doNextAction)
    }
  }

  // Now start up the original <limit> number of promises.
  // i advances in calls to doNextAction.
  const listOfPromises = []
  while (i < limit && i < listOfCallableActions.length) {
    listOfPromises.push(doNextAction())
  }
  return Promise.all(listOfPromises).then(() => {
    if (stream) {
      // close stream
      stream.push(null)
    }
    return resultArray
  })
}

export const getMRGIDBoundingBox = (mrgid: number): Promise<IBoundingBox> =>
  new Promise((resolve, reject) => {
    const url = `https://marineregions.org/mrgid/${mrgid}`
    https
      .get(url, res => {
        let body = ""

        res.on("data", chunk => {
          body += chunk
        })

        res.on("end", () => {
          try {
            const json = JSON.parse(body)
            return resolve({
              bottomLeft: { latitude: json.minLatitude, longitude: json.minLongitude },
              topRight: { latitude: json.maxLatitude, longitude: json.maxLongitude },
            })
          } catch (error) {
            return reject(error)
          }
        })
      })
      .on("error", error => reject(error))
  })

// Convert a bounding box to polygon
export const boundingBoxToPolygon = (bb: IBoundingBox): IGeoLocation[] => [
  { latitude: bb.bottomLeft.latitude, longitude: bb.bottomLeft.longitude },
  { latitude: bb.topRight.latitude, longitude: bb.bottomLeft.longitude },
  { latitude: bb.topRight.latitude, longitude: bb.topRight.longitude },
  { latitude: bb.bottomLeft.latitude, longitude: bb.topRight.longitude },
  { latitude: bb.bottomLeft.latitude, longitude: bb.bottomLeft.longitude },
]
