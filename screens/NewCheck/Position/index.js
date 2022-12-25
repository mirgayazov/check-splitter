import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Icon } from "../../../components/common-ui";

import * as S from "./styles";

export const Position = ({ position, index, handlePositionDelete }) => {
  const maxNameLength = position.friends.reduce((p, c) => {
    const len = c.name.length;
    if (len >= p) {
      p = len;
    }

    return p;
  }, 0);

  const maxCostLength = position.friends.reduce((p, c) => {
    const len = (c.cost + "").length;
    if (len >= p) {
      p = len;
    }

    return p;
  }, 0);

  const showAlert = () =>
    Alert.alert(
      `${position.name}`,
      `Вы уверены в том, что хотите удалить данную позицию?`,
      [
        {
          text: "Удалить",
          onPress: () => {handlePositionDelete(position.id)},
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
    <S.PositionWrapper onPress={showAlert}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ fontStyle: "bold" }}>
          {index}
          {"  "}
        </Text>
        <S.PositionInfo>
          <Text>
            {position.name} • {position.realParts} • {position.price}₽
          </Text>
        </S.PositionInfo>
      </View>
      <S.FriendsInfo style={{ fontVariant: ["tabular-nums"] }}>
        <S.Table2>
          {position.friends.map((f) => {
            const diff = maxNameLength - f.name.length;
            let postfix = " · · ·";

            if (diff) {
              for (let i = 0; i < diff; i++) {
                postfix += " ·";
              }
            }

            return (
              <Text key={f.name + f.id}>
                {f.name.trim()}
                {postfix}
              </Text>
            );
          })}
        </S.Table2>
        <S.Table>
          {position.friends.map((f) => {
            return <Text key={f.parts + f.id}>{f.parts}</Text>;
          })}
        </S.Table>
        <S.Table>
          {position.friends.map((f) => {
            const diff = maxCostLength - (f.cost + "").length;
            let postfix = "· · · ";

            if (diff) {
              for (let i = 0; i < diff; i++) {
                postfix += "· ";
              }
            }

            return (
              <Text key={f.cost + f.id}>
                {postfix}
                {f.cost}₽
              </Text>
            );
          })}
        </S.Table>
      </S.FriendsInfo>
    </S.PositionWrapper>
  );
};
