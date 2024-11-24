import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Button, SafeAreaView, Platform, StatusBar, FlatList, } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";

import defaultStyles from "../config/styles"
import AppText from './AppText';
import PickerItem from './PickerItem';

function AppPicker({ icon, items, onSelectItem, placeholder, selectedItem }) {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    { icon &&<MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.gray} style={styles.icon} /> }
                    <AppText style={styles.text}>{selectedItem ? selectedItem.lable : placeholder}</AppText>
                    { icon &&<MaterialCommunityIcons name="chevron-down" size={20} color={defaultStyles.colors.gray} /> }
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType='slide' >
                <SafeAreaView style={styles.mdalHeader}>
                    <Button title='Close' onPress={() => setModalVisible(false)} />
                        <FlatList
                            data={items}
                            keyExtractor={item => item.value.toString()}
                            renderItem={({item}) => <PickerItem
                                lable={item.lable}
                                onPress={() => {
                                    setModalVisible(false)
                                    onSelectItem(item)
                                }}/>}
                        />
                </SafeAreaView>
            </Modal>
        </>
        );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.lightGrey,
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        marginVertical: 10
    },
    icon: {
        marginRight: 10
    },
    mdalHeader: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    text: {
        flex: 1
    },
})

export default AppPicker;