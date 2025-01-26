import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import colors from "../config/colors";
import AppText from "./AppText";
import ListItemSeparator from "./ListItemSeparator";

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
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight onPress={onPress} underlayColor={colors.lightGrey}>
          <View style={styles.container}>
            <View style={styles.codeName}>
              <AppText style={styles.codeNameText}>[{employeeCode}]</AppText>
              <AppText style={styles.codeNameText}>{name}</AppText>
            </View>
            <View style={styles.contactDetails}>
              {email && <AppText style={styles.text}>{email}</AppText>}
              {phone && <AppText style={styles.text}>{phone}</AppText>}
            </View>
            <View style={styles.codeName}>
              {department && (
                <AppText style={styles.text}>{department}</AppText>
              )}
              {designation && (
                <AppText style={styles.text}>{designation}</AppText>
              )}
            </View>
            {date_of_joining && <AppText>{date_of_joining}</AppText>}
          </View>
        </TouchableHighlight>
        <ListItemSeparator />
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  codeName: {
    flexDirection: "row",
  },
  codeNameText: { color: colors.black, fontWeight: "bold", paddingRight: 10 },
  contactDetails: { flexDirection: "row" },
  text: { paddingRight: 10 },
});

export default EmployeeListItem;
