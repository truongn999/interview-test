import React, { useState } from 'react'
import './questionCheck.css'

const QuestionCheck = ({ question, index, isShowResult = true }) => {

  const [answers, setAnswers] = useState({})
  // const [selectQ, setSelectQ] = useState({})

  const handleAnswerChange = (event, questionId) => {
    const newAnswers = { ...answers };
    newAnswers[questionId] = event.target.value;
    setAnswers(newAnswers); // Lưu lại đáp án để so sánh tạo checked của input
    question.answer_user = event.target.value //gán đáp án người thi chọn
  };

  return (
    <div className='question'>
      <div className='question__title'>
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
                disabled
                checked={question.answer_user === option}
                onChange={(e) => handleAnswerChange(e, question.id)}
              />
              <label className={isShowResult && question.answer === option ? 'text-success' : ''}>{ option }</label>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default QuestionCheck