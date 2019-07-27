import React from 'react';
import { Link } from "gatsby"
import { MdPerson } from "react-icons/md";

class HeadingLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qp: ''
    }
  }
  componentDidMount() {
    this.setState({
      qp: typeof(window) !== 'undefined' ? '' : window.location.search.split('&')[0].split('=')[1]
    });
  }
  render() {
    return(
      <div>
        <div>
          <div className="textleft stickyHeader padTB10 padL20 padB20">
            {/* <Link className="hand tdNone white" to={'/home/?uid=' + this.state.qp}> */}
              <span className="go ico25 fq">go</span>
              <span className="hire ico25 fq">hire</span>
            {/* </Link> */}
            <div className="fr hand ico22">
              <Link className="hand tdNone white" to="/profile/">
                <span className="padT10 white padR10 hand fss">Dhilip</span>
                <MdPerson className="userIcon ico22"/>
              </Link>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default HeadingLayout;
