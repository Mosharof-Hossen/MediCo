import PropTypes from 'prop-types';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const ReportDocument = ({ data, logoUrl, title }) => {
    return (
        <Document>
            <Page style={styles.page}>

                {/* Top Centered Logo */}
                <View style={styles.logoContainer}>
                    <Image src={logoUrl} style={styles.logo} />
                </View>

                {/* Centered Title */}
                <Text style={styles.title}>{title}</Text>

                {/* Table */}
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableHeaderText}>Title</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableHeaderText}>Date</Text>
                        </View>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableHeaderText}>Status</Text>
                        </View>
                    </View>

                    {/* Table Rows */}
                    {data?.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>{item.userEmail}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>{item.date?.split("T")[0]}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>{item.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </Page>
        </Document>
    );
}

// Define styles
const styles = StyleSheet.create({
    page: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 100, // Adjust width as needed
        // height: 100,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        margin: 'auto',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '33.33%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        backgroundColor: '#e6e6e6',
        padding: 5,
    },
    tableHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableCol: {
        width: '33.33%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        padding: 5,
    },
    tableCellText: {
        fontSize: 10,
        textAlign: 'center',
    },
});

ReportDocument.propTypes = {
    data: PropTypes.array,
    logoUrl: PropTypes.string,
    title: PropTypes.string
};
export default ReportDocument;



