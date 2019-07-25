import React from 'react';

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
            <input type="text" placeholder="Email"/>
          </div>
          <div className="padT20">
            <input type="password" placeholder="password"/>
          </div>
        </div>
        <div className="padT20 textcenter">
          <span className="btn textcenter hand inbl fb ico18 expand transAll">{this.state.signIn ? 'Sign In' : 'Sign Up'}</span>
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
                <span className="go">go</span>
                <span className="hire">hire</span>
              </div>
            </div>
            <div className="width50 inbl loginCardBg2 textcenter">
              <div className="pad20 marginT70 dflex spaceEven">
                <span onClick={this.changeTab} className={'fb inbl hand expand transAll ' + (signIn ? 'activeTab' : 'inactive')}>Sign In</span>
                <span onClick={this.changeTab.bind(this, false)} className={'fb inbl hand expand transAll ' + (!signIn ? 'activeTab' : 'inactive')}>Sign Up</span>
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