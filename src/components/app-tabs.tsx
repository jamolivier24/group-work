import { usePathname } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  FinoraColors,
  FinoraRadius
} from '@/constants/theme';

import {
  ChartIcon,
  HomeIcon,
  LayersIcon,
  ProfileIcon,
  SwapIcon,
} from './finora/icons';

export default function AppTabs() {
  const pathname = usePathname();

  const iconColor = (route: string) =>
    pathname === route
      ? FinoraColors.primary
      : '#A7B5B5';

  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />

      <TabList asChild>
        <View style={styles.wrapper}>
          <View style={styles.bar}>
            <TabTrigger name="home" href="/" asChild>
              <Pressable style={styles.item}>
                <HomeIcon size={22} color={iconColor('/')} />
                <Text style={styles.text}>Home</Text>
              </Pressable>
            </TabTrigger>

            <TabTrigger name="analysis" href="/analysis" asChild>
              <Pressable style={styles.item}>
                <ChartIcon
                  size={22}
                  color={iconColor('/analysis')}
                />
                <Text style={styles.text}>Analysis</Text>
              </Pressable>
            </TabTrigger>

            <TabTrigger
              name="transactions"
              href="/transactions"
              asChild
            >
              <Pressable style={styles.item}>
                <SwapIcon
                  size={22}
                  color={iconColor('/transactions')}
                />
                <Text style={styles.text}>Transactions</Text>
              </Pressable>
            </TabTrigger>

            <TabTrigger name="categories" href="/categories" asChild>
              <Pressable style={styles.item}>
                <LayersIcon
                  size={22}
                  color={iconColor('/categories')}
                />
                <Text style={styles.text}>Categories</Text>
              </Pressable>
            </TabTrigger>

            <TabTrigger name="profile" href="/profile" asChild>
              <Pressable style={styles.item}>
                <ProfileIcon
                  size={22}
                  color={iconColor('/profile')}
                />
                <Text style={styles.text}>Profile</Text>
              </Pressable>
            </TabTrigger>
          </View>
        </View>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  bar: {
    minHeight: 70,
    backgroundColor: FinoraColors.navBackground,
    borderRadius: FinoraRadius.lg,
    borderWidth: 1,
    borderColor: FinoraColors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 58,
    gap: 4,
  },

  text: {
    color: '#A7B5B5',
    fontSize: 9,
    fontWeight: '600',
  },
});