import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Bar} from 'react-chartjs-2';
import {useEffect, useState} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderRadius: 8,
            borderSkipped: false
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            display: false,
            max: 19
        },
        y: {
            grid: {
                display: false
            },
            border: {
                display: false
            },
            ticks: {
                color: "black",
                padding: 0
            }
        }
    },
    layout: {
        padding: 0
    },
    animation: false
};

const labels = [5, 4, 3, 2, 1];

const ReviewsGraph = ({reviewsHistogram}) => {

    const [maxRating, setMaxRating] = useState(0);

    useEffect(() => {
        if (!reviewsHistogram || maxRating) return;

        const {count_1, count_2, count_3, count_4, count_5} = reviewsHistogram;

        const max = Math.max(count_1, count_2, count_3, count_4, count_5);
        setMaxRating(max);

        options.scales.x.max = max;
    }, [reviewsHistogram]);

    const data = {
        labels,
        datasets: [
            {
                data: [
                    reviewsHistogram.count_5,
                    reviewsHistogram.count_4,
                    reviewsHistogram.count_3,
                    reviewsHistogram.count_2,
                    reviewsHistogram.count_1
                ],
                backgroundColor: '#C23B22',
                barPercentage: 1,
                categoryPercentage: 1,
                maxBarThickness: 8,
            },
            {
                data: [maxRating, maxRating, maxRating, maxRating, maxRating],
                backgroundColor: '#e8e8e8',
                barPercentage: 1,
                categoryPercentage: 1,
                maxBarThickness: 8,
                grouped: false,
            }
        ],
    };

    return (
        <Bar options={options} data={data}/>
    );
};

export default ReviewsGraph;