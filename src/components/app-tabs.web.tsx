import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type NavItem = {
  name: string;
  route: string;
  icon: string;
};

const items: NavItem[] = [
  {
    name: 'Home',
    route: '/',
    icon: '⌂',
  },
  {
    name: 'Analysis',
    route: '/analysis',
    icon: '▥',
  },
  {
    name: 'Transaction',
    route: '/transactions',
    icon: '⇄',
  },
  {
    name: 'Categories',
    route: '/categories',
    icon: '▦',
  },
  {
    name: 'Profile',
    route: '/profile',
    icon: '●',
  },
];

export default function AppTabs() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {items.map((item) => {
          const active =
            item.route === '/'
              ? pathname === '/'
              : pathname.startsWith(item.route);

          return (
            <Pressable
              key={item.name}
              onPress={() => router.push(item.route as any)}
              style={styles.item}
            >
              <View
                style={[
                  styles.iconBox,
                  active && styles.activeIconBox,
                ]}
              >
                <Text
                  style={[
                    styles.icon,
                    active && styles.activeIcon,
                  ]}
                >
                  {item.icon}
                </Text>
              </View>

              <Text
                style={[
                  styles.label,
                  active && styles.activeLabel,
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingBottom: 12,
  },

  bar: {
    height: 76,
    borderRadius: 24,
    backgroundColor: '#DFF7E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeIconBox: {
    backgroundColor: '#00D09E',
  },

  icon: {
    fontSize: 22,
    color: '#052224',
    fontWeight: '700',
  },

  activeIcon: {
    color: '#FFFFFF',
  },

  label: {
    fontSize: 9,
    marginTop: 2,
    color: '#667085',
    fontWeight: '600',
  },

  activeLabel: {
    color: '#052224',
  },
});