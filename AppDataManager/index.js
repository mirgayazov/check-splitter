import { UserDM } from "./user";
import { FriendsDM } from "./friends";
import { PlacesDM } from "./places";

export const AppDM = {
  ...UserDM,
  ...FriendsDM,
  ...PlacesDM,
}

