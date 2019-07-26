import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';

class Editor extends React.Component {
  render() {
    return (
      <Wrapper>
        <HeadingLayout>
          <div>
           <div className="contest">
            <div className="fb fq ico30 mt30 mb75">Question</div>
              <div className="ico20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</div>
              <textarea/>
           </div>
          </div>
        </HeadingLayout>
      </Wrapper>
    )
  }
}

export default Editor;
