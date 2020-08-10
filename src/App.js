import React, {Fragment, useState}  from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Main01 } from 'pages';
import { SearchMember } from 'pages';
import { Home } from 'pages';
import { TrialVideo } from 'pages';
import { TrialVideoView } from 'pages';
import { Life } from 'pages';
import { LifeDiagnosis } from 'pages';
import { LifeReport } from 'pages';
import { LifeReportPdf } from 'pages';
import { Study } from 'pages';
import { StudyDiagnosis } from 'pages';
import { StudyReport } from 'pages'
import { LifeTotalReport } from 'pages'
import { StudyTotalReport } from 'pages'
import { MemberRegister } from "pages";
import { Character, CharacterSelectLevel, CharacterStudy } from 'pages';
import { CharacterReport } from 'pages';
import { RoadMap } from "pages";
import { TotalReport } from "pages";
import { SampleLogin } from "pages";
import { ReportDownload } from "pages";
import { LifeReportDownload } from "pages";
import { StudyReportDownload } from "pages";
import { RoadMapDownload } from "pages";
import { CharacterReportDownload } from "pages";
import { useCookies } from 'react-cookie';
const App = () => {
  const [cookies,setCookie] = useCookies();
  const history = useHistory();
  let customerPass = false;
  const customerURL = [
                        '/reportView',
                        '/reportView/life',
                        '/reportView/study',
                        '/reportView/roadMap',
                        '/reportView/character',
                      ];

  

  navigator.userAgent.toLowerCase()
  if (customerURL.includes(history.location.pathname) === true) {
    customerPass = true;
  }

  

  if (cookies.token == null && document.location.origin !== 'http://localhost:3000' && customerPass === false) {
    alert('로그인을 해주세요');
    window.location.href="https://ecm.englishegg.co.kr";
  }
  if (document.location.origin === 'http://localhost:3000' && cookies.token == null) {
    setCookie('token','eyJpdiI6IkYrSFBSU3hwSTZiWjkxSytSY29GaEE9PSIsInZhbHVlIjoiNTg3Yko5SFwvQzZSWHlSakVkNTNkcDQ3TVJycUdMNkIxTU9VcjFFY2ZqcnJLRDlKS001YnQya1g3K0dnXC8wUEF5aVlVd1BoT1lrNkhlQmk2aTNRREFqM0xVRmxidDBwNlhjOURTbzlcL1ErdHZibU9jcDhcL0J4OUhiUmFlR21LOHlTcUFHZ1pEU3ZndFRON2VpYmJ6aEZqVDNEendPTzl6cUVCeXlYd3ZLMEF3YVM4Q015OEdHTDhOMzlDRzJjUXFubk5rbjJjR25YRjhhYmdsSjE4NldxNkpFaEhSV0UzZWVVNjMyZlIyQXc2SFBQNUNLXC95cUx0YnNrU2hUQktnb0QyQ0VoaEtRcVwvMkFTMVRyZEpVYUN1VUhWK1pZOXBZcmlQOFNpS0xqOVUxdjNiWno0ZG9qeWltZUtNQ0swVE81WTJOZnAwNzdVRWswRm5NdEZReWQ2UEJVVHc3MGRYeG5IZFN2bmEzTU5kblhwQlo1NWpsNU4wMW13eitmbkpjUUZOVkFQVlJxbDRNQ2ZrY3p5UlNZZGluS3VobTIrMUFCSzJNRE9yT0NHNlA4cjdWcWpIWjZjVHl6ajEwTlwveVgxTGtKNkl4Ym9ZVE9FQ3ZKcTJTcURoYWxYdG1iRCtuZHdQUHk4QzNcLzFZbDh6SnNuMmFUSFprNFp1T2dQQlwvXC9KUFB0bXB2Q0U5eVhYV2VxY1lnOWtkNVJvRUpWSE5xVTc0VUY1dm92RTBCVGlYXC9IalJFU2c5QURUTUN5c3VWc052RVUiLCJtYWMiOiI5MTdmMjM5MDQ5N2M5YTY3Zjg2OWUzODdiMjc5OGQ1YTlmYTU2MDNlNGIzOGRiZTA4MDg3YjM1NGYyNDRkNzdiIn0%3D',{path : '/',maxAge : 1800});
  }

  const [modalStatus,setModalStatus] = useState('none');
  const showModal = () => {
      setModalStatus('block');
  }

  const closeModal = () => {
      setModalStatus('none');
  }

  return(
          <Fragment>
            <Route exact path="/" component={Main01} />
            <Route path="/login" component={SampleLogin} />
            <Route path="/searchMember" component={SearchMember} />
            <Route path="/memberRegister" component={MemberRegister} />
            <Route path="/home" component={Home} />
            <Route exact path="/trialVideo" component={TrialVideo} />
            <Route path="/trialVideo/view/:index" component={TrialVideoView} />

            <Route exact path="/life" component={Life} />
            <Route path="/life/diagnosis" component={LifeDiagnosis} />
            <Route exact path="/life/report" component={LifeReport} />
            <Route path="/life/report/pdf" component={LifeReportPdf} />

            <Route exact path="/study" component={Study} />
            <Route path="/study/diagnosis" component={StudyDiagnosis} />
            <Route path="/study/report" component={StudyReport} />

            <Route exact path="/character" component={Character} />
            <Route exact path="/character/level" component={CharacterSelectLevel} />
            <Route exact path="/character/study" component={CharacterStudy} />
            
            <Route path="/totalReport/life" component={LifeTotalReport} />
            <Route path="/totalReport/study" component={StudyTotalReport} setModalStatus={showModal} closeModal={closeModal} modalStatus={modalStatus} />
            <Route path="/totalReport/character" component={CharacterReport} />

            <Route exact path="/totalReport" component={TotalReport}/>

            <Route path="/totalReport/roadMap" component={RoadMap} />

            <Route exact path="/reportView" component={ReportDownload} />
            <Route path="/reportView/life" component={LifeReportDownload} />
            <Route path="/reportView/study" component={StudyReportDownload} />
            <Route path="/reportView/roadMap" component={RoadMapDownload} />
            <Route path="/reportView/character" component={CharacterReportDownload} />
          </Fragment>
  )
}

export default App;