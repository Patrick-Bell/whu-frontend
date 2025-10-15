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
  // Title Page Styles
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
  gameInfoSection: {
    backgroundColor: '#f8fafc',
    padding: 30,
    borderRadius: 12,
    border: '2 solid #e2e8f0',
    marginBottom: 40,
    width: '100%',
  },
  gameInfoItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameInfoLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  gameInfoValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  tocSection: {
    width: '100%',
    marginTop: 20,
  },
  tocTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  tocItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottom: '1 dotted #e5e7eb',
  },
  tocText: {
    fontSize: 12,
    color: '#374151',
  },
  tocPage: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: 'bold',
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
  
  // Stats page styles
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  statsCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    border: '2 solid #e2e8f0',
    width: '22%',
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 6,
  },
  statsLabel: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 1.3,
  },
   
  // Summary sections
  summarySection: {
    backgroundColor: '#f1f5f9',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  // stat rows
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

const GameSummaryPDF = ({ gameData }) => {
  // Calculate overall statistics
  const totalProgrammes = gameData?.carts?.reduce((sum, cart) => sum + cart.final_quantity, 0);
  const totalSold = gameData?.carts?.reduce((sum, cart) => sum + cart.sold, 0);
  const totalReturns = gameData?.carts?.reduce((sum, cart) => sum + cart.final_returns, 0);
  const totalValue = gameData?.carts?.reduce((sum, cart) => sum + cart.total_value, 0);
  const soldPercentage = ((totalSold / totalProgrammes) * 100).toFixed(1);
  const totalWorkerHours = gameData?.carts?.reduce((sum, cart) => 
    sum + cart?.cart_workers.reduce((workerSum, worker) => workerSum + worker?.hours, 0), 0);
  const totalWorkers = gameData?.carts?.reduce((sum, cart) => sum + cart?.cart_workers.length, 0);
  const workerValue = gameData?.carts?.reduce((sum, cart) => sum + cart?.worker_total, 0)
  const totalMargin = workerValue - totalValue

  const findBestWorstCarts = (carts) => {
    if (!carts || carts?.length === 0) return { best: null, worst: null };
  
    // Calculate margin for each cart
    const cartsWithMargin = carts?.map(cart => ({
      ...cart,
      margin: cart?.worker_total - (cart?.total_value || 0), // adjust cost if available
    }));
  
    // Find best and worst
    const best = cartsWithMargin?.reduce((max, cart) => (cart.margin > max.margin ? cart : max), cartsWithMargin[0]);
    const worst = cartsWithMargin?.reduce((min, cart) => (cart.margin < min.margin ? cart : min), cartsWithMargin[0]);
  
    return { best, worst };
  };

  const { best, worst } = findBestWorstCarts(gameData?.carts)
  

  // Attendance calculations
  const attendanceData = [];
  gameData?.carts?.forEach(cart => {
    if (!cart.cart_workers?.length) return;
    cart?.cart_workers?.forEach(worker => {
      attendanceData.push({
        name: `${worker.worker.name} ${worker.worker.last_name}`,
        cart: cart?.cart_number,
        hours: worker?.hours,
        timeMessage: worker.time_message,
        startTime: new Date(worker?.start_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        finishTime: new Date(worker?.finish_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      });
    });
  });

  const onTimeWorkers = attendanceData?.filter(worker => worker?.timeMessage === "On Time").length;
  const earlyWorkers = attendanceData?.filter(worker => worker?.timeMessage.includes("Early")).length;
  const lateWorkers = attendanceData?.filter(worker => worker?.timeMessage.includes("Late")).length;

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
      {/* Page 1: Title Page & Table of Contents */}
      <Page size="A4" style={styles.titlePage}>
        <Text style={styles.mainTitle}>Game Summary Report</Text>
        <Text style={styles.gameTitle}>{gameData?.name}</Text>
        
        <View style={styles.gameInfoSection}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Date</Text>
              <Text style={styles.statValue}>{formatDate(gameData?.date)}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Game ID</Text>
              <Text style={styles.statValue}>#{gameData?.id}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Manager</Text>
              <Text style={styles.statValue}>Manager #{gameData?.manager_id}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Carts</Text>
              <Text style={styles.statValue}>{gameData?.carts?.length}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Staff Count</Text>
              <Text style={styles.statValue}>{totalWorkers}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Sales Rate</Text>
              <Text style={styles.statValue}>{soldPercentage}%</Text>
            </View>
        </View>

        <View style={styles.tocSection}>
          <Text style={styles.tocTitle}>Table of Contents</Text>
          
          <View style={styles.tocItem}>
            <Text style={styles.tocText}>Cart Performance Summary</Text>
            <Text style={styles.tocPage}>Page 2</Text>
          </View>
          
          <View style={styles.tocItem}>
            <Text style={styles.tocText}>Game Statistics & Metrics</Text>
            <Text style={styles.tocPage}>Page 3</Text>
          </View>
          
          <View style={styles.tocItem}>
            <Text style={styles.tocText}>Staff Attendance & Punctuality</Text>
            <Text style={styles.tocPage}>Page 4</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-GB')} | 
          Game Summary Report | Page 1 of 4
        </Text>
      </Page>

      {/* Page 2: Cart Summary */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Cart Performance Summary</Text>
          <Text style={styles.subtitle}>{gameData?.name} - {formatDate(gameData.date)}</Text>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Cart</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Staff Members</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Initial Stock</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Final Stock</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Units Sold</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Returns</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Sales Rate</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Expected (£)</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Worker (£)</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={{...styles.tableCellHeader}}>Margin (£)</Text>
            </View>
          </View>

          {/* Table Rows */}
          {gameData?.carts.map((cart, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{cart?.cart_number}</Text>
              </View>
              <View style={styles.tableCol}>
                {cart?.cart_workers?.map((worker, idx) => (
                  <Text key={idx} style={styles.workerCell}>
                    {worker?.worker.name} {worker?.worker.last_name}
                    {cart?.cart_workers.length > 1 && idx < cart?.cart_workers.length - 1 ? '\n' : ''}
                  </Text>
                ))}
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{cart?.quantities_start}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{cart?.final_quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{cart?.sold}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{cart?.final_returns}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {((cart.sold / cart.final_quantity) * 100).toFixed(1)}%
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatCurrency(cart?.total_value)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{formatCurrency(cart?.worker_total)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={{...styles.tableCell, color: (cart?.worker_total - cart?.total_value)  === 0 ? '#000000' : (cart?.worker_total - cart?.total_value) > 0 ? 'green' : 'red'}}>{formatCurrency(cart?.worker_total - cart?.total_value)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Summary row for totals */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 10, fontWeight: 'bold'}}>TOTALS</Text>
            </View>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 9}}>{totalWorkers} Workers</Text>
            </View>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 9}}>{gameData?.carts?.reduce((sum, cart) => sum + cart?.quantities_start, 0)}</Text>
            </View>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 9}}>{totalProgrammes}</Text>
            </View>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 9}}>{totalSold}</Text>
            </View>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 9}}>{totalReturns}</Text>
            </View>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 9}}>{soldPercentage}%</Text>
            </View>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 9}}>{formatCurrency(totalValue)}</Text>
            </View>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 9}}>{formatCurrency(gameData?.carts?.reduce((sum, cart) => sum + cart?.worker_total, 0))}</Text>
            </View>
            <View style={{...styles.tableColHeader}}>
              <Text style={{...styles.tableCellHeader, fontSize: 9, color: totalMargin === 0 ? '#000000' : totalMargin > 0 ? 'green' : 'red'}}>{formatCurrency(totalMargin)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-GB')} | 
          Cart Performance Summary | Page 2 of 4 
        </Text>
      </Page>

                {/* Page 3: Game Statistics */}
            <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Game Statistics & Metrics</Text>
                <Text style={styles.subtitle}>{gameData?.name} - {formatDate(gameData?.date)}</Text>
            </View>

            {/* FINANCE Section */}
            <View style={{ marginTop: 20 }}>
                <Text style={styles.summaryTitle}>Finance</Text>
                <View style={{ marginTop: 10 }}>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Expected Value</Text>
                    <Text style={styles.statValue}>{formatCurrency(totalValue)}</Text>
                </View>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Worker Value</Text>
                    <Text style={styles.statValue}>{formatCurrency(workerValue)}</Text>
                </View>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Total Margin</Text>
                    <Text style={{...styles.statValue, color: totalMargin === 0 ? '#000000' : totalMargin > 0 ? 'green' : 'red'}}>{formatCurrency(totalMargin)}</Text>
                </View>
                </View>
            </View>

            {/* PROGRAMMES Section */}
            <View style={{ marginTop: 20 }}>
                <Text style={styles.summaryTitle}>Programmes</Text>
                <View style={{ marginTop: 10 }}>
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
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Avg Sales Per Cart</Text>
                    <Text style={styles.statValue}>{(totalSold / gameData?.carts.length).toFixed(0)}</Text>
                </View>
                </View>
            </View>

            {/* STAFF Section */}
            <View style={{ marginTop: 20 }}>
                <Text style={styles.summaryTitle}>Staff</Text>
                <View style={{ marginTop: 10 }}>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Total Staff</Text>
                    <Text style={styles.statValue}>{totalWorkers}</Text>
                </View>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Total Hours Worked</Text>
                    <Text style={styles.statValue}>{totalWorkerHours.toFixed(1)}h</Text>
                </View>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Avg Hours Per Worker</Text>
                    <Text style={styles.statValue}>{(totalWorkerHours / totalWorkers).toFixed(1)}h</Text>
                </View>
                </View>
            </View>

            {/* CART Section */}
            <View style={{ marginTop: 20 }}>
                <Text style={styles.summaryTitle}>Cart Performance</Text>
                <View style={{ marginTop: 10 }}>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Total Carts</Text>
                    <Text style={styles.statValue}>{gameData?.carts?.length}</Text>
                </View>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Best Cart</Text>
                    <Text style={{...styles.statValue, color: best?.margin === 0 ? '#000000' : best?.margin > 0 ? 'green' : 'red'}}>
                    {best?.cart_number} | {formatCurrency(best?.margin)}
                    </Text>
                </View>
                <View style={styles.statRow}>
                    <Text style={styles.statLabel}>Worst Cart</Text>
                    <Text style={{...styles.statValue, color: worst?.margin === 0 ? '#000000' : worst?.margin > 0 ? 'green' : 'red'}}>
                    {worst?.cart_number} | {formatCurrency(worst?.margin)}
                    </Text>
                </View>
                </View>
            </View>

            <Text style={styles.footer}>
                Generated on {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-GB')} | 
                Game Statistics & Metrics | Page 3 of 4 
            </Text>
            </Page>


      {/* Page 4: Staff Attendance */}
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
                    <Text style={styles.tableCell}>{worker?.timeMessage}</Text>
                </View>
                </View>
            ))}
            </View>


        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-GB')} | 
          Staff Attendance & Punctuality | Page 4 of 4 
        </Text>
      </Page>
    </Document>
  );
};

export default GameSummaryPDF;