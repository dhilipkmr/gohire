import React from 'react';
import { Link } from "gatsby"

class HeadingLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <div>
          <div className="textleft stickyHeader padTB10 padL20">
            <span className="go ico25 fq">go</span>
            <span className="hire ico25 fq">hire</span>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default HeadingLayout;
