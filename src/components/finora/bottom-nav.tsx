import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    ChartIcon,
    HomeIcon,
    LayersIcon,
    ProfileIcon,
    SwapIcon,
} from './icons';

const COLORS = {
    background: '#DFF7E2',
    active: '#00D09E',
    dark: '#052224',
};

const SPACING = {
    sm: 8,
    md: 16,
    lg: 24,
};

const RADIUS = {
    lg: 24,
};

type NavItem = {
    key: string;
    route: string;
    icon: (color: string) => React.ReactNode;
};

const items: NavItem[] = [
    {
        key: 'home',
        route: '/home',
        icon: (color) => <HomeIcon size={22} color={color} />,
    },
    {
        key: 'analysis',
        route: '/analysis',
        icon: (color) => <ChartIcon size={22} color={color} />,
    },
    {
        key: 'transactions',
        route: '/transactions',
        icon: (color) => <SwapIcon size={22} color={color} />,
    },
    {
        key: 'categories',
        route: '/categories',
        icon: (color) => <LayersIcon size={22} color={color} />,
    },
    {
        key: 'profile',
        route: '/profile',
        icon: (color) => <ProfileIcon size={22} color={color} />,
    },
];

export function BottomNav() {
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.wrapper,
                {
                    paddingBottom: Math.max(insets.bottom, 8),
                },
            ]}
        >
            <View style={styles.bar}>
                {items.map((item) => {
                    const active = pathname === item.route;

                    return (
                        <Pressable
                            key={item.key}
                            onPress={() => router.push(item.route as any)}
                            style={[
                                styles.item,
                                active && styles.activeItem,
                            ]}
                        >
                            {item.icon(
                                active ? '#FFFFFF' : COLORS.dark
                            )}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: SPACING.lg,
    },

    bar: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.background,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
    },

    item: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeItem: {
        backgroundColor: COLORS.active,
    },
});