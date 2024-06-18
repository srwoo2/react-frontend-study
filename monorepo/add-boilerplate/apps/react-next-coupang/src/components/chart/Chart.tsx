'use client'
import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useSelector } from 'react-redux'
import { selectOrderHistory } from '@/redux/slice/orderSlice'
import { Bar } from 'react-chartjs-2'
import styles from './Chart.module.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

const Chart = () => {
  const orders = useSelector(selectOrderHistory)

  const array: string[] = []
  orders.map((order) => {
    const { orderStatus } = order
    array.push(orderStatus)
  })

  const getOrderStatusCount = (arr: string[], value: string) => {
    return arr.filter((n) => n === value).length
  }

  const [x1, x2, x3, x4] = ['주문수락', '주문처리중', '배송중', '배송완료']

  const placed = getOrderStatusCount(array, x1)
  const processing = getOrderStatusCount(array, x2)
  const shipped = getOrderStatusCount(array, x3)
  const delivered = getOrderStatusCount(array, x4)

  const data = {
    labels: ['주문수락', '주문처리중', '배송중', '배송완료'],
    datasets: [
      {
        label: '주문건수',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <div className={styles.charts}>
      <div className={styles.card}>
        <h3>주문 상태 차트</h3>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default Chart
