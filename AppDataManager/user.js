import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import moment from "moment";

export const UserDM = {
  getUser: async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      return user != null ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },

  createUser: async ({ user, cb }) => {
    try {
      const jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem("user", jsonUser);
      cb({ user });
    } catch (e) {
      // saving error
    }
  },

  deleteUser: async ({ cb }) => {
    try {
      await AsyncStorage.removeItem("user", () => cb(null));
    } catch (e) {
      return null;
    }
  },

  getPaymentVariants: async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      return user.paymentVariants ? user.paymentVariants : [];
    } catch (e) {
      return null;
    }
  },

  createPaymentVariant: async ({ pv, cb }) => {
    try {
      pv = { ...pv, id: uuid.v4(), createdAt: moment().format("DD.MM.YYYY") };
      const user = JSON.parse(await AsyncStorage.getItem("user"));

      if (user.paymentVariants) {
        user.paymentVariants.push(pv);
      } else {
        user.paymentVariants = [pv];
      }

      await AsyncStorage.setItem("user", JSON.stringify(user));
      cb({ pv });
    } catch (e) {}
  },

  deletePaymentVariant: async ({ deletedVariant }) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      user.paymentVariants = user.paymentVariants.filter(
        (variant) => variant.id !== deletedVariant.id
      );

      await AsyncStorage.setItem("user", JSON.stringify(user));

      return user.paymentVariants;
    } catch (e) {}
  },

  getChecks: async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      return user.checks ? user.checks : [];
    } catch (e) {
      return null;
    }
  },

  deleteCheck: async ({ deletedCheck }) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      user.checks = user.checks.filter(
        (check) => check.id !== deletedCheck.id
      );

      await AsyncStorage.setItem("user", JSON.stringify(user));

      return user.checks;
    } catch (e) {}
  },

  markDebtor: async ({ debtor, check }) => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      let checkIndex = user.checks.findIndex(c => c.id === check.id);

      let localCheck = user.checks[checkIndex]

      localCheck.debtors = localCheck.debtors.map(d => {
        if (d.id === debtor.id) {
          d.paidOff = !d.paidOff
        }

        return d
      })

      await AsyncStorage.setItem("user", JSON.stringify(user));
      return  user.checks[checkIndex].debtors;
    } catch (e) {}
  },

  createOrUpdateCheck: async ({ check, cb }) => {
    try {
      if (check.id) {
        const user = JSON.parse(await AsyncStorage.getItem("user"));
        let index = user.checks.findIndex(с => с.id === check.id);
        user.checks[index] = check

        await AsyncStorage.setItem("user", JSON.stringify(user));
        cb({ check });
      } else {
        check = {
          ...check,
          id: uuid.v4(),
          createdAt: moment().format("DD.MM.YYYY"),
        };
        const user = JSON.parse(await AsyncStorage.getItem("user"));

        if (user.checks) {
          user.checks.push(check);
        } else {
          user.checks = [check];
        }

        await AsyncStorage.setItem("user", JSON.stringify(user));
        cb({ check });
      }
    } catch (e) {}
  },
};
