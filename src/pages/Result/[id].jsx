import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QuestionCheck from '../../components/QuestionCheck/QuestionCheck';

const ResultDetail = () => {

  const { id } = useParams();

  const [result, setResult] = useState()
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('resultTest'))
    if (res) {
      setResult(res[id])
    }
  }, [])

  return (
    <section>
      {
        result ? (
          <>
            <div className='text-center'>
              <h2>Kết quả</h2>
              <div>Họ tên người thi: {result.name}</div>
              <div>Email người thi: {result.email}</div>
              <div>Số câu đúng {result.point.number}/{result.result.length}</div>
              <div>Số điểm đạt được {result.point.point} /10 điểm</div>
            </div>
              {result.result.map((question, index) => (
              <QuestionCheck
                key={index}
                question={question}
                index={index}
              />
            ))}
            {/* <div className='text-center'>
              <button className='btn' onClick={() => handleSubmit()}>Nộp bài</button>
            </div> */}
          </>
        ) : (
          <div>
            *Không tìm thấy thông tin bài thi {id}
          </div>
        )
      }
    </section>
  )
}

export default ResultDetail