import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QuestionCheck from '../../components/QuestionCheck/QuestionCheck';

const IssuesDetail = () => {

  const { id } = useParams();

  const [result, setResult] = useState()
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('testData'))
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
              <h2>Chi tiết đề thi</h2>
              <div>Số câu: {result.question_count}</div>
              <div>Thời gian làm bài: {result.time_limit} phút</div>
            </div>
              {result.questions.map((question, index) => (
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

export default IssuesDetail