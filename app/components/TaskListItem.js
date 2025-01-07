import React from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import colors from "../config/colors";
import AppText from "./AppText";
import TaskListIcon from "./TaskListIcon";

function TaskListItem({
  image,
  ImageComponent,
  title,
  date,
  assignee,
  project,
  customer,
  onPress,
  renderRightActions,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight onPress={onPress} underlayColor={colors.lightGreen}>
          <View style={styles.listContainer}>
            {ImageComponent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.listDetailsContainer}>
              {date && <AppText style={styles.date}>{date}</AppText>}
              <View style={styles.innerContainer}>
                {assignee && (
                  <AppText style={styles.assignee}>
                    <TaskListIcon name="account" iconColor={colors.blue} />
                    {assignee}
                  </AppText>
                )}
                {project && (
                  <AppText style={styles.project}>
                    <TaskListIcon name="login-variant" />
                    {project}
                  </AppText>
                )}
                {customer && (
                  <AppText style={styles.customer}>
                    <TaskListIcon
                      name="logout-variant"
                      iconColor={colors.danger}
                    />
                    {customer}
                  </AppText>
                )}
              </View>
              <View>
                <AppText style={styles.itemTitle}>{title}</AppText>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  assignee: {
    color: colors.gray,
    paddingRight: 30,
  },
  customer: {
    color: colors.gray,
  },
  innerContainer: {
    flexDirection: "row",
  },
  date: {
    paddingRight: 20,
    fontWeight: "bold",
  },
  itemTitle: {
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  listContainer: {
    marginHorizontal: 20,
    marginVertical: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  listDetailsContainer: { marginLeft: 20 },
  project: {
    color: colors.gray,
    paddingRight: 30,
  },
});

export default TaskListItem;
