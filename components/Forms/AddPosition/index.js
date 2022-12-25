import {Formik} from "formik";
import { Button, TextInput, Heading } from "../../common-ui";
import * as Yup from 'yup';
import React, { useState } from 'react'
import * as S from './styles'
import {AppDM} from "../../../AppDataManager";
import {Alert, ScrollView, Text, View} from "react-native";
import moment from "moment";
import uuid from "react-native-uuid";

const AddPositionSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, '* слишком короткое имя')
    .max(50, '* слишком длинное имя')
    .required('* заполните поле'),
})

export const AddPositionForm = ({ cb, onSave, friends, positionsToolkit }) => {
  const [positionFriends, setPositionFriends] = useState([])
  const [friendsParts, setFriendsParts] = useState(Array.from(friends, (f) => ({id: f.id, name: f.name, parts: 0})))

  const resetFriendPartsCountBeforeRemove = (friend) => {
    let newFriendsParts = friendsParts.map(f => {
      if (f.id === friend.id) {
        f.parts = 0
      }

      return f
    })

    setFriendsParts(newFriendsParts)
  }

  const handleSelect = (friend) => {
    if (positionFriends.find(f => f.id === friend.id)) {
      resetFriendPartsCountBeforeRemove(friend)
      setPositionFriends(positionFriends.filter(f => f.id !== friend.id))
    } else {
      setPositionFriends([...positionFriends, friend])
    }
  }

  const showEmptyPositionFriendAlert = () =>
    Alert.alert(
      "Укажите потребителей!",
      `Список потребителей позиции пуст.`,
      [
        {
          text: "Хорошо",
          onPress: () => {},
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );

  const showAlert = () =>
    Alert.alert(
      "Распределите части!",
      `Не все части распределены между друзьями.`,
      [
        {
          text: "Хорошо",
          onPress: () => {},
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );

  return (
    <ScrollView>
      <Formik
        initialValues={{ name: '', price: '', parts: '1' }}
        onSubmit={(position) => {
          let realParts = position.parts

          if (positionFriends.length === 0) {
            console.log('0 друзей')
            showEmptyPositionFriendAlert()
            return
          }

          if (positionFriends.length === 1) {
            console.log('Делим на одного')
            let newFriendsParts = friendsParts.map(f => {
              if (f.id === positionFriends[0].id) {
                f.parts = +position.parts
              } else {
                f.parts = 0
              }
              return f
            })

            setFriendsParts(newFriendsParts)
          }

          if (positionFriends.length > 1 && +position.parts !== 1) {
            console.log('Несколько друзей и много частей')

            let partsCount = friendsParts.reduce((prev, current) => {
              return prev + current.parts
            }, 0)

            if (partsCount !== +position.parts) {
              showAlert()
              return
            }
          }

          if (positionFriends.length > 1 && +position.parts === 1) {
            console.log('Несколько друзей и 1 часть')
            realParts = ''+positionFriends.length
            let newFriendsParts = friendsParts.map(f => {
              if (Array.from(positionFriends, p => p.id).includes(f.id)) {
                f.parts = 1
              }
              return f
            })
            setFriendsParts(newFriendsParts)
          }

          let newFriendsParts = friendsParts.map(f => {
            if (+f.parts) {
              f.cost = Math.ceil((+position.price / realParts) * f.parts)
            } else {
              f.cost = 0
            }

            return f
          })
          position.friends = newFriendsParts.filter(f => f.cost)
          position.realParts = realParts
          position.id = uuid.v4()

          positionsToolkit.addNewPosition(position)
          console.log(position)
          onSave()
        }}
        validationSchema={AddPositionSchema}
      >
        {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
          }) => (
          <S.FormWrapper>
            <Heading title={'Новая позиция'} wrapperStyle={{ paddingBottom: 20 }}/>
            <Heading title={'Название'}/>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder={'Введите название...'}
              errors={errors.name}
              touched={touched.name}
              wrapperStyle={{ marginBottom: 10 }}
            />
            <Heading title={'Стоимость'}/>
            <TextInput
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
              placeholder={'Введите стоимость...'}
              errors={errors.price}
              touched={touched.price}
              wrapperStyle={{ marginBottom: 10 }}
            />
            <Heading title={'Количетсво частей'}/>
            <TextInput
              onChangeText={handleChange('parts')}
              onBlur={handleBlur('parts')}
              value={values.parts}
              placeholder={'Частей...'}
              errors={errors.parts}
              touched={touched.parts}
              wrapperStyle={{ marginBottom: 10 }}
            />
            <Heading title={'На кого делим?'}/>
            <S.SelectedFriendsWrapper3>
              {friends.map(friend => (
                <S.SelectedFriend
                  selected={positionFriends.find(f => f.id === friend.id)}
                  key={friend.id}
                  onPress={() => handleSelect(friend)}
                >
                  <Text>
                    {friend.name}
                  </Text>
                </S.SelectedFriend>
              ))}
            </S.SelectedFriendsWrapper3>
            {values.parts !== '1' && positionFriends.length > 1 &&
              <S.SelectedFriendsWrapper2>
                {positionFriends.map(friend => (
                  <View key={friend.id}>
                    <S.SelectedFriend2
                      selected={positionFriends.find(f => f.id === friend.id)}
                      onPress={() => {}}
                    >
                      <Button
                        onPress={() => {
                          let newFriendsParts = friendsParts.map(f => {
                            if (f.id === friend.id) {
                              f.parts -=1
                            }

                            return f
                          })
                          setFriendsParts(newFriendsParts)
                        }}
                        title={'-'}
                      />
                      <Text>
                        {friend.name} {friendsParts.find(f => f.id === friend.id).parts}
                      </Text>
                      <Button
                        onPress={() => {
                          let partsCount = friendsParts.reduce((prev, current) => {
                            return prev + current.parts
                          }, 0)

                          if (partsCount < +values.parts) {
                            let newFriendsParts = friendsParts.map(f => {
                              if (f.id === friend.id) {
                                f.parts +=1
                              }

                              return f
                            })
                            setFriendsParts(newFriendsParts)
                          }
                        }}
                        title={'+'}
                      />
                    </S.SelectedFriend2>
                  </View>

                ))}
              </S.SelectedFriendsWrapper2>
            }
            <Button
              onPress={handleSubmit}
              title={'Добавить'}
            />
          </S.FormWrapper>
        )}
      </Formik>
    </ScrollView>
  )
}
