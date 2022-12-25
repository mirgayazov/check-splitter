import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import moment from "moment";

export const PlacesDM = {
  addPlace: async ({ place, cb }) => {
    try {
      place = {...place, id: uuid.v4(), createdAt: moment().format('DD.MM.YYYY')}
      const user = JSON.parse(await AsyncStorage.getItem('user'))

      if (user.places) {
        user.places.push(place)
      } else {
        user.places = [place]
      }

      await AsyncStorage.setItem('user', JSON.stringify(user))
      cb({ place })
    } catch(e) {
    }
  },

  editPlace: async ({ editedPlace, cb }) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'))
      user.places = user.places.map(place => {
        if (place.id !== editedPlace.id) {
          return place
        }

        return editedPlace
      })

      await AsyncStorage.setItem('user', JSON.stringify(user))
      cb({ places: user.places})
    } catch(e) {
    }
  },

  deletePlace: async ({ deletedPlace }) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'))
      user.places = user.places.filter(place => place.id !== deletedPlace.id)

      await AsyncStorage.setItem('user', JSON.stringify(user))

      return user.places
    } catch(e) {
    }
  },

  getPlaces: async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'))

      return user.places ? user.places : []
    } catch(e) {
      return []
    }
  },
}
