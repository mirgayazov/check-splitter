import React, { useState } from 'react'
import {Alert, Text, View} from 'react-native'
import { AppDM } from '../../../AppDataManager';
import { Icon } from "../../../components/common-ui";

import * as S from './styles'

export const PaymentVariant = ({ variant, setPaymentVariants }) => {
  const showAlert = () =>
    Alert.alert(
      `${variant.name}`,
      `Вы уверены в том, что хотите удалить данный способ оплаты?`,
      [
        {
          text: "Удалить",
          onPress: () => {
            AppDM.deletePaymentVariant({ deletedVariant: variant })
              .then(remainingVariants => {
                setPaymentVariants(remainingVariants)
              })
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
    <S.FriendWrapper>
      <S.Info onPress={()=>{}}>
        <Icon iconName={'creditcard'} size={30} wrapperStyle={{ paddingRight: 10 }}/>
        <View>
          <Text style={{fontWeight: 'bold'}}>{variant.name}</Text>
          <Text style={{fontSize: 11}}>{variant.ref}</Text>
        </View>
      </S.Info>
      <S.Edit>
        <Icon
          iconName={'closecircleo'}
          size={30}
          onPress={() => showAlert()}
        />
      </S.Edit>
    </S.FriendWrapper>
  )
}
