document.addEventListener('DOMContentLoaded', function () {
    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    const ctxPaymentMethod = document.getElementById('paymentMethodChart').getContext('2d');
    const ctxTopSellingProducts = document.getElementById('topSellingProductsChart').getContext('2d');

    
    const revenueData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        datasets: [{
            label: 'Revenue',
            data: [500, 1000, 750, 1250, 900, 1300, 800, 1400],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const revenueChart = new Chart(ctxRevenue, {
        type: 'line',
        data: revenueData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Revenue Analysis',
                    font: {
                        size: 24,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Week'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Revenue ($)'
                    },
                    beginAtZero: true
                }
            }
        }
    });

    const paymentMethodData = {
        labels: ['Credit Card', 'Debit Card', 'Cash', 'Online Payment', 'Gift Card', 'PayPal'],
        datasets: [{
            label: 'Payment Methods',
            data: [40, 30, 20, 10, 15, 25],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const paymentMethodChart = new Chart(ctxPaymentMethod, {
        type: 'pie',
        data: paymentMethodData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales by Payment Method',
                    font: {
                        size: 24,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let label = tooltipItem.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.raw * 100) / 100;
                            label += '%';
                            return label;
                        }
                    }
                }
            }
        }
    });

   
    const topSellingProductsData = {
        labels: ['Bananas', 'Apples', 'Bread', 'Milk', 'Butter', 'Juice', 'Yogurt', 'Eggs', 'Cheese', 'Orange Juice', 'Cereal', 'Chicken', 'Fish', 'Rice', 'Beans'],
        datasets: [{
            label: 'Week 1',
            data: [120, 90, 60, 80, 100, 110, 70, 85, 95, 100, 60, 50, 45, 80, 55],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }, {
            label: 'Week 2',
            data: [110, 85, 65, 90, 105, 115, 75, 80, 90, 110, 65, 55, 50, 75, 60],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const topSellingProductsChart = new Chart(ctxTopSellingProducts, {
        type: 'radar',
        data: topSellingProductsData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Top Selling Products (Per Week)',
                    font: {
                        size: 24,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 150,
                    ticks: {
                        beginAtZero: true
                    },
                    title: {
                        display: true,
                        text: 'Quantity Sold'
                    }
                }
            }
        }
    });
});
