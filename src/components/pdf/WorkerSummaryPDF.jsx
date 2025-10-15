import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency, formatDate } from '../functions/Format';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  titlePage: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7A263A',
    marginBottom: 40,
    textAlign: 'center',
  },
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
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  statLabel: {
    fontSize: 10,
    color: '#374151',
  },
  statValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
  },
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
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#e2e8f0',
    backgroundColor: '#f1f5f9',
    padding: 6,
  },
  tableCol: {
    width: '15%',
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
});

const WorkerSummaryPDF = ({ workerData }) => {
  // Aggregate worker totals
  const totalHours = workerData.carts.reduce(
    (sum, cart) =>
      sum + (cart.cart_workers.find((w) => w.worker_id === workerData.id)?.hours || 0),
    0
  );
  const totalSold = workerData.carts.reduce((sum, cart) => sum + cart.sold, 0);
  const totalValue = workerData.carts.reduce((sum, cart) => sum + cart.worker_total, 0);
  const totalProgrammes = workerData.carts.reduce((sum, cart) => sum + cart.final_quantity, 0);
  const totalReturns = workerData.carts.reduce((sum, cart) => sum + cart.final_returns, 0);
  const soldPercentage = ((totalSold / totalProgrammes) * 100).toFixed(1);

  const cartFrequency = {};
workerData.carts.forEach((cart) => {
  cart.cart_workers
    .filter((w) => w.worker_id === workerData.id)
    .forEach(() => {
      cartFrequency[cart.cart_number] = (cartFrequency[cart.cart_number] || 0) + 1;
    });
});

// Find cart with highest frequency
const mostWorkedCart = Object.entries(cartFrequency).reduce(
  (max, [cartNumber, count]) => (count > max.count ? { cartNumber, count } : max),
  { cartNumber: '', count: 0 }
);

  // Attendance data
  const attendanceData = [];
  workerData.carts.forEach((cart) => {
    cart.cart_workers
      .filter((w) => w.worker_id === workerData.id)
      .forEach((w) => {
        attendanceData.push({
          cart: cart.cart_number,
          hours: w.hours,
          startTime: new Date(w.start_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          finishTime: new Date(w.finish_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          status: w.time_message,
          game: cart.game.name,
          date: cart.date,
        });
      });
  });

  return (
    <Document>
      {/* Page 1: Title Page */}
      <Page size="A4" style={styles.titlePage}>
        <Text style={styles.mainTitle}>Worker Summary Report</Text>
        <Text style={styles.gameTitle}>{workerData.name} {workerData.last_name}</Text>
        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString('en-GB')} | Page 1 of 5
        </Text>
      </Page>

      {/* Page 2: Personal Details */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Personal Details</Text>
          <Text style={styles.subtitle}>{workerData.name} {workerData.last_name}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Full Name</Text>
            <Text style={styles.statValue}>{workerData.name} {workerData.last_name}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Email</Text>
            <Text style={styles.statValue}>{workerData.email || '-'}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Phone</Text>
            <Text style={styles.statValue}>{workerData.phone_number || '-'}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Address</Text>
            <Text style={styles.statValue}>{workerData.address || '-'}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Joined</Text>
            <Text style={styles.statValue}>{workerData.joined ? new Date(workerData.joined).toLocaleDateString('en-GB') : '-'}</Text>
          </View>
        </View>

        <Text style={styles.footer}>Page 2 of 5</Text>
      </Page>

      {/* Page 3: Work Summary / Analytics */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Work Analytics</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Summary</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Hours Worked</Text>
            <Text style={styles.statValue}>{totalHours}h</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Units Sold</Text>
            <Text style={styles.statValue}>{totalSold}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Revenue</Text>
            <Text style={styles.statValue}>{formatCurrency(totalValue)}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Programmes</Text>
            <Text style={styles.statValue}>{totalProgrammes}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Programmes Returned</Text>
            <Text style={styles.statValue}>{totalReturns}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Sales Rate</Text>
            <Text style={styles.statValue}>{soldPercentage}%</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Cart Performance</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Carts</Text>
            <Text style={styles.statValue}>{workerData.carts.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Most Frequent Cart</Text>
            <Text style={{ ...styles.statValue}}>
              Position | {mostWorkedCart.cartNumber}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>Page 3 of 5</Text>
      </Page>





      {/* Page 4: Work Summary */}
      <Page size="A4" orientation='landscape' style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Work Summary</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{...styles.tableColHeader, width: '10%'}}>
              <Text style={styles.tableCellHeader}>Cart</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '10%'}}>
              <Text style={styles.tableCellHeader}>Date</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '30%'}}>
              <Text style={styles.tableCellHeader}>Game</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '15%'}}>
              <Text style={styles.tableCellHeader}>Sold</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '15%'}}>
              <Text style={styles.tableCellHeader}>Worker (£)</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '10%'}}>
              <Text style={styles.tableCellHeader}>Expected (£)</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '10%'}}>
              <Text style={styles.tableCellHeader}>Margin</Text>
            </View>
          </View>

          {workerData?.carts?.map((att, idx) => {
            const margin = att.worker_total - att.total_value
            return(
            <View style={styles.tableRow} key={idx}>
              <View style={{...styles.tableCol, width: '10%'}}><Text style={styles.tableCell}>{att.cart_number}</Text></View>
              <View style={{...styles.tableCol, width: '10%'}}><Text style={styles.tableCell}>{formatDate(att?.game?.date)}</Text></View>
              <View style={{...styles.tableCol, width: '30%'}}><Text style={styles.tableCell}>{att?.game?.name}</Text></View>
              <View style={{...styles.tableCol, width: '15%'}}><Text style={styles.tableCell}>{att.sold} / {att.final_quantity} ({((att.sold / att.final_quantity) * 100).toFixed(2)}%)</Text></View>
              <View style={{...styles.tableCol, width: '15%'}}><Text style={styles.tableCell}>{formatCurrency(att.worker_total)}</Text></View>
              <View style={{...styles.tableCol, width: '10%'}}><Text style={styles.tableCell}>{formatCurrency(att.total_value)}</Text></View>
              <View style={{...styles.tableCol, width: '10%'}}><Text style={{...styles.tableCell, color: margin === 0 ? '#000000' : margin > 0 ? 'green' : 'red'}}>{formatCurrency(margin)}</Text></View>
            </View>
            )})}
        </View>

        <Text style={styles.footer}>Page 4 of 5</Text>
      </Page>





      {/* Page 4: Attendance */}
      <Page size="A4" orientation='landscape' style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Attendance & Punctuality</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{...styles.tableColHeader, width: '15%'}}>
              <Text style={styles.tableCellHeader}>Cart</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '30%'}}>
              <Text style={styles.tableCellHeader}>Game</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '15%'}}>
              <Text style={styles.tableCellHeader}>Start Time</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '15%'}}>
              <Text style={styles.tableCellHeader}>Finish Time</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '10%'}}>
              <Text style={styles.tableCellHeader}>Hours</Text>
            </View>
            <View style={{...styles.tableColHeader, width: '15%'}}>
              <Text style={styles.tableCellHeader}>Status</Text>
            </View>
          </View>

          {attendanceData.map((att, idx) => (
            <View style={styles.tableRow} key={idx}>
              <View style={{...styles.tableCol, width: '15%'}}><Text style={styles.tableCell}>{att.cart}</Text></View>
              <View style={{...styles.tableCol, width: '30%'}}><Text style={styles.tableCell}>{att.game}</Text></View>
              <View style={{...styles.tableCol, width: '15%'}}><Text style={styles.tableCell}>{att.startTime}</Text></View>
              <View style={{...styles.tableCol, width: '15%'}}><Text style={styles.tableCell}>{att.finishTime}</Text></View>
              <View style={{...styles.tableCol, width: '10%'}}><Text style={styles.tableCell}>{att.hours}</Text></View>
              <View style={{...styles.tableCol, width: '15%'}}><Text style={styles.tableCell}>{att.status}</Text></View>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>Page 5 of 5</Text>
      </Page>
    </Document>
  );
};

export default WorkerSummaryPDF;
