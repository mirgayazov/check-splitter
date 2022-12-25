import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import moment from "moment";

export const FriendsDM = {
  addFriend: async ({ friend, cb }) => {
    try {
      friend = {...friend, id: uuid.v4(), createdAt: moment().format('DD.MM.YYYY')}
      const user = JSON.parse(await AsyncStorage.getItem('user'))

      if (user.friends) {
        user.friends.push(friend)
      } else {
        user.friends = [friend]
      }

      await AsyncStorage.setItem('user', JSON.stringify(user))
      cb({ friend })
    } catch(e) {
    }
  },

  editFriend: async ({ editedFriend, cb }) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'))
      user.friends = user.friends.map(friend => {
        if (friend.id !== editedFriend.id) {
          return friend
        }

        return editedFriend
      })

      await AsyncStorage.setItem('user', JSON.stringify(user))
      cb({ friends: user.friends})
    } catch(e) {
    }
  },

  deleteFriend: async ({ deletedFriend }) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'))
      user.friends = user.friends.filter(friend => friend.id !== deletedFriend.id)

      await AsyncStorage.setItem('user', JSON.stringify(user))

      return user.friends
    } catch(e) {
    }
  },

  getFriends: async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'))

      return user.friends ? user.friends : []
    } catch(e) {
      return []
    }
  },
}
