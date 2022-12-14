import { ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { Input } from '@rneui/base';
import { GET_CUSTOMERS } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';
import CustomerCard from '../../components/CustomerCard/CustomerCard';
import Images from '../../assets/images/Images';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Customers'>,
    NativeStackNavigationProp<RootStackParamList>
>;

export default function CustomersScreen() {
    const tw = useTailwind();
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    const [input, setInput] = useState<string>('');
    const { loading, error, data } = useQuery(GET_CUSTOMERS);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <ScrollView style={{ backgroundColor: '#59C1CC' }}>
            <Image source={Images.customerScreen} style={{ resizeMode: "contain", width: '100%', height: 250 }} />
            <Input
                placeholder='Search by Customer'
                value={input}
                onChangeText={setInput}
                containerStyle={tw('bg-white pt-5 pb-0 px-10')}
            />
            {data?.getCustomers
                ?.filter((customer: CustomerList) =>
                    customer.value.name.includes(input)
                )
                .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
                    <CustomerCard key={ID} email={email} name={name} userId={ID} />
                ))}
        </ScrollView>
    )
}