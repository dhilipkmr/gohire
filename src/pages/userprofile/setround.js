import React from 'react';
import { Link } from "gatsby"
import axios from 'axios';

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
    const {email, password} = this.state;
    axios.post('http://f495e2b2.ngrok.io/user/register/',
      {
        password, email
      }).then((response) => {
      console.log(response);
    }, (err) => {
      console.log(err);
    });
  }

  // updateState = (event) => {
  //   const val = event.target.value;
  //   const name = event.target.name;
  //   console.log(event);
  //   this.setState({
  //     [name]: name
  //   });
  //   console.log(this.state);
  // }

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
            <span onClick={this.authenticate}>Sign In</span>
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