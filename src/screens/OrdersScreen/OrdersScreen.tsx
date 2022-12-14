import { View, Text, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { RootStackParamList } from '../../navigator/RootNavigator';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn/dist';
import useOrders from '../../../hooks/useOrders';
import { Button } from '@rneui/themed';
import OrderCard from '../../components/OrderCard/OrderCard';
import Images from '../../assets/images/Images';

export type OrderScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Orders'>,
    NativeStackNavigationProp<RootStackParamList>
>;

export default function OrdersScreen() {
    const tw = useTailwind();
    const navigation = useNavigation<OrderScreenNavigationProp>();
    const { loading, error, orders } = useOrders();
    const [ascending, setAscending] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? '#EB6A7C' : color, fontSize: 10 }}>Orders</Text>
            )
        })
    }, [])

    return (
        <ScrollView style={{ backgroundColor: '#EB6A7C' }}>
            <Image source={Images.orderScreen} style={{ resizeMode: "cover", width: '100%', height: 200, marginTop: 45 }} />
            <View>
                <Button
                    color='pink'
                    titleStyle={{ color: 'gray', fontWeight: '400' }}
                    style={tw('py-2 px-5')}
                    onPress={() => setAscending(!ascending)}
                >
                    {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
                </Button>
                {orders?.sort((a, b) => {
                    if (ascending) {
                        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                    } else {
                        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
                    }
                }).map(order => (
                    <OrderCard key={order.trackingId} item={order} />
                ))}
            </View>
        </ScrollView>
    )
}