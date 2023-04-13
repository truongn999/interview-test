import React from 'react'
import './issuer.css'
const Issuer = () => {
  return (
    <section>
      <div className='field'>
        <div className='field__title'>Tên đề thi</div>
        <input className='field__input' type="text" />
      </div>

      <div className='field'>
        <div className='field__title'>Số lượng câu hỏi</div>
        <input className='field__input' type="number" />
      </div>

      <div className='field'>
        <div className='field__title'>Thời gian làm bài (phút)</div>
        <input className='field__input' type="number" />
      </div>

      <div className='field'>
        <div className='field__title'>Lựa chọn câu hỏi</div>
        <div className='field__radio'>
            <input id='radio2' type="radio" value="1" name='1' />
            <label htmlFor="radio2">Random</label>
        </div>
        <div className='field__radio'>
            <input id='radio' type="radio" value="0" name='1' />
            <label htmlFor="radio">Tự chọn</label>
        </div>
      </div>
      <div className='text-center'>
        <button className='btn btn-submit'>Tạo đề</button>

      </div>
    </section>
  )
}

export default Issuer