import React, { useEffect, useState } from 'react'
import './issues.css'
import { Link } from 'react-router-dom'

const Result = () => {

  const [result, setResult] = useState()

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem('testData'))
    if (temp) {
      const t = Object.values(temp)
      setResult(t)
    }
  }, [])

  return (
    <section className='issues__page'>
      <div className='text-center'>
        <h3>Danh sách Đề thi</h3>
      </div>
      <div>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Số câu hỏi</th>
            <th>Thời gian làm bài</th>
            <th>Created At</th>
          </tr>

          </thead>
          <tbody>
            {
              result && result.map((item, index) => (
                <tr key={index}>
                  <td><Link to={`${item.id}`} style={{color: 'darkblue'}}>{item.id}</Link></td>
                  <td>{item.name}</td>
                  <td>{item.question_count} câu</td>
                  <td>{item.time_limit} phút</td>
                  <td>{item.created_at}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Result