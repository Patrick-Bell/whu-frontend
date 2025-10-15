export const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-GB") : "N/A";

export const formatCurrency = (value) => {
    return Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
}

export const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });
}

export const formatNumber = (number) => {
    return number.toLocaleString()
}