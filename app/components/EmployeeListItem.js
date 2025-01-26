import React from "react";
import { TouchableHighlight, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import colors from "../config/colors";
import AppText from "./AppText";

function EmployeeListItem({
  name,
  employeeCode,
  email,
  phone,
  designation,
  department,
  date_of_joining,
  renderRightActions,
  onPress,
  prog,
  drag,
}) {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={(prog, drag) => (
          <renderAction prog={prog} drag={drag} />
        )}
      >
        <TouchableHighlight onPress={onPress} underlayColor={colors.gray}>
          <View>
            {name && <AppText>{name}</AppText>}
            {employeeCode && <AppText>{employeeCode}</AppText>}
            {email && <AppText>{email}</AppText>}
            {phone && <AppText>{phone}</AppText>}
            {designation && <AppText>{designation}</AppText>}
            {department && <AppText>{department}</AppText>}
            {date_of_joining && <AppText>{date_of_joining}</AppText>}
          </View>
        </TouchableHighlight>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

export default EmployeeListItem;
