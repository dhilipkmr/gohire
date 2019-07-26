import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.monaco = null;
  }

  componentDidMount() {
    import("monaco-editor").then(monaco => {  
      this.monaco = monaco;      // HERE!!
      this.refs.loader.parentElement.removeChild(this.refs.loader);
      this.editor = monaco.editor.create(this.refs.container, {
        value: [
          'def hello_go_hire():',
          ' print("Hello GoHire!!")'
        ].join('\n'),
        language: 'python'
      });
    });

  }

  render() {
    console.log(this);
    return (
      <Wrapper>
        <HeadingLayout>
          <div>
           <div className="contest">
            <div className="fb fq ico30 mt30 mb75">Question</div>
              <div className="ico20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</div>
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
