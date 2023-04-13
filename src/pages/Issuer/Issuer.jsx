import React, { useEffect, useState } from 'react'
import './issuer.css'
import Question from '../../components/Question/Question';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

const Issuer = () => {

  const [questionName, setQuestionName] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [questionType, setQuestionType] = useState('random');

  const [dataQuestions, setDataQuestions] = useState([]); // data được lấy ra từ bộ nhớ tạm || hoặc từ api nếu gọi từ database
  const [questionRes, setQuestionRes] = useState([]); // Câu hỏi được random hoặc được chọn được lưu tạm vào đây
  const [questionSelectManual, setQuestionSelectManual] = useState([]); // Câu hỏi được random hoặc được chọn được lưu tạm vào đây
  const [isShowQ, setIsShowQ] = useState(false);
  const [isShowSelectS, setIsShowSelectS] = useState(false);
  const [step, setStep] = useState(0);
  const [codeTest, setCodeTest] = useState();

  const handleQuestionName = (e) => {
    setQuestionName(e.target.value);
  }
  
  const handleQuestionCountChange = (e) => {
    setQuestionCount(e.target.value);
  }

  const handleTimeLimit = (e) => {
    setTimeLimit(e.target.value);
  }

  const handleQuestionTypeChange = (e) => {
    setQuestionRes([])
    setQuestionType(e.target.value);
  }

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
    let dQuestions = JSON.parse(localStorage.getItem('dataQuestions'))
    if (!dQuestions) {
      localStorage.setItem('dataQuestions', JSON.stringify(data))
      dQuestions = JSON.parse(localStorage.getItem('dataQuestions'))
    }
    setDataQuestions(dQuestions)
  }, [])

  const handleExamCreation = (e) => {
    if (!questionName || !timeLimit || !questionCount) return false
    else {
      // Tại đây có if esle giữa random và tự chọn
      if (questionType === 'random') {
        const questionSelected = generateQuiz(dataQuestions, questionCount)
        const questionSelectedForUser = questionSelected.map((q) => {
          return {...q, answer_user: ''}
        })

        // Sau khi random thì cộng lên 1 cho các câu được chọn ra
        const qdQuestions = dataQuestions.map(obj1 => {
          const obj2 = questionSelected.find(obj2 => obj2.id === obj1.id);
          if (obj2) {
            obj1 = { ...obj1, selected_count: obj1.selected_count + 1 }
          }
          return obj1
        });

        // Sau đó cập nhật lại kho câu hỏi với selected_count vừa được update
        localStorage.setItem('dataQuestions', JSON.stringify(qdQuestions))

        setQuestionRes(questionSelectedForUser) //Lưu lại câu hỏi dc chọn
        setIsShowQ(true)
        setStep(1)
      } else {
        setStep(1)
        setIsShowSelectS(true)
      }
    }
  }
  
  const handleDoneSelected = () => {
    processQ(dataQuestions, questionSelectManual)
    setIsShowSelectS(false)
    setIsShowQ(true)
  }

  const processQ = (data, dataSelected) => {
    const questionSelectedForUser = dataSelected.map((q) => {
      return {...q, answer_user: ''}
    })

    // Sau khi random thì cộng lên 1 cho các câu được chọn ra
    const qdQuestions = data.map(obj1 => {
      const obj2 = dataSelected.find(obj2 => obj2.id === obj1.id);
      if (obj2) {
        obj1 = { ...obj1, selected_count: obj1.selected_count + 1 }
      }
      return obj1
    });

    // Sau đó cập nhật lại kho câu hỏi với selected_count vừa được update
    localStorage.setItem('dataQuestions', JSON.stringify(qdQuestions))
    setQuestionRes(questionSelectedForUser) //Lưu lại câu hỏi dc chọn
  }
  
  const generateQuiz = (questions, numQuestions) => {
    const count = localStorage.getItem('countLimit') || 4 // Lấy ra số lần để so sánh câu hỏi đó là cũ hay mới, ít nhất lấy ra 3 lần (< 4), countLimit có thể được tạo trong setting(tính năng tương lai)
    const shuffledQuestions = [...questions].sort((a, b) => {
      if (a.selected_count < count && b.selected_count >= count) {
        return -1;
      } else if (a.selected_count >= count && b.selected_count < count) {
        return 1;
      } else {
        return Math.random() - 0.5;
      }
    });
    const selectedQuestions = shuffledQuestions.slice(0, numQuestions);
    return selectedQuestions;
  }

  const handleSubmit = () => {
    const code = new Date().getTime();
    var d = new Date()
    const dformat = [d.getMonth()+1, d.getDate(), d.getFullYear()].join('/')+' '+ [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

    const testData = JSON.parse(localStorage.getItem('testData')) || {}
    testData[code] = {
      id: code,
      name: questionName,
      question_count: questionCount,
      time_limit: timeLimit,
      questions: questionRes,
      created_at: dformat
    }
    localStorage.setItem('testData', JSON.stringify(testData))
    setCodeTest(code)
    setStep(3)
    NotificationManager.success('Tạo đề thi thành công', 'Thông báo');
  }

  return (
    <section>
      <div className='field'>
        <div className='field__title'>Tên đề thi <span>*</span></div>
        <input className='field__input' type="text" value={questionName} onChange={handleQuestionName} />
      </div>

      <div className='field'>
        <div className='field__title'>Số lượng câu hỏi <span>*</span></div>
        <input className='field__input' type="number" value={questionCount} onChange={handleQuestionCountChange} />
      </div>

      <div className='field'>
        <div className='field__title'>Thời gian làm bài (phút) <span>*</span></div>
        <input className='field__input' type="number" value={timeLimit} onChange={handleTimeLimit} />
      </div>

      <div className='field'>
        <div className='field__title'>Lựa chọn câu hỏi</div>
        <select value={questionType} onChange={handleQuestionTypeChange}>
          <option value="random">Ngẫu nhiên</option>
          <option value="manual">Tự chọn</option>
        </select>
      </div>
      <div className='text-center'>
        {step === 0 && <button className='btn btn-submit' onClick={handleExamCreation}>Tiếp tục</button>}
      </div>

      {
        questionType === 'manual' && isShowSelectS && (
          <>
            <h4>Đã chọn {questionSelectManual.length}/{questionCount} câu hỏi</h4>
            {dataQuestions.map((question, index) => (
              <Question
                key={index}
                question={question}
                index={index}
                select={true}
                questionSelectManual={questionSelectManual}
                setQuestionSelectManual={setQuestionSelectManual}
                questionCount={questionCount}
              />
            ))}
            <div className='text-center'>
              <button className='btn' onClick={() => handleDoneSelected()}>Hoàn tất chọn câu hỏi</button>
            </div>
          </>
        )
      }
      
      {
        isShowQ && step !== 3 && (
          <>
            <div className='text-center'>
              <h2>Câu hỏi đã được chọn</h2>
            </div>
              {questionRes.map((question, index) => (
              <Question
                key={index}
                question={question}
                index={index}
              />
            ))}
            <div className='text-center'>
              <button className='btn' onClick={() => handleSubmit()}>Khởi tạo đề thi</button>
            </div>
          </>
        )
      }

      {
        step === 3 && (
          <>
            <div>
              Đề thi đã được khởi tạo:
            </div>
            <div>Truy cập vào đường dẫn 
              <a style={{color: 'red'}} href={`http://localhost:3000/test/${codeTest}`} target='_blacnk'> {`http://localhost:3000/test/${codeTest}`} </a>
               để bắt đầu thi</div>
          </>
        )
      }
    </section>
  )
}

export default Issuer