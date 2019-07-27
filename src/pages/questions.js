import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';
import {FaLaptopCode} from "react-icons/fa";
import Timer from 'react-compound-timer';
import axios from 'axios';

const questions = [
  {
    question_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    options: ['Lorem ipsum1', 'Lorem ipsum2', 'Lorem ipsum3', 'Lorem ipsum4'],
    type: 'mcq',
    id: '1'
  },
  {
    question_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    options: ['Lorem ipsum1', 'Lorem ipsum2', 'Lorem ipsum3', 'Lorem ipsum4'],
    type: 'mcq',
    id: '2'
  },
  {
    question_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    options: ['Lorem ipsum1', 'Lorem ipsum2', 'Lorem ipsum3', 'Lorem ipsum4'],
    type: 'mcq',
    id: '3'
  },
  { 
    question_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    options: ['Lorem ipsum1', 'Lorem ipsum2', 'Lorem ipsum3', 'Lorem ipsum4'],
    type: 'mcq',
    id: '4'
  },
  {
    question_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    options: ['Lorem ipsum1', 'Lorem ipsum2', 'Lorem ipsum3', 'Lorem ipsum4'],
    type: 'code',
    id: '5'
  }
];

class Questions extends React.Component {
  state = {
    resolvedApi: false,
    choosenAnswer: {

    }
  }

  componentDidMount() {
    this.beginChallenge();
    import("monaco-editor");
  }

  beginChallenge = () => {
    const user_id = this.props.location.search && this.props.location.search.split('&') ? this.props.location.search.split('&')[0].split('=')[1] : '';
    const contest_id = this.props.location.search && this.props.location.search.split('&') ? this.props.location.search.split('&')[1].split('=')[1] : '';
    const URL = 'https://0b2bae39.ngrok.io/contests/begin_contest/';
    axios.post(URL, { contest_id, user_id }).then((response) => {
      if (response.data && response.data.success) {
        this.setState({
          questions:  response.data.questions_list || questions,
          resolvedApi: true
        });
      } else if (response.data && response.data.error) {
        this.setState({
          active_contests: response.data.active_contests,
          resolvedApi: true
        });
      }
    }, (err) => {
      console.log(err);
      this.setState({
        resolvedApi: true
      });
    });
  }

  updateState = (e) => {
    const propName = e.target.dataset.quest_id;
    const answer = e.target.dataset.answer;
    console.log( e.target.dataset);
    this.setState({
      choosenAnswer: {
        ...this.state.choosenAnswer,
        [propName]: answer
      }
    });
  }

  finalSubmit = () => {
    const answer_list = Object.keys(this.state.choosenAnswer).map((quesId) => {
      return {
        quest_id: quesId,
        answer: this.state.choosenAnswer[quesId]
      }
    });
    console.log(answer_list);
    const URL = 'https://0b2bae39.ngrok.io/contests/submit_contest/';
    axios.post(URL, {answer_list}).then((response) => {
      if (response.data && response.data.success) {
        this.setState({
          showSuccess: true
        });
      }
    }, (err) => {
      console.log(err);
      this.setState({
        showSuccess: true
      });
    });
  }

  mcQuestionRenderer = () => {
    const { questions = [], choosenAnswer} = this.state;
    return (
      <React.Fragment>
        <Timer initialTime={3600000} direction="backward">
          {() => (
            <div>
              <div className="fb fss">Challenge Ends in</div>
              <div className="timer fq">
                <Timer.Hours /> hours 
                <span>&nbsp;</span>
                <Timer.Minutes /> minutes
                <span>&nbsp;</span>
                <Timer.Seconds /> seconds
              </div>
            </div>
          )}
        </Timer>
        {
          questions.map((val, index) => {
            const isMCQ = val.type === 'mcq';
            return (
              <div key={val.id} className="mcqCard">
                <form className="fq ico18 mb10 fb">{(index + 1) + '. ' + val.question_text}</form>
                {isMCQ ?
                  <>
                    {
                      val.options.map((option, indexOption) => {
                        const keyVal = val.id + '_' + indexOption;
                        const isChecked = choosenAnswer[val.id] == (indexOption + 1);
                        return (
                          <div key={keyVal}>
                            <input id={keyVal} type="radio" value={option} onChange={this.updateState} checked={isChecked} data-quest_id={val.id} data-answer={indexOption + 1} />
                            <span>&nbsp;</span>
                            <span>&nbsp;</span>
                            <label className="padL10 fq" htmlFor={keyVal}>{option}</label>
                          </div>
                        );
                      })
                    }
                  </> :
                  <Link to="/editor/" className="fss hand challengeBtn expand transAll hoverShadow tdNone white">
                    <span className="">Solve In Editor <FaLaptopCode className="ml10"/></span>
                  </Link>
                }
              </div>
            );
          })
        }
        <div className="fss hand challengeBtn expand transAll hoverShadow white finalSubmit" onClick={this.finalSubmit}>Submit Challenge</div>
      </React.Fragment>
    );
  }

  showLoader = () => {
    return <div className="loading" ref="loader">Loading Questions...</div>
  }

  render() {
    const {contest_id = '', title = ''} =   typeof(window) !== 'undefined' ? window.history.state : {};
    const {showSuccess, resolvedApi} = this.state;
    const name = this.props.location.search && this.props.location.search.split('=') ? this.props.location.search.split('=')[1] : '';
    return (
      <Wrapper>
        <HeadingLayout>
          <div>
           <div className="contest">
              {showSuccess ?
                <div className="submitted"> Successfully Submitted Test.</div>
                :
                <React.Fragment>
                  <div className="fb fq ico30 mt30 mb75">{title}</div>
                  {(resolvedApi) ? this.mcQuestionRenderer() : this.showLoader()}
                </React.Fragment>
              }
           </div>
          </div>
        </HeadingLayout>
      </Wrapper>
    )
  }
}

export default Questions;
