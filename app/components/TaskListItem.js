import React from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import colors from "../config/colors";
import AppText from "./AppText";
import TaskListIcon from "./TaskListIcon";

function TaskListItem({
  time_in,
  time_out,
  employee,
  location,
  status,
  date,
  total_hours,
  onPress,
  renderRightActions,
  title,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight
          style={styles.listContainer}
          onPress={onPress}
          underlayColor={colors.lightGreen}
        >
          <View style={styles.Container}>
            {date && (
              <AppText style={styles.dateText}>
                <TaskListIcon name="" />
                {date}
              </AppText>
            )}
            <View style={styles.midContainer}>
              {location && (
                <AppText style={styles.assignee}>
                  <TaskListIcon
                    name="map-marker-outline"
                    iconColor={colors.gray}
                  />
                  {location}
                </AppText>
              )}
              {time_in && (
                <AppText style={styles.time_in}>
                  <TaskListIcon name="login-variant" />
                  {time_in}
                </AppText>
              )}
              {time_out && (
                <AppText style={styles.time_out}>
                  <TaskListIcon name="logout-variant" iconColor={colors.red} />
                  {time_out}
                </AppText>
              )}
              {employee && (
                <AppText style={styles.assignee}>
                  <TaskListIcon
                    name="map-marker-outline"
                    iconColor={colors.blue}
                  />
                  {employee}
                </AppText>
              )}
              {total_hours && (
                <AppText style={styles.assignee}>
                  <TaskListIcon
                    name="timer-outline"
                    iconColor={colors.secondary}
                  />
                  {total_hours}
                </AppText>
              )}
            </View>
            {status && (
              <AppText style={styles.statusText}>
                <TaskListIcon name="" />
                {status}
              </AppText>
            )}
            {title && <AppText style={styles.statusText}>{title}</AppText>}
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 7,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    padding: 7,
  },

  Container: { paddingHorizontal: 10 },

  midContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateText: { color: colors.black, fontWeight: "bold" },
  statusText: { color: colors.primary, fontWeight: "bold" },
});

export default TaskListItem;
