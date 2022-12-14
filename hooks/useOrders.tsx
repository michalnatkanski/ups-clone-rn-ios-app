import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries';

export default function useOrders() {

    const { data, loading, error } = useQuery(GET_ORDERS);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (!data) return;
        const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
            Address: value.Address,
            City: value.City,
            Lat: value.Lat,
            Lng: value.Lng,
            carrier: value.carrier,
            createdAt: value.createdAt,
            shippingCost: value.shippingCost,
            trackingId: value.trackingId,
            trackingItems: value.trackingItems
        }))

        setOrders(orders)
    }, [data])
    return { loading, error, orders }
}