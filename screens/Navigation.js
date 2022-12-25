import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { ProfileScreen } from './Profile/index'
import { FriendsScreen } from './Friends'
import { NewCheckScreen } from './NewCheck'
import { PlacesScreen } from './Places'
import { HistoryScreen } from './History'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AppColors } from '../AppColors'
import React, { useState } from 'react'

const Tab = createBottomTabNavigator()

export const Navigation = () => {
  const [frc, setFrc] = useState(0)
  const [prc, setPrc] = useState(0)

  return (
    <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Профиль"
          screenOptions={{ tabBarActiveTintColor: AppColors.activeTab }}
        >
          <Tab.Screen
            name="История"
            children={() => <HistoryScreen hrc={prc}/>}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="inbox" color={color} size={size} />
              ),
            }}
            listeners={{ tabPress: () => setPrc(prc+1) }}
          />
          <Tab.Screen
            name="Места"
            children={() => <PlacesScreen frc={prc}/>}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="isv" color={color} size={size} />
              ),
            }}
            listeners={{ tabPress: () => setPrc(prc+1) }}
          />
          <Tab.Screen
            name="Разделить"
            component={NewCheckScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="plus" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Друзья"
            children={() => <FriendsScreen frc={frc}/>}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="team" color={color} size={size} />
              ),
            }}
            listeners={{ tabPress: () => setFrc(frc+1) }}
          />
          <Tab.Screen
            name="Профиль"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
    </NavigationContainer>
  )
}
