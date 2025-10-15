export const percentageDifference = (expected, actual) => {
    if (!expected || expected === 0) return 0; // avoid divide by zero
    return (((actual - expected) / expected) * 100).toFixed(1)
  }