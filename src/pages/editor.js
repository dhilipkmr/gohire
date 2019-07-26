import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';

class Editor extends React.Component {
  componentDidMount() {
    import("monaco-editor").then(monaco => {        // HERE!!
      monaco.editor.create(document.getElementById('container'), {
        value: [
          'function x() {',
          '\tconsole.log("Hello world!");',
          '}'
        ].join('\n'),
        language: 'javascript'
      });
    })
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
              <div className="textleft" id="container" style={{ width: 800, height: 600, border: "1px solid #ccc", margin: "20px auto" }}></div>
              <div className=" fr mr80 fss hand challengeBtn expand transAll hoverShadow tdNone white" >Submit</div>
           </div>
          </div>
        </HeadingLayout>
      </Wrapper>
    )
  }
}

export default Editor;
