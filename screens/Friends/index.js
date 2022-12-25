import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, ActivityIndicator, Text, View } from 'react-native'
import { Icon, TextInput, Heading, Button } from "../../components/common-ui";
import { AddFriendForm } from "../../components/Forms/AddFriend";
import { EditFriendForm } from "../../components/Forms/EditFriend";
import { Friend } from "./Friend";

import * as S from './styles'
import { AppDM } from "../../AppDataManager";
import { AppColors } from '../../AppColors';

export const FriendsScreen = ({ frc, pickMode = false, friendsPickToolkit = null }) => {
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false)
  const [friends, setFriends] = useState([])
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [user, setUser] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)
    setTimeout(() => setIsFetching(false), 100)
    AppDM.getUser().then((user) => {
      setUser(user)
      if (user) {
        AppDM.getFriends().then((friends) => {
          setFriends(friends)
        })
      }
    })
  }, [frc])

  const handleSuccessfulAddFriend = ({ friend }) => {
    setFriends([...friends, friend])
    setAddFriendModalVisible(false)
  }

  const handleSuccessfulEditFriend = ({ friends }) => {
    setFriends(friends)
    setSelectedFriend(null)
  }

  const handleDeleteFriend = ({ friend }) => {
    AppDM.deleteFriend({ deletedFriend: friend })
      .then((friends) => { setFriends(friends) })
  }

  const renderFriends = () => {
    return (
      <>
        <S.FriendsListWrapper>
          <ScrollView>
            <View style={{ height: 10 }}>

            </View>
            {friends.map(friend => <Friend
              key={friend.id}
              friend={friend}
              pickMode={pickMode}
              friendsPickToolkit={friendsPickToolkit}
              handleSelect={setSelectedFriend}
              handleDelete={handleDeleteFriend}
            />)}
          </ScrollView>
        </S.FriendsListWrapper>
        {!pickMode &&
          <S.ControlPanel>
            <S.SearchWrapper>
              {/* <TextInput placeholder={'Ищите друзей...'} wrapperStyle={{ flex: 1 }}/>
              <Icon iconName='search1' color='blue' size={30} wrapperStyle={{ padding: 10 }}/> */}
            </S.SearchWrapper>
            <Button
              onPress={() => setAddFriendModalVisible(true)}
              title={'Добавить друга'}
            />
            {/* <Icon
              iconName='adduser'
              color={AppColors.monochromesShade3}
              size={30}
              onPress={() => setAddFriendModalVisible(true)}
              wrapperStyle={{ padding: 10 }}
            /> */}
            <Modal
              animationType="slide"
              visible={addFriendModalVisible}
            >
              <S.FriendsWrapper>
                <AddFriendForm cb={handleSuccessfulAddFriend} />
              </S.FriendsWrapper>
            </Modal>
            <Modal
              animationType="slide"
              visible={!!selectedFriend}
            >
              <S.FriendsWrapper>
                <EditFriendForm friend={selectedFriend} cb={handleSuccessfulEditFriend} />
              </S.FriendsWrapper>
            </Modal>
          </S.ControlPanel>
        }
      </>
    )
  }

  const renderUser404 = () => {
    return (
      <>
        <Heading title={'Войдите в аккаунт'} />
      </>
    )
  }

  return (
    <S.FriendsWrapper>
      {isFetching
        ?
        <>
          <ActivityIndicator size="large" color="blue" />
        </>
        :
        <>
          {user && renderFriends()}
          {!user && renderUser404()}
        </>
      }
    </S.FriendsWrapper>
  )
}
