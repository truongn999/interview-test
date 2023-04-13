import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

import Header from './components/Header/Header';
import Issuer from './pages/Issuer/Issuer';
import Issues from './pages/Issues/Issues';
import Test from './pages/Test/[id]';
import Question from './pages/Question/Question';
import Result from './pages/Result/Result';
import ResultDetail from './pages/Result/[id]';
import IssuesDetail from './pages/Issues/[id]';

function App() {
  // let element = useRoutes([
  //   {path: '/', element: <Issuer />},
  // ]);

  // return element;
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Question />} />
        <Route path='/test/:id' element={<Test />} />
        <Route path='/issuer' element={<Issuer />} />
        <Route path='/issues' element={<Issues />} />
        <Route path='/issues/:id' element={<IssuesDetail />} />
        <Route path='/result' element={<Result />} />
        <Route path='/result/:id' element={<ResultDetail />} />
      </Routes>
      <NotificationContainer/>
    </BrowserRouter>
  );
}

export default App;
