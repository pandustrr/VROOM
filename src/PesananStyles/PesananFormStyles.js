import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f7f7f7",  
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
    },
    itemContainer: {
        flexDirection: "row",
        padding: 16,
        marginBottom: 12,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        elevation: 5, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 12,
        marginRight: 16,
        borderWidth: 2,
        borderColor: "#ddd", 
    },
    itemDetails: {
        flex: 1,
        justifyContent: "center",
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "600",  
        color: "#333", 
        marginBottom: 6,
    },
    itemPrice: {
        fontSize: 16,
        color: "#6200ea", 
        marginBottom: 4,
    },
    itemStatus: {
        fontSize: 14,
        fontWeight: "500",
    },
    available: {
        color: "#4caf50", 
    },
    unavailable: {
        color: "#f44336", 
    },
});

export default styles;