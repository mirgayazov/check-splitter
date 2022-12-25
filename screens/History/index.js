import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { AppDM } from "../../AppDataManager";
import { Check } from "./Check";
import * as S from "./styles";

export const HistoryScreen = ({ hrc }) => {
  const [checks, setChecks] = useState([]);

  const updateChecks = ({ check }) => {
    let newChecks = checks.map(c => {
      if (c.id === check.id) {
        return check
      }

      return c
    })

    setChecks(newChecks)
  };

  useEffect(() => {
    AppDM.getChecks().then((checks) => {
      console.log(checks);
      setChecks(checks);
    });
  }, [hrc]);

  return (
    <>
      {checks.length ? (
        <S.ChecksListWrapper>
          <ScrollView>
            {checks.map((check) => (
              <Check key={check.id} check={check} setChecks={setChecks} updateChecks={updateChecks}/>
            ))}
          </ScrollView>
        </S.ChecksListWrapper>
      ) : (
        <Text>Нет чеков</Text>
      )}
    </>
  );
};
