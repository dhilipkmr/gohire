import React from 'react';
import { Link } from "gatsby"
import axios from 'axios';
import { navigate } from '@reach/router';

class LoginCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      password: '',
      email: ''
    };
  }

  changeTab = (val) => {
    if (this.state.signIn !== val) {
      this.setState({
        signIn: val
      });
    }
  }

  authenticate = () => {
    const {email, password, signIn} = this.state;
    const URL = 'http://0b2bae39.ngrok.io/user/' + (!signIn ? 'register/' : 'user_login/');
    axios.post(URL,
      {
        password, email, username: email
      }).then((response) => {
      if (response.data && !response.data.error) {
        navigate(
          "/home/",
          {
            state: {
              isStaff: response.data.is_staff
            },
          }
        );
      }
    }, (err) => {
      console.log(err);
    });
  }


  signInComp = () => {
    return (
      <React.Fragment>
        <div>
          <div className="padT20">
            <input className="inpRound fss" type="text" placeholder="email" name="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value})}/>
          </div>
          <div className="padT20">
            <input className="inpRound fss" type="password" placeholder="password" name="password"  value={this.state.password} onChange={(e) => this.setState({ password: e.target.value})}/>
          </div>
        </div>
        <div className="padT20 textcenter">
          <span>
            {/* <Link className="btn textcenter hand inbl fb ico18 expand transAll tdNone fq" to="/home/">{this.state.signIn ? 'Sign In' : 'Sign Up'}</Link> */}
            <span className="btn textcenter hand inbl fb ico18 expand transAll tdNone fq" onClick={this.authenticate}>{this.state.signIn ? 'Sign In' : 'Sign Up'}</span>
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