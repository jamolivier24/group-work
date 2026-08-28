import { Text, View } from 'react-native';

type IconProps = {
    size?: number;
    color?: string;
};

export function HomeIcon({
    size = 22,
    color = '#101828',
}: IconProps) {
    return (
        <View
            style={{
                width: size,
                height: size,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    width: size * 0.58,
                    height: size * 0.58,
                    borderWidth: 1.8,
                    borderColor: color,
                    transform: [{ rotate: '45deg' }],
                    position: 'absolute',
                    top: size * 0.08,
                }}
            />

            <View
                style={{
                    width: size * 0.62,
                    height: size * 0.48,
                    borderWidth: 1.8,
                    borderColor: color,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    bottom: size * 0.04,
                }}
            />
        </View>
    );
}

export function ChartIcon({
    size = 22,
    color = '#101828',
}: IconProps) {
    return (
        <View
            style={{
                width: size,
                height: size,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 3,
            }}
        >
            <View
                style={{
                    width: size * 0.18,
                    height: size * 0.35,
                    backgroundColor: color,
                    borderRadius: 2,
                }}
            />

            <View
                style={{
                    width: size * 0.18,
                    height: size * 0.58,
                    backgroundColor: color,
                    borderRadius: 2,
                }}
            />

            <View
                style={{
                    width: size * 0.18,
                    height: size * 0.8,
                    backgroundColor: color,
                    borderRadius: 2,
                }}
            />
        </View>
    );
}

export function SwapIcon({
    size = 22,
    color = '#101828',
}: IconProps) {
    return (
        <View
            style={{
                width: size,
                height: size,
                justifyContent: 'center',
                gap: 5,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <View
                    style={{
                        width: size * 0.62,
                        height: 2,
                        backgroundColor: color,
                    }}
                />

                <View
                    style={{
                        width: 0,
                        height: 0,
                        borderTopWidth: 4,
                        borderBottomWidth: 4,
                        borderLeftWidth: 6,
                        borderTopColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderLeftColor: color,
                    }}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: 0,
                        height: 0,
                        borderTopWidth: 4,
                        borderBottomWidth: 4,
                        borderRightWidth: 6,
                        borderTopColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderRightColor: color,
                    }}
                />

                <View
                    style={{
                        width: size * 0.62,
                        height: 2,
                        backgroundColor: color,
                    }}
                />
            </View>
        </View>
    );
}

export function LayersIcon({
    size = 22,
    color = '#101828',
}: IconProps) {
    return (
        <View
            style={{
                width: size,
                height: size,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
            }}
        >
            {[0, 1, 2].map((item) => (
                <View
                    key={item}
                    style={{
                        width: size * (0.8 - item * 0.12),
                        height: 3,
                        borderRadius: 2,
                        backgroundColor: color,
                    }}
                />
            ))}
        </View>
    );
}

export function ProfileIcon({
    size = 22,
    color = '#101828',
}: IconProps) {
    return (
        <View
            style={{
                width: size,
                height: size,
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: size * 0.35,
                    height: size * 0.35,
                    borderRadius: size,
                    borderWidth: 1.7,
                    borderColor: color,
                }}
            />

            <View
                style={{
                    width: size * 0.65,
                    height: size * 0.35,
                    borderTopLeftRadius: size,
                    borderTopRightRadius: size,
                    borderWidth: 1.7,
                    borderBottomWidth: 0,
                    borderColor: color,
                    marginTop: 3,
                }}
            />
        </View>
    );
}

export function ChevronLeftIcon({
    size = 20,
    color = '#101828',
}: IconProps) {
    return (
        <View
            style={{
                width: size,
                height: size,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    width: size * 0.45,
                    height: size * 0.45,
                    borderLeftWidth: 2,
                    borderBottomWidth: 2,
                    borderColor: color,
                    transform: [{ rotate: '45deg' }],
                    marginLeft: 5,
                }}
            />
        </View>
    );
}

export function BellIcon({
    size = 21,
    color = '#FFFFFF',
}: IconProps) {
    return (
        <View
            style={{
                width: size,
                height: size,
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: size * 0.58,
                    height: size * 0.62,
                    borderWidth: 1.5,
                    borderColor: color,
                    borderTopLeftRadius: size * 0.3,
                    borderTopRightRadius: size * 0.3,
                    borderBottomWidth: 0,
                    marginTop: 2,
                }}
            />

            <View
                style={{
                    width: size * 0.78,
                    height: 1.5,
                    backgroundColor: color,
                    marginTop: -1,
                }}
            />

            <View
                style={{
                    width: size * 0.2,
                    height: size * 0.2,
                    borderRadius: size,
                    backgroundColor: color,
                    marginTop: 2,
                }}
            />
        </View>
    );
}

export function CalendarIcon({
    size = 18,
    color = '#101828',
}: IconProps) {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderWidth: 1.5,
                borderColor: color,
                borderRadius: 4,
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: '100%',
                    height: 4,
                    backgroundColor: color,
                    marginTop: 3,
                }}
            />
        </View>
    );
}

export function CategoryIcon({
    category,
    size = 18,
    color = '#FFFFFF',
}: IconProps & {
    category: string;
}) {
    let symbol = '•';

    if (category === 'salary') symbol = '$';
    if (category === 'shopping') symbol = '▣';
    if (category === 'food') symbol = '♜';
    if (category === 'transport') symbol = '▰';
    if (category === 'bills') symbol = '⌁';
    if (category === 'other') symbol = '◆';
    if (category === 'freelance') symbol = '$';

    return (
        <Text
            style={{
                color,
                fontSize: size * 0.8,
                fontWeight: '800',
            }}
        >
            {symbol}
        </Text>
    );
}