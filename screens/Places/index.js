import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, ActivityIndicator, View } from 'react-native'
import { Icon, TextInput, Heading, Button } from "../../components/common-ui";
import { AddPlaceForm } from "../../components/Forms/AddPlace";
import { EditPlaceForm } from "../../components/Forms/EditPlace";
import { Place } from "./Place";
import { AppColors } from '../../AppColors';

import * as S from './styles'
import { AppDM } from "../../AppDataManager";

export const PlacesScreen = ({
  frc,
  pickMode = false,
  placePickToolkit = null,
  delay = 100,
}) => {
  const [addPlaceModalVisible, setAddPlaceModalVisible] = useState(false)
  const [places, setPlaces] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [user, setUser] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)
    setTimeout(() => setIsFetching(false), delay)
    AppDM.getUser().then((user) => {
      setUser(user)
      if (user) {
        AppDM.getPlaces().then((places) => {
          setPlaces(places)
        })
      }
    })
  }, [frc])

  const handleSuccessfulAddPlace = ({ place }) => {
    setPlaces([...places, place])
    setAddPlaceModalVisible(false)
  }

  const handleSuccessfulEditPlace = ({ places }) => {
    setPlaces(places)
    setSelectedPlace(null)
  }

  const handleDeletePlace = ({ place }) => {
    AppDM.deletePlace({ deletedPlace: place })
      .then((places) => { setPlaces(places) })
  }

  const renderPlaces = () => {
    return (
      <>
        <S.PlacesListWrapper>
          <ScrollView>
            <View style={{ height: 10 }}>

            </View>
            {places.map(place => <Place
              key={place.id}
              place={place}
              pickMode={pickMode}
              placePickToolkit={placePickToolkit}
              handleSelect={setSelectedPlace}
              handleDelete={handleDeletePlace}
            />)}
          </ScrollView>
        </S.PlacesListWrapper>
        {!pickMode &&
          <S.ControlPanel>
            <S.SearchWrapper>
              {/* <TextInput placeholder={'Ищите места...'} wrapperStyle={{ flex: 1 }}/>
              <Icon iconName='search1' color='blue' size={30} wrapperStyle={{ padding: 10 }}/> */}
            </S.SearchWrapper>
            <Button
              onPress={() => setAddPlaceModalVisible(true)}
              title={'Добавить место'}
            />
            {/* <Icon
              iconName='plus'
              color={AppColors.monochromesShade3}
              size={30}
              onPress={() => setAddPlaceModalVisible(true)}
              wrapperStyle={{ padding: 10 }}
            /> */}
            <Modal
              animationType="slide"
              visible={addPlaceModalVisible}
            >
              <S.PlacesWrapper>
                <AddPlaceForm cb={handleSuccessfulAddPlace} />
              </S.PlacesWrapper>
            </Modal>
            <Modal
              animationType="slide"
              visible={!!selectedPlace}
            >
              <S.PlacesWrapper>
                <EditPlaceForm place={selectedPlace} cb={handleSuccessfulEditPlace} />
              </S.PlacesWrapper>
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
    <S.PlacesWrapper>
      {isFetching
        ?
        <>
          <ActivityIndicator size="large" color="blue" />
        </>
        :
        <>
          {user && renderPlaces()}
          {!user && renderUser404()}
        </>
      }
    </S.PlacesWrapper>
  )
}
