export const formatTotal = (totalValue, workerValue) => {
    const difference = (totalValue - workerValue).toFixed(2);
    const color = difference == 0 ? 'grey' : (difference < 0 ? 'green' : 'red')
    return <span style={{ color }}>{`£${Math.abs(difference).toFixed(2)}`}</span>;
  };