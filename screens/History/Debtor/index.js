import React, { useEffect, useState } from "react";
import { View, Text, Modal, Alert } from "react-native";
import { AppDM } from "../../../AppDataManager";
import { Icon } from "../../../components/common-ui";
import * as S from "./styles";

export const Debtor = ({ debtor, check, setDebtors }) => {
  const [paidOff, setPaidOff] = useState(debtor.paidOff);

  const toggleDebtorPaidOffStatus = () => {
    setPaidOff(!paidOff);
    AppDM.markDebtor({ debtor, check }).then((debtors) => {
      setDebtors(debtors);
    });
  };

  return (
    <S.Debtor paidOff={paidOff}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{debtor.name}</Text>
      {paidOff ? (
        <Icon
          iconName={"check-circle"}
          provider={"Feather"}
          size={35}
          onPress={toggleDebtorPaidOffStatus}
          wrapperStyle={{ paddingRight: 10 }}
        />
      ) : (
        <Icon
          iconName={"circle"}
          provider={"Feather"}
          size={35}
          onPress={toggleDebtorPaidOffStatus}
          wrapperStyle={{ paddingRight: 10 }}
        />
      )}
    </S.Debtor>
  );
};
