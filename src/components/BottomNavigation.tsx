import { usePathname, useRouter } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BottomNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    // Home opens the Transactions screen directly
    const handleHome = () => {
        router.push("/transactions");
    };

    return (
        <View style={styles.bottomBar}>

            {/* HOME */}
            <TouchableOpacity
                style={styles.navButton}
                onPress={handleHome}
            >
                <Text
                    style={[
                        styles.homeIcon,
                        pathname === "/" && styles.activeIcon,
                    ]}
                >
                    ♧
                </Text>
            </TouchableOpacity>

            {/* ANALYSIS */}
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => router.push("/analysis")}
            >
                <Text
                    style={[
                        styles.analysisIcon,
                        pathname === "/analysis" && styles.activeIcon,
                    ]}
                >
                    ◔
                </Text>
            </TouchableOpacity>

            {/* TRANSACTIONS */}
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => router.push("/transactions")}
            >
                <View
                    style={[
                        styles.transactionCircle,
                        pathname === "/transactions" &&
                        styles.transactionCircleActive,
                    ]}
                >
                    <Text
                        style={[
                            styles.transactionIcon,
                            pathname === "/transactions" &&
                            styles.transactionIconActive,
                        ]}
                    >
                        ⇄
                    </Text>
                </View>
            </TouchableOpacity>

            {/* CATEGORIES */}
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => router.push("/categories")}
            >
                <Text
                    style={[
                        styles.categoryIcon,
                        pathname === "/categories" && styles.activeIcon,
                    ]}
                >
                    ▱
                </Text>
            </TouchableOpacity>

            {/* PROFILE */}
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => router.push("/profile")}
            >
                <Text
                    style={[
                        styles.profileIcon,
                        pathname === "/profile" && styles.activeIcon,
                    ]}
                >
                    ♙
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

        height: 70,

        backgroundColor: "#E9F9E9",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",

        paddingHorizontal: 12,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    navButton: {
        width: 55,
        height: 55,

        alignItems: "center",
        justifyContent: "center",
    },

    /* HOME */
    homeIcon: {
        fontSize: 25,
        color: "#24352F",
    },

    /* ANALYSIS */
    analysisIcon: {
        fontSize: 25,
        color: "#24352F",
    },

    /* TRANSACTION ACTIVE CIRCLE */
    transactionCircle: {
        width: 43,
        height: 43,

        borderRadius: 22,

        alignItems: "center",
        justifyContent: "center",
    },

    transactionCircleActive: {
        backgroundColor: "#00D3A3",
    },

    transactionIcon: {
        fontSize: 25,
        color: "#24352F",
        fontWeight: "700",
    },

    transactionIconActive: {
        color: "#073D31",
    },

    /* CATEGORIES */
    categoryIcon: {
        fontSize: 26,
        color: "#24352F",
    },

    /* PROFILE */
    profileIcon: {
        fontSize: 26,
        color: "#24352F",
    },

    activeIcon: {
        color: "#00B890",
    },
});