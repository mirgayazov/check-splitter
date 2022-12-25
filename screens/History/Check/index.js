import React, { useEffect, useState } from "react";
import { View, Text, Modal, Alert } from "react-native";
import * as S from "./styles";
import { Button, Heading, Icon } from "../../../components/common-ui";
import { NewCheckScreen } from "../../NewCheck";
import { AppDM } from "../../../AppDataManager";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";
import { Debtor } from "../Debtor";
import { AppColors } from "../../../AppColors";
import * as Clipboard from "expo-clipboard";

const makeContent = (data, check, variants) => {
  const { event, newSelectedFriends } = data;
  let sum = check.positions.reduce((p,c) => p +Number(c.price), 0)

  let variantsList = variants.map(v => {
    return(
      `<li>${v.name}: ${v.ref}</li>`
    )
  }).join("")
  let list = newSelectedFriends
    .map((f) => {
      if (Number(f.allPositionsCost) === 0) {
        return null;
      }

      return `
        <li>
          ${f.name}
          <div style="height: 15px"></div> 
            <ol>
            ${f.friendPositions
              .map(
                (p) => `
                <li>
              ${p.name} <small>[${p.friendParts}/${p.parts}]</small> -  ${p.cost}₽
            </li>
            `
              )
              .join("")}
            </ol>
          <hr>
          Итого <b>${f.allPositionsCost}₽</b>
          <div style="height: 45px"></div>
        </li>
      `;
    })
    

    list = list.filter(l => l !== null).join("");
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 30px;
                color: #000000;
            }
            h1 {
                text-align: center;
            }
        </style>
      </head>
      <body>
        <h1>${event.eventName}</h1>
        <ul>
        ${list}
        </ul>
        <h1>
        <h1>Чек на сумму: ${sum}₽</h1>
        <ul>
        ${variantsList}
        </ul>
        </h1>
      </body>
      </html>
  `;
};

const createPDF = async (html) => {
  try {
    const file = await Print.printToFileAsync({
      html,
      base64: false,
    });
    await shareAsync(file.uri, { UTI: ".pdf", mimeType: "application/pdf" });
  } catch (err) {
    console.error(err);
  }
};

export const Check = ({ check, setChecks, updateChecks }) => {
  const [checkModal, setCheckModal] = useState(false);
  const [debtors, setDebtors] = useState(check.debtors);
  const [debtorsModal, setDebtorsModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  const showCheck = () => {
    setCheckModal(true);
  };

  const showDebtors = () => {
    setDebtorsModal(true);
  };

  const closeCheck = () => {
    setCheckModal(false);
  };

  const clearFn = ({ check }) => {
    closeCheck();
    updateChecks({ check });
  };

  const generate = async () => {
    let selectedFriends = check.friends;
    let positions = check.positions;
    let variants = await AppDM.getPaymentVariants();

    let newSelectedFriends = selectedFriends.map((f) => {
      let allPositionsCost = 0;
      let currentFriendPositions = positions.filter((p) =>
        p.friends.find((pf) => pf.id === f.id)
      );
      let friendPositions = currentFriendPositions.map((p) => {
        return {
          name: p.name,
          parts: p.realParts,
          price: p.price,
          partPrice: +p.price / +p.realParts,
          friendParts: p.friends.find((pf) => pf.id === f.id).parts,
          cost: p.friends.find((pf) => pf.id === f.id).cost,
        };
      });

      if (currentFriendPositions.length) {
        allPositionsCost = currentFriendPositions.reduce(
          (p, c) => p + c.friends.find((pf) => pf.id === f.id).cost,
          0
        );
      }

      return { name: f.name, allPositionsCost, friendPositions };
    });

    createPDF(makeContent({ event: check.event, newSelectedFriends }, check, variants));
  };

  const showAlert = () =>
    Alert.alert(
      `${check.event.eventName}`,
      `Вы уверены в том, что хотите удалить данное событие?`,
      [
        {
          text: "Удалить",
          onPress: () => {
            AppDM.deleteCheck({ deletedCheck: check }).then(
              (remainingChecks) => {
                setChecks(remainingChecks);
              }
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

  return (
    <S.CheckWrapper
      color={
        debtors.some((d) => !d.paidOff)
          ? "#ff9966"
          : AppColors.monochromesShade2
      }
    >
      <S.LogicWrapper>
        <S.Info>
          <Icon
            iconName={"md-receipt-outline"}
            provider={"Ionicons"}
            size={30}
            wrapperStyle={{ paddingRight: 10 }}
          />
          <View>
            <Text style={{ fontWeight: "bold" }}>{check.event.eventName}</Text>
            <Text style={{ fontSize: 11 }}>{check.createdAt}</Text>
          </View>
        </S.Info>
        <S.Edit>
          <Icon iconName={"delete"} size={30} onPress={() => showAlert()} />
        </S.Edit>
      </S.LogicWrapper>
      <S.LogicWrapper2>
        <S.StyleWrapper>
          <S.ToolItemWrapper>
            <Icon iconName={"eyeo"} size={30} onPress={showCheck} />
          </S.ToolItemWrapper>
          <S.ToolItemWrapper
            color={
              debtors.some((d) => !d.paidOff)
                ? "#ff9966"
                : AppColors.monochromesShade2
            }
          >
            <Icon
              iconName={"checklist"}
              provider={"Octicons"}
              size={30}
              onPress={showDebtors}
            />
          </S.ToolItemWrapper>
          <S.ToolItemWrapper>
            <Icon iconName={"pdffile1"} size={30} onPress={generate} />
          </S.ToolItemWrapper>
          <S.ToolItemWrapper
            color={copyStatus ? "#72f996" : AppColors.monochromesShade2}
          >
            <Icon
              iconName={copyStatus ? "check" : "copy1"}
              size={30}
              onPress={async () => {
                setCopyStatus(true);
                let variants = await AppDM.getPaymentVariants();
                console.log(variants);

                let selectedFriends = check.friends;
                let positions = check.positions;

                let newSelectedFriends = selectedFriends.map((f) => {
                  let allPositionsCost = 0;
                  let currentFriendPositions = positions.filter((p) =>
                    p.friends.find((pf) => pf.id === f.id)
                  );
                  let friendPositions = currentFriendPositions.map((p) => {
                    return {
                      name: p.name,
                      parts: p.realParts,
                      price: p.price,
                      partPrice: +p.price / +p.realParts,
                      friendParts: p.friends.find((pf) => pf.id === f.id).parts,
                      cost: p.friends.find((pf) => pf.id === f.id).cost,
                    };
                  });

                  if (currentFriendPositions.length) {
                    allPositionsCost = currentFriendPositions.reduce(
                      (p, c) => p + c.friends.find((pf) => pf.id === f.id).cost,
                      0
                    );
                  }

                  return { name: f.name, allPositionsCost, friendPositions };
                });

                let maxNameLength = 15;
                let maxCostLength = 6;
                let maxCheckName = 18;
                let textCheck = "";
                let rows = newSelectedFriends.map((f) => {
                  let { name, allPositionsCost } = f;
                  let finalName = "" + name;
                  let finalCost = "";

                  for (let i = 0; i < maxNameLength - name.length; i++) {
                    finalName += " ·";
                  }

                  for (
                    let i = 0;
                    i < maxCostLength - String(allPositionsCost).length;
                    i++
                  ) {
                    finalCost += " ·";
                  }

                  finalCost += "  ";
                  finalCost += allPositionsCost;

                  if (Number(allPositionsCost) === 0) {
                    return null;
                  }

                  return `· ${finalName} ·${finalCost}₽ ·`;
                });

                rows = rows.filter((r) => r !== null);

                let line = "";
                for (let i = 0; i < maxNameLength + maxCostLength + 5; i++) {
                  line += "· ";
                }
                line += "·";

                let line2 = "";
                for (
                  let i = 0;
                  i < (maxNameLength + maxCostLength + 5 - 8) / 2;
                  i++
                ) {
                  line2 += "· ";
                }
                line2 += "·";

                let line3 = "";
                for (
                  let i = 0;
                  i < Math.floor((26 - check.place.name.length) / 2);
                  i++
                ) {
                  line3 += "· ";
                }
                line3 += "·";

                let line4 = "";
                for (let i = 0; i < (26 - check.createdAt.length) / 2; i++) {
                  line4 += "· ";
                }
                line4 += "·";

                let line5 = "";
                let sum = check.positions.reduce((p,c) => p +Number(c.price), 0)

                for (let i = 0; i < (26 - 10 - String(sum).length) / 2; i++) {
                  line5 += "· ";
                }
                line5 += "·";

                rows.push(line);
                rows.push(line);
                rows.push(line5 + " ·  ИТОГ:  "+sum+"₽" + line5);
                rows.push(line2 + " ·  РЕФЫ  " + line2);
                rows.push(line);
                rows.unshift(line2 + " ·  CЧЕТ  " + line2);
                rows.unshift(line);
                rows.unshift(line4 + " " + check.createdAt + " " + line4);
                rows.unshift(line3 + " " + check.place.name + " " + line3);
                rows.unshift(line);

                for (const variant of variants) {
                  rows.push(`· ${variant.name} - ${variant.ref} ·`);
                }

                rows.push(line);
                rows.push(line);
                await Clipboard.setStringAsync(`\n${rows.join("\n")}`);
                console.log(check);
                setTimeout(() => setCopyStatus(false), 1500);
              }}
            />
          </S.ToolItemWrapper>
        </S.StyleWrapper>
      </S.LogicWrapper2>
      <Modal animationType="slide" visible={checkModal}>
        <NewCheckScreen check={check} onClose={clearFn} />
      </Modal>
      <Modal animationType="slide" visible={debtorsModal}>
        <S.DebtorsWrapper>
          <Heading title={check.place.name +"  "+ check.createdAt}/>
          <View style={{height:20}}></View>
          {debtors.map((d) => (
            <Debtor
              key={d.id}
              debtor={d}
              check={check}
              setDebtors={setDebtors}
            />
          ))}
        </S.DebtorsWrapper>
        <S.ControlPanel>
          <Button title={"Сохранить"} onPress={() => setDebtorsModal(false)} />
        </S.ControlPanel>
      </Modal>
    </S.CheckWrapper>
  );
};
