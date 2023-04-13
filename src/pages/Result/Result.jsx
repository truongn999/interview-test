import React, { useEffect, useState } from 'react'
import './result.css'
import { Link } from 'react-router-dom'

const Result = () => {

  const [result, setResult] = useState()

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem('resultTest'))
    if (temp) {
      const t = Object.values(temp)
      setResult(t)
    }
  }, [])

  return (
    <section className='result__page'>
      <div className='text-center'>
        <h3>Danh sách người thi</h3>
      </div>
      <div>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Code Test</th>
            <th>Point</th>
            <th>Created At</th>
          </tr>

          </thead>
          <tbody>
            {
              result && result.map((item, index) => (
                <tr key={index}>
                  <td><Link to={`${item.code}`} style={{color: 'darkblue'}}>{item.code}</Link></td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td><Link to={`/issues/${item.id}`} style={{color: 'darkblue'}}>{item.id}</Link></td>
                  <td>
                    <div>
                      Đúng: {item.point.number}/{item.result.length} câu
                    </div>
                    <div>Điểm: {item.point.point}</div>
                  </td>
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