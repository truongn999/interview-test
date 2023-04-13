import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

import './[id].css'
import Question from '../../components/Question/Question';
import QuestionCheck from '../../components/QuestionCheck/QuestionCheck';

const Test = () => {
  const [infoTest, setInfoTest] = useState({})

  const [nameUser, setNameUser] = useState('')
  const [email, setEmail] = useState('')
  const [activeTime, setActiveTime] = useState(false)
  const [step, setStep] = useState(0)

  const [questions, setQuestions] = useState()
  const [result, setResult] = useState()

  const [point, setPoint] = useState({})



  // Khởi tạo state lưu trữ thời gian còn lại của bài thi
  const [timeLeft, setTimeLeft] = useState(0); // 60 phút

  const { id } = useParams();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('testData'))
    if (data[id]) {
      const temp = data[id]
      setInfoTest(temp)
      setQuestions(temp.questions)
      if (temp.time_limit > 0) setTimeLeft(data[id]['time_limit'] * 60)
    } else {}
  }, [])

  

  // Cập nhật thời gian còn lại sau mỗi giây
  useEffect(() => {
    if (step === 1) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
  
      // Clear interval khi timeLeft === 0
      if (timeLeft === 0) {
        handleSubmit()
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    }
  }, [timeLeft, activeTime]);

  // Định dạng thời gian còn lại từ giây sang định dạng mm:ss
  const formattedTimeLeft = new Date(timeLeft * 1000).toISOString().substr(14, 5);

  const handleName = (e) => {
    setNameUser(e.target.value)
  }
  const handleEmail = (e) =>{
    setEmail(e.target.value)
  }
  const handleContinue = (e) =>{
    setStep(1)
    setActiveTime(true)
  }

  const handleSubmit = () => {
    let d = 0
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].answer === questions[i].answer_user) {
        d++
        questions[i] = {...questions[i], check: true}
      } else {
        questions[i] = {...questions[i], check: false}
      }
    }
    const temp = {
      point: (d/(questions.length*10))*100,
      number: d
    }
    setPoint(temp)
    setResult(questions)
    setStep(2)

    const code = new Date().getTime();
    var date = new Date()
    const dformat = [date.getMonth()+1, date.getDate(), date.getFullYear()].join('/')+' '+ [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
    const res = JSON.parse(localStorage.getItem('resultTest'))
    let resultTest = {}
    if (res) resultTest = res
    resultTest[code] = {
      id: id,
      code: code,
      name: nameUser,
      email: email,
      result: questions,
      point: temp,
      time_left: timeLeft,
      created_at: dformat,
    }
    localStorage.setItem('resultTest', JSON.stringify(resultTest))
    NotificationManager.success('Nộp bài thành công', 'Thông báo');
  }

  return (
    <section>
      <div className='text-center test__title'>
        <h3>{ infoTest.name }</h3>
        <div>Số câu hỏi: {infoTest.question_count} câu</div>
        {
          !activeTime ? (
            <div>Thời gian làm bài: {infoTest.time_limit > 0 ? `${infoTest.time_limit} phút` : 'Không giới giạn' }</div>
          ) : (
            <div>Thời gian còn lại: {infoTest.time_limit > 0 ? `${formattedTimeLeft}` : 'Không giới giạn' }</div>
          )
        }
      </div>
      {
        step === 0 && (
          <div>
            <div className='field'>
              <div className='field__title'>Tên người thi <span>*</span></div>
              <input className='field__input' type="text" value={nameUser} onChange={handleName} />
            </div>

            <div className='field'>
              <div className='field__title'>Email <span>*</span></div>
              <input className='field__input' type="email" value={email} onChange={handleEmail} />
            </div>

            <div className='text-center'>
              <button className='btn btn-submit' onClick={handleContinue}>Bắt đầu làm bài</button>
            </div>
          </div>
        )
      }

      {
        step === 1 && (
          <>
            <div className='text-center'>
              <h2>Bài làm</h2>
            </div>
              {questions.map((question, index) => (
              <Question
                key={index}
                question={question}
                index={index}
              />
            ))}
            <div className='text-center'>
              <button className='btn' onClick={() => handleSubmit()}>Nộp bài</button>
            </div>
          </>
        )
      }

      {
        step === 2 && (
          <>
            <div className='text-center'>
              <h2>Kết quả</h2>
              <div>Số câu đúng {point.number}/{questions.length}</div>
              <div>Số điểm đạt được {point.point} /10 điểm</div>
            </div>
              {result.map((question, index) => (
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
        )
      }
    </section>
  )
}

export default Test