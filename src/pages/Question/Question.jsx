import React, { useEffect, useState } from 'react'
import './question.css'
import { NotificationManager } from 'react-notifications';
import QuestionCheck from '../../components/QuestionCheck/QuestionCheck';
// import 'react-notifications/lib/notifications.css';

const Question = () => {
  const [name, setName] = useState('')
  const [answer, setAnswer] = useState('')
  const [options, setOptions] = useState(['',''])

  const [questions, setQuestions] = useState([]) //Lấy lại DS câu hỏi từ localStorage

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: 'Javascript là gì?',
        options: ['Là thư viện', 'Là ngôn ngữ lập trình', 'Tất cả sai', 'Tất cả đúng'],
        answer: 'Là ngôn ngữ lập trình',
        selected_count: 0,
        created_at: ''
      },
      {
        id: 2,
        name: 'Biến Var và Let có cơ chế hoisting không?',
        options: ['Chỉ có Var', 'Chỉ có Let', 'Tất cả sai', 'Tất cả đúng'],
        answer: 'Tất cả đúng',
        selected_count: 0,
        created_at: ''
      },
      {
        id: 3,
        name: 'Có bao nhiêu biến trong Javascript?',
        options: ['5', '6', '7', '8'],
        answer: '7',
        selected_count: 0,
        created_at: ''
      },
      {
        id: 4,
        name: 'Sự khác biệt giữa undefined và null là gì?',
        options: ['Không có sự khác biệt', 'Khác nhau'],
        answer: 'Khác nhau',
        selected_count: 0,
        created_at: ''
      },
      {
        id: 5,
        name: 'Đâu không phải là đặc điểm của React?',
        options: ['JSX', 'Components', 'Truyền dữ liệu 2 chiều', 'Hiệu suất cao'],
        answer: 'Truyền dữ liệu 2 chiều',
        selected_count: 0,
        created_at: ''
      },
      {
        id: 6,
        name: 'Js là ngôn ngữ thông dịch hay biên dịch?',
        options: ['Thông dịch', 'Biên dịch', 'Tất cả', 'Đều sai'],
        answer: 'Thông dịch',
        selected_count: 0,
        created_at: ''
      },
      {
        id: 7,
        name: 'Trong Javascript sự kiện OnUnload thực hiện khi nào?',
        options: [
          'Khi bắt đầu chương trình chạy',
          'Khi click chuột',
          'Khi kết thúc một chương trình',
          'Khi di chuyển chuột qua'
          ],
        answer: 'Khi kết thúc một chương trình',
        selected_count: 0,
        created_at: ''
      },
      {
        id: 8,
        name: 'Thẻ <textarea ></texterea> dùng để làm gì?',
        options: [
          'Tạo một ô text để nhập dữ liệu 1 dòng',
          'Tạo một ô password',
          'Tạo một textbox cho phép nhập liệu nhiều dòng',
          ],
        answer: 'Tạo một textbox cho phép nhập liệu nhiều dòng',
        selected_count: 0,
        created_at: ''
      },
      {
        id: 9,
        name: 'Công cụ viết code JavaScript',
        options: [
          'Chương trình Notepad++',
          'Dùng chương trình Visual Studio Code',
          'Chương trình Sublime',
          'Tất cả chương trình trên'
          ],
        answer: 'Tất cả chương trình trên',
        selected_count: 0,
        created_at: ''
      },
      {
        id: 10,
        name: 'Mục đích của JavaScript',
        options: [
          'JavaScript được tạo ra với mục đích xử lý các tác vụ phía Client',
          'JavaScript được tạo ra với mục đích tạo nên tính tương tác cho trang web',
          'Tất cả đúng',
          'Tất cả sai'
          ],
        answer: 'Tất cả đúng',
        selected_count: 0,
        created_at: ''
      }
    ]
    const temp = JSON.parse(localStorage.getItem('dataQuestions'))
    if (temp) setQuestions(temp)
    else {
      localStorage.setItem('dataQuestions', JSON.stringify(data))
      setQuestions(data)
    }
  }, [])

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleAddOption = (e) => {
    const temp = [...options]
    temp.push('')
    setOptions(temp)
  }

  const handleAddText = (e, index) => {
    const temp = [...options]
    temp[index] = e.target.value
    setOptions(temp)
  }

  const handleAnswer = (e) => {
    setAnswer(e.target.value)
  }

  const handleSubmit = (e) => {
    if (name && answer && options) {
      const code = new Date().getTime(); // Lấy time làm id code
      var d = new Date()
      const dformat = [d.getMonth()+1, d.getDate(), d.getFullYear()].join('/')+' '+ [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

      let temp = JSON.parse(localStorage.getItem('dataQuestions')) || []
      temp.push({
        id: code,
        answer: answer,
        name: name,
        options: options,
        created_at: dformat,
        selected_count: 0,
      })
      localStorage.setItem('dataQuestions', JSON.stringify(temp))
      NotificationManager.success('Thêm mới câu hỏi thành công', 'Thông báo');

      setAnswer('')
      setName('')
      setOptions(['' ,''])

      setQuestions(JSON.parse(localStorage.getItem('dataQuestions')))
    } else {
      NotificationManager.warning('Vui lòng điền đầy đủ thông tin', 'Thông báo');
    }
  }

  return (
    <section>
      <div>
        <h3>Tạo câu hỏi</h3>
        <div>
            <div className='field'>
              <div className='field__title'>Tiêu đề <span>*</span></div>
              <input className='field__input' type="text" value={name} onChange={handleName} />
            </div>

            <div className='field'>
              <div className='field__title'>Câu trả lời <span>*</span></div>
              <div>
                {
                  options.map((option, index) => (
                    <input key={index} className='field__input' type="text" value={option} onChange={(e) => handleAddText(e, index)} />
                  ))
                }
              </div>
              {options.length <= 6 && (<button className='btn' onClick={handleAddOption}>Thêm câu trả lời</button>)}
            </div>

            <div className='field'>
              <div className='field__title'>Trả lời đúng <span>*</span></div>
              <input className='field__input' type="text" value={answer} onChange={handleAnswer} />
            </div>

            <div className='text-center'>
              <button className='btn btn-submit' onClick={handleSubmit}>Tạo</button>
            </div>
            
            
            {/* Danh sách câu hỏi trong kho câu hỏi */}
            <div className='text-center'>
              <h2>Kho câu hỏi</h2>
            </div>
              {questions.map((question, index) => (
              <QuestionCheck
                key={index}
                question={question}
                index={index}
              />
            ))}
          </div>
      </div>
    </section>
  )
}

export default Question