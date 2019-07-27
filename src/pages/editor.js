import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';
import axios from 'axios';

const question_details = {
  question_text : 'egerg',
  description: 'everferferfer'
};

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.monaco = null;
    this.state = {
      resolvedApi: false
    }
    this.user_id = this.props.location.search && this.props.location.search.split('&') ? this.props.location.search.split('&')[0].split('=')[1] : '';
    this.contest_id = this.props.location.search && this.props.location.search.split('&') ? this.props.location.search.split('&')[1].split('=')[1] : '';
    this.question_id = this.props.location.search && this.props.location.search.split('&') ? this.props.location.search.split('&')[2].split('=')[1] : '';
  }

  get_question_details = () => {
    const URL = 'https://0b2bae39.ngrok.io/contests/get_question_details/?user_id=' + this.user_id + '&contest_id=' + this.contest_id + '&question_id=' + this.question_id;
    axios.get(URL).then((response) => {
      if (response.data && response.data.success) {
        this.setState({
          question_details: response.data.question_details[0] || question_details,
          resolvedApi: true
        });
      } else if (response.data && response.data.error) {
        this.setState({
          error: response.data.error,
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

  componentDidMount() {
    import("monaco-editor").then(monaco => {  
      this.monaco = monaco;      // HERE!!
      this.refs.loader.parentElement.removeChild(this.refs.loader);
      this.editor = monaco.editor.create(this.refs.container, {
        value: [
          'def hello_go_hire():',
          '    print("Hello World!")'
        ].join('\n'),
        language: 'python'
      });
    });
    this.get_question_details();
  }

  loadQuestion = () => {
    const {question_text = '', description = ''} = this.state.question_details || {};
    return (
      <div>
        <div className="ico20 textleft fb">{question_text + ' :'}</div>
        <div className="ico20 textleft">{description}</div>
      </div>
    )
  }
  render() {
    const {resolvedApi} = this.state;
    return (
      <Wrapper>
        <HeadingLayout>
          <div>
           <div className="contest">
            <div className="fb fq ico30 mt30 mb75">Question</div>
              {
                resolvedApi ? this.loadQuestion() : <div className="loading" ref="loader">Loading Question...</div>
              }
              <div className="textleft" ref="container" style={{ width: 800, height: 600, border: "1px solid #ccc", margin: "20px auto" }}>
                <div className="loading" ref="loader">Loading Editer. Please wait...</div>
              </div>
              <div className=" fr mr80 fss hand challengeBtn expand transAll hoverShadow tdNone white" onClick={() => console.log(this.editor)}>Submit</div>
           </div>
          </div>
        </HeadingLayout>
      </Wrapper>
    )
  }
}

export default Editor;
