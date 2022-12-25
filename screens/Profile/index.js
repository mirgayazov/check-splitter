import React, { useState, useEffect } from 'react'
import { Text, Alert, Modal, Platform, View, ScrollView } from 'react-native'
import { RegistrationForm } from '../../components/Forms/Registration'
import { Button, Heading, Icon } from "../../components/common-ui";
import * as S from './styles'
import { AppDM } from "../../AppDataManager";
import * as Print from 'expo-print';
import { shareAsync } from "expo-sharing";
import { AddPaymentVariantForm } from '../../components/Forms/AddPaymentVariant';
import { PaymentVariant } from './PaymentVariant';
import { AppColors } from '../../AppColors';

export const ProfileScreen = () => {
  const [user, setUser] = useState(null)
  const [signupModalVisible, setSignupModalVisible] = useState(false)
  const [paymentVariants, setPaymentVariants] = useState([])
  const [addPaymentVariantModalVisible, setAddPaymentVariantModalVisible] = useState(false)

  const setInitialState = () => {
    setUser(null)
    setSignupModalVisible(false)
    setPaymentVariants([])
    setAddPaymentVariantModalVisible(false)
  }

  const showAlert = () =>
    Alert.alert(
      "Удаление аккаунта",
      `${user.firstName}, вы уверены в том, что хотите удалить аккаунт и все данные связанные с ним?`,
      [
        {
          text: "Удалить",
          onPress: () => {
            AppDM.deleteUser({ cb: setUser })
            setInitialState()
          },
          style: "default",
        },
        {
          text: "Отмена",
          onPress: () => { },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => { },
      }
    );

  useEffect(() => {
    AppDM.getUser().then((user) => {
      console.log(user)
      setUser(user)
      AppDM.getPaymentVariants().then(pvs => {
        console.log(pvs)
        setUser(user)
        setPaymentVariants(pvs)
      })
    })
  }, [])

  const handleSuccessPVAdd = ({ pv }) => {
    console.log('wertewryetyrtu')
    setPaymentVariants([...paymentVariants, pv])
    setAddPaymentVariantModalVisible(false)
  }

  if (user) {
    return (
      <S.ProfileWrapper>
        <S.Wrapper>
          <Heading title={`Привет, ${user.firstName}!`} />
          <View style={{ height: 15 }}></View>
          <Button title={'Удалить аккаунт'} onPress={() => showAlert()} align={'stretch'} />
        </S.Wrapper>
        <S.Wrapper2>
          <View>
            <Heading title={'Способы оплаты'} />
          </View>
          <View style={{ maxHeight: 320, marginTop: 5, marginBottom: 15 }}>
            <View style={{ marginBottom: 10 }}>
              <Text>
                Добавьте информацию о ваших счетах, с помощью которой, ваши друзья смогут направить вам средства.
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text>
                Эти данные будут автоматически отображаться в конце генерируемых чеков.
              </Text>
            </View>
            <ScrollView>
              {paymentVariants.map(pv => <PaymentVariant key={pv.id} variant={pv} setPaymentVariants={setPaymentVariants}/>)}
            </ScrollView>
          </View>
          <View>
            <Button
              onPress={() => setAddPaymentVariantModalVisible(true)}
              title={'Добавить способ'}
            />
          </View>
        </S.Wrapper2>
        <Modal
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'red' }}
          animationType="slide"
          visible={addPaymentVariantModalVisible}
        >
          <S.ProfileWrapper>
            <AddPaymentVariantForm cb={handleSuccessPVAdd} />
          </S.ProfileWrapper>
        </Modal>
      </S.ProfileWrapper>
    )
  }

  const handleSuccessfulSignup = ({ user }) => {
    AppDM.addFriend({ friend: { name: user.firstName.trim() + ' (Вы)' }, cb: () => { } })
    setUser(user)
    setSignupModalVisible(false)
  }

  return (
    <S.ProfileWrapper>
      <Button title={'Регистрация'} align={'stretch'} onPress={() => setSignupModalVisible(true)} />
      <Modal
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'red' }}
        animationType="slide"
        visible={signupModalVisible}
      >
        <S.ProfileWrapper>
          <RegistrationForm cb={handleSuccessfulSignup} />
        </S.ProfileWrapper>
      </Modal>

    </S.ProfileWrapper>
  )
}
