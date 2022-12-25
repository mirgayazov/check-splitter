import React, { useState, useEffect } from "react";
import { View, Text, Modal, ScrollView, Alert } from "react-native";
import { Formik } from "formik";
import { Button, TextInput, Heading, Icon } from "../../components/common-ui";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import * as ImagePicker from "expo-image-picker";
import { recognize } from "react-native-text-recognition";

import * as S from "./styles";
import moment from "moment";
import { FriendsScreen } from "../Friends";
import { PlacesScreen } from "../Places";
import { AddPositionForm } from "../../components/Forms/AddPosition";
import { Position } from "./Position";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "* слишком короткое имя")
    .max(50, "* слишком длинное имя")
    .required("* заполните поле"),
  lastName: Yup.string()
    .min(2, "* слишком короткая фамилия")
    .max(50, "* слишком длинная фамилия")
    .required("* заполните поле"),
});

import { AppDM } from "../../AppDataManager";

export const NewCheckScreen = ({ check, onClose }) => {
  console.log(check);
  const [frc, setFrc] = useState(0);
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);
  const [addPositionModalVisible, setAddPositionModalVisible] = useState(false);
  const [addPlaceModalVisible, setAddPlaceModalVisible] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState(
    check ? check.friends : []
  );
  const [selectedPlace, setSelectedPlace] = useState(
    check ? check.place : { name: "Хорошее место" }
  );
  const [positions, setPositions] = useState(check ? check.positions : []);
  const [x, setX] = useState(0);

  const handlePositionDelete = (pId) => {
    let newPositions = positions.filter(p => p.id !== pId)
    setPositions(newPositions)
  }

  const clearCheck = () => {
    setSelectedFriends([]);
    setSelectedPlace({ name: "Хорошее место" });
    setPositions([]);
  };

  const Bridge = ({ x }) => {
    const { submitForm } = useFormikContext();

    useEffect(() => {
      if (x % 2) {
        setX(x + 1);
        submitForm();
      }
    }, [x]);

    return null;
  };

  const positionsToolkit = {
    addNewPosition: (position) => {
      setPositions([...positions, position]);
    },
    positions,
  };

  const friendsPickToolkit = {
    pushNewSelectedFriend: (friend) => {
      setSelectedFriends([...selectedFriends, friend]);
    },
    deleteSelectedFriend: (friend) => {
      setSelectedFriends(selectedFriends.filter((f) => f.id !== friend.id));
    },
    selectedFriends,
  };

  const placePickToolkit = {
    setSelectedPlace: (place) => {
      setSelectedPlace(place);
      setFrc(frc + 1);
    },
    removeSelectedPlace: () => {
      setSelectedPlace(null);
      setFrc(frc + 1);
    },
    selectedPlace,
  };

  const removeFromEvent = (friend) =>
    Alert.alert(
      "Удалить из встречи",
      `Вы уверены в том, что хотите удалить пользователя ${friend.name} из встречи?`,
      [
        {
          text: "Удалить",
          onPress: () => {
            setSelectedFriends(
              selectedFriends.filter((f) => f.id !== friend.id)
            );
          },
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

  const removeEventPlace = () =>
    Alert.alert(
      "Удаление места встречи",
      `Вы уверены в том, что хотите удалить место встречи ${selectedPlace.name}?`,
      [
        {
          text: "Удалить",
          onPress: () => {
            setSelectedPlace(null);
          },
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
    <>
      <S.ScrollViewWrapper>
        <ScrollView>
          <Formik
            initialValues={{
              eventName: check
                ? check.event.eventName
                : moment().format("Событие DD.MM.yyyy"),
            }}
            onSubmit={(event) => {
              // let newSelectedFriends = selectedFriends.map((f) => {
              //   let allPositionsCost = 0;
              //   let currentFriendPositions = positions.filter((p) =>
              //     p.friends.find((pf) => pf.id === f.id)
              //   );
              //   let friendPositions = currentFriendPositions.map((p) => {
              //     return {
              //       name: p.name,
              //       parts: p.realParts,
              //       price: p.price,
              //       partPrice: +p.price / +p.realParts,
              //       friendParts: p.friends.find((pf) => pf.id === f.id).parts,
              //       cost: p.friends.find((pf) => pf.id === f.id).cost,
              //     };
              //   });

              //   if (currentFriendPositions.length) {
              //     allPositionsCost = currentFriendPositions.reduce(
              //       (p, c) => p + c.friends.find((pf) => pf.id === f.id).cost,
              //       0
              //     );
              //   }

              //   return { name: f.name, allPositionsCost, friendPositions };
              // });

              const localCheck = {
                event: event,
                friends: selectedFriends,
                place: selectedPlace,
                positions: positions,
                debtors: selectedFriends.map((sf) => ({
                  ...sf,
                  paidOff: false,
                })),
              };

              // createOrSave
              AppDM.createOrUpdateCheck({
                check: check ? { ...check, ...localCheck } : localCheck,
                cb: () => {
                  clearCheck();

                  if (check) {
                    onClose({ check: { ...check, ...localCheck } });
                  }
                },
              });
              // createPDF(makeContent({ event, newSelectedFriends }))

              // console.log(newSelectedFriends)
              // console.log(event)
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <S.FormWrapper>
                <Bridge x={x} />
                <S.SelectedFriendsWrapper2>
                  <Heading
                    title={"Событие"}
                    wrapperStyle={{ paddingBottom: 10 }}
                  />
                  <TextInput
                    onChangeText={handleChange("eventName")}
                    onBlur={handleBlur("eventName")}
                    value={values.eventName}
                    placeholder={"Введите название события..."}
                    errors={errors.eventName}
                    touched={touched.eventName}
                    wrapperStyle={{ marginBottom: 10 }}
                  />
                </S.SelectedFriendsWrapper2>
                <Modal animationType="slide" visible={addPlaceModalVisible}>
                  <PlacesScreen
                    frc={frc}
                    pickMode={true}
                    placePickToolkit={placePickToolkit}
                    delay={0}
                  />
                  <S.ControlPanel>
                    <Button
                      onPress={() => setAddPlaceModalVisible(false)}
                      title={"Сохранить"}
                    />
                  </S.ControlPanel>
                </Modal>
                {selectedPlace ? (
                  <S.SelectedFriendsWrapper2
                    onPress={() => setAddPlaceModalVisible(true)}
                  >
                    <Heading title={"Место проведения"} />
                    <S.SelectedFriendsNamesWrapper>
                      <S.SelectedFriend
                        key={selectedPlace.id}
                        onPress={() => removeEventPlace()}
                      >
                        <Text>{selectedPlace.name}</Text>
                      </S.SelectedFriend>
                    </S.SelectedFriendsNamesWrapper>
                  </S.SelectedFriendsWrapper2>
                ) : (
                  <S.SelectedFriendsWrapper2
                    onPress={() => setAddPlaceModalVisible(true)}
                  >
                    <Heading title={"Место проведения"} />
                    <Text>Здесь отобразится выбранное место</Text>
                  </S.SelectedFriendsWrapper2>
                )}
                <Modal animationType="slide" visible={addFriendModalVisible}>
                  <FriendsScreen
                    frc={frc}
                    pickMode={true}
                    friendsPickToolkit={friendsPickToolkit}
                  />
                  <S.ControlPanel>
                    <Button
                      onPress={() => setAddFriendModalVisible(false)}
                      title={"Сохранить"}
                    />
                  </S.ControlPanel>
                </Modal>
                {selectedFriends.length ? (
                  <S.SelectedFriendsWrapper2
                    onPress={() => setAddFriendModalVisible(true)}
                  >
                    <Heading title={"Присутсвующие"} />
                    <S.SelectedFriendsNamesWrapper>
                      {selectedFriends.map((friend) => (
                        <S.SelectedFriend
                          key={friend.id}
                          onPress={() => removeFromEvent(friend)}
                        >
                          <Text>{friend.name}</Text>
                        </S.SelectedFriend>
                      ))}
                    </S.SelectedFriendsNamesWrapper>
                  </S.SelectedFriendsWrapper2>
                ) : (
                  <S.SelectedFriendsWrapper2
                    onPress={() => setAddFriendModalVisible(true)}
                  >
                    <Heading title={"Присутсвующие"} />
                    <Text>Здесь отобразятся выбранные друзья</Text>
                  </S.SelectedFriendsWrapper2>
                )}
                <S.CheckWrapper>
                  <Heading title={"Чек"} />
                  <Modal
                    animationType="slide"
                    visible={addPositionModalVisible}
                  >
                    <AddPositionForm
                      onSave={() => setAddPositionModalVisible(false)}
                      friends={selectedFriends}
                      positionsToolkit={positionsToolkit}
                    />
                  </Modal>
                  {positions.length ? (
                    <>
                      <S.SelectedFriendsWrapper2>
                        {positions.map((position, index) => (
                          <Position
                            index={index + 1}
                            key={position.id}
                            position={position}
                            handlePositionDelete={handlePositionDelete}
                          />
                        ))}
                      </S.SelectedFriendsWrapper2>
                      <S.SelectedFriendsWrapper2>
                        <S.TotalWrapper>
                          <Text>
                            Итого: позиций - {positions.length}, на сумму{" "}
                            {positions.reduce((p, c) => p + +c.price, 0)} руб.
                          </Text>
                        </S.TotalWrapper>
                      </S.SelectedFriendsWrapper2>
                    </>
                  ) : (
                    <Text>Здесь отобразятся добавленные позиции</Text>
                  )}
                </S.CheckWrapper>
                <View style={{ minHeight: 75 }} />
              </S.FormWrapper>
            )}
          </Formik>
        </ScrollView>
        <S.ControlPanel>
          <Button
            onPress={() => {
              if (selectedFriends.length) {
                setAddPositionModalVisible(true);
              } else {
                console.log("Нет друзей для распределения");
              }
            }}
            title={"Добавить позицию"}
          />
        </S.ControlPanel>
        <S.ControlPanel2>
          <Button onPress={() => setX(x + 1)} title={"Сохранить чек"} />
        </S.ControlPanel2>
      </S.ScrollViewWrapper>
    </>
  );
};
