import React, { useState } from 'react'
import {Alert, Text, View} from 'react-native'
import { Icon } from "../../../components/common-ui";
import { AppColors } from '../../../AppColors';

import * as S from './styles'

export const Friend = ({ friend, handleSelect, handleDelete, pickMode, friendsPickToolkit }) => {
  const [selected, setSelected] = useState(friendsPickToolkit
    ? friendsPickToolkit.selectedFriends.some(f => f.id === friend.id)
    : false
  )

  const onSelect = () => handleSelect(friend)
  const onDelete = () => handleDelete({ friend })

  const handleSelectInPickMode = () => {
    if (selected) {
      friendsPickToolkit.deleteSelectedFriend(friend)
      setSelected(false)
    } else {
      friendsPickToolkit.pushNewSelectedFriend(friend)
      setSelected(true)
    }
  }

  const showAlert = () =>
    Alert.alert(
      `${friend.name}`,
      `Вы уверены в том, что хотите удалить данного пользователя из друзей?`,
      [
        {
          text: "Удалить",
          onPress: onDelete,
          style: "default",
        },
        {
          text: "Отмена",
          onPress: () => {},
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );

  return (
    <S.FriendWrapper selected={selected}>
      <S.Info onPress={onSelect}>
        <Icon iconName={'smileo'} size={30} wrapperStyle={{ paddingRight: 10 }}/>
        <View>
          <Text style={{fontWeight: 'bold'}}>{friend.name}</Text>
          <Text style={{fontSize: 11}}>{friend.createdAt}</Text>
        </View>
      </S.Info>
      {!pickMode &&
        <S.Edit>
          <Icon
            iconName={'deleteuser'}
            size={30}
            onPress={() => showAlert()}
          />
        </S.Edit>
      }
      {pickMode &&
        <S.Edit>
          <Icon
            iconName={selected ? 'minuscircleo' : 'pluscircleo'}
            size={30}
            onPress={handleSelectInPickMode}
          />
        </S.Edit>
      }
    </S.FriendWrapper>
  )
}
