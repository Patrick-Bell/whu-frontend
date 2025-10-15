import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { formatCurrency } from '../functions/Format';
import { worker } from 'globals';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },

  // Header styles for other pages
  header: {
    marginBottom: 25,
    borderBottom: '2 solid #7A263A',
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  // Table styles
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#e2e8f0',
    marginTop: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '10%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#e2e8f0',
    backgroundColor: '#f1f5f9',
    padding: 6,
  },
  tableCol: {
    width: '10%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#e2e8f0',
    padding: 6,
  },
  tableCellHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 8,
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  workerCell: {
    fontSize: 7,
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 1.2,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 8,
    borderTop: '1 solid #e5e7eb',
    paddingTop: 10,
  },
});

const GameAttendancePDF = ({ gameData }) => {

  // Attendance calculations
  const attendanceData = [];
  gameData?.carts?.forEach(cart => {
    if (!cart.cart_workers?.length) return;
    cart?.cart_workers?.forEach(worker => {
      attendanceData?.push({
        name: `${worker?.worker.name} ${worker?.worker?.last_name}`,
        cart: cart?.cart_number,
        hours: worker?.hours,
        timeMessage: worker?.time_message,
        startTime: new Date(worker?.start_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        finishTime: new Date(worker?.finish_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      });
    });
  });

  const getColor = (message) => {
    if (message.includes('On Time')) return 'gray'
    if (message.includes('Late')) return 'red'
    if (message.includes('Early')) return 'green'
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Document>  

        <Page size="A4" orientation='landscape' style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Staff Attendance & Punctuality</Text>
          <Text style={styles.subtitle}>{gameData?.name} - {formatDate(gameData.date)}</Text>
        </View>

        <View style={styles.table}>
            {/* Header Row */}
            <View style={styles.tableRow}>
                <View style={{ ...styles.tableColHeader, width: '30%' }}>
                <Text style={styles.tableCellHeader}>Staff Member</Text>
                </View>
                <View style={{ ...styles.tableColHeader, width: '10%' }}>
                <Text style={styles.tableCellHeader}>Cart</Text>
                </View>
                <View style={{ ...styles.tableColHeader, width: '15%' }}>
                <Text style={styles.tableCellHeader}>Start Time</Text>
                </View>
                <View style={{ ...styles.tableColHeader, width: '15%' }}>
                <Text style={styles.tableCellHeader}>Finish Time</Text>
                </View>
                <View style={{ ...styles.tableColHeader, width: '10%' }}>
                <Text style={styles.tableCellHeader}>Hours</Text>
                </View>
                <View style={{ ...styles.tableColHeader, width: '20%' }}>
                <Text style={styles.tableCellHeader}>Attendance Status</Text>
                </View>
            </View>

            {/* Data Rows */}
            {attendanceData?.map((worker, index) => (
                <View style={styles.tableRow} key={index}>
                <View style={{ ...styles.tableCol, width: '30%' }}>
                    <Text style={styles.tableCell}>{worker?.name}</Text>
                </View>
                <View style={{ ...styles.tableCol, width: '10%' }}>
                    <Text style={styles.tableCell}>{worker?.cart}</Text>
                </View>
                <View style={{ ...styles.tableCol, width: '15%' }}>
                    <Text style={styles.tableCell}>{worker?.startTime}</Text>
                </View>
                <View style={{ ...styles.tableCol, width: '15%' }}>
                    <Text style={styles.tableCell}>{worker?.finishTime}</Text>
                </View>
                <View style={{ ...styles.tableCol, width: '10%' }}>
                    <Text style={styles.tableCell}>{worker?.hours}</Text>
                </View>
                <View style={{ ...styles.tableCol, width: '20%' }}>        
                  <Text style={{...styles.tableCell, color: getColor(worker?.timeMessage)}}>{worker.timeMessage}</Text>
                </View>
                </View>
            ))}
            </View>


        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-GB')} | 
          Staff Attendance & Punctuality | Page 1 of 1
        </Text>
      </Page>
    </Document>
  );
};

export default GameAttendancePDF;