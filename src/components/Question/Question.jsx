import React, { useState } from 'react'
import { NotificationManager } from 'react-notifications';
import './question.css'

const Question = ({ question, index, select = false, questionSelectManual, setQuestionSelectManual, questionCount }) => {

  const [answers, setAnswers] = useState({})
  const [selectQ, setSelectQ] = useState({})

  const handleAnswerChange = (event, questionId) => {
    const newAnswers = { ...answers };
    newAnswers[questionId] = event.target.value;
    setAnswers(newAnswers); // Lưu lại đáp án để so sánh tạo checked của input
    question.answer_user = event.target.value //gán đáp án người thi chọn
  };

  const handleChecked = (event, question) => {
    const temp = [...questionSelectManual]
    if (temp.length < questionCount) {
      const newSelected = { ...selectQ }
      if (newSelected[question.id]) {
        delete newSelected[question.id]
      } else newSelected[question.id] = question;
      setSelectQ(newSelected)

      const fi = temp.findIndex(r => r.id === question.id)
      if (fi !== -1) temp.splice(fi, 1);
      else {
        temp.push(question)
      }
      setQuestionSelectManual(temp)
    } else {
      NotificationManager.warning('Đã đạt số lượng câu hỏi được chọn!', 'Thông báo');
    }
    
  }



  return (
    <div className='question'>
      <div className='question__title'>
        { select && ( // Với type = tự chọn thì bật input checkbox
          <input
            type="checkbox"
            value={question.id}
            checked={selectQ[question.id]?.id === question.id ? true : false}
            onChange={(e) => handleChecked(e, question)}
          />)
        }
        <h4>Câu {index + 1}:</h4>
        <span>{ question.name }</span>
      </div>
      <div className='question__box'>
        {
          question.options.map((option) => (
            <div className='question__radio' key={option}>
              <input
                type="radio"
                value={option}
                checked={answers[question.id] === option}
                onChange={(e) => handleAnswerChange(e, question.id)}
              />
              <label>{ option }</label>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Question