import React, { useState } from 'react'
import {Alert, Text, View} from 'react-native'
import { Icon } from "../../../components/common-ui";
import { AppColors } from '../../../AppColors';

import * as S from './styles'

export const Place = ({ place, handleSelect, handleDelete, pickMode, placePickToolkit }) => {
  const [selected, setSelected] = useState(placePickToolkit ? placePickToolkit.selectedPlace?.id === place.id : false)

  const onSelect = () => handleSelect(place)
  const onDelete = () => handleDelete({ place })

  const handleSelectInPickMode = () => {
    if (selected) {
      placePickToolkit.removeSelectedPlace()
      setSelected(false)
    } else {
      placePickToolkit.setSelectedPlace(place)
      setSelected(true)
    }
  }

  const showAlert = () =>
    Alert.alert(
      `${place.name}`,
      `Вы уверены в том, что хотите удалить данное место?`,
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
    <S.PlaceWrapper selected={selected}>
      <S.Info onPress={onSelect}>
        <Icon iconName={'map-marker-radius-outline'} size={30} provider={'MaterialCommunityIcons'} wrapperStyle={{ paddingRight: 10 }}/>
        <View>
          <Text style={{fontWeight: 'bold'}}>{place.name}</Text>
          <Text style={{fontSize: 11}}>{place.createdAt}</Text>
        </View>
      </S.Info>
      {!pickMode &&
        <S.Edit>
          <Icon
            iconName={'delete'}
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

    </S.PlaceWrapper>
  )
}
