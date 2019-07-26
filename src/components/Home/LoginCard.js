import React from 'react';
import { Link } from "gatsby"

class LoginCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true
    };
  }

  changeTab = (val) => {
    if (this.state.signIn !== val) {
      this.setState({
        signIn: val
      });
    }
  }

  signInComp = () => {
    return (
      <React.Fragment>
        <div>
          <div className="padT20">
            <input className="inpRound fss" type="text" placeholder="email"/>
          </div>
          <div className="padT20">
            <input className="inpRound fss" type="password" placeholder="password"/>
          </div>
        </div>
        <div className="padT20 textcenter">
          <span>
            <Link className="btn textcenter hand inbl fb ico18 expand transAll tdNone fq" to="/home/">{this.state.signIn ? 'Sign In' : 'Sign Up'}</Link>
          </span>
          <div className="forgot hand">Forgot Password?</div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {signIn} = this.state;
    return (
      <div className="posRel loginBg">
        <div className="center card">
          <div className="dflex">
            <div className="width50 inbl loginCardBg1 height450">
              <div className="mt180 textcenter">
                <span className="go ico18 fq">go</span>
                <span className="hire fq">hire</span>
              </div>
            </div>
            <div className="width50 inbl loginCardBg2 textcenter">
              <div className="pad20 marginT70 dflex spaceEven">
                <span onClick={this.changeTab} className={'fb inbl hand expand transAll fss ' + (signIn ? 'activeTab' : 'inactive')}>Sign In</span>
                <span onClick={this.changeTab.bind(this, false)} className={'fb inbl hand expand transAll fss ' + (!signIn ? 'activeTab' : 'inactive')}>Sign Up</span>
              </div>
              {this.signInComp()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginCard;