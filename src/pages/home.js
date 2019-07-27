import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';
import {IoMdCodeWorking} from "react-icons/io";
import axios from 'axios';

class Home extends React.Component {
  state = {
    resolvedApi: false,
    active_contests: []
  }

  componentDidMount() {
    this.getContests();
  }

  getContests = () => {
    const headers = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}, withCredentials: true};
    const uid = this.props.location.search && this.props.location.search.split('=') ? this.props.location.search.split('=')[1] : '';
    const URL = 'http://0b2bae39.ngrok.io/contests/get_contests/?user_id=' + uid;
    axios.get(URL).then((response) => {
      if (response.data && response.data.success) {
        this.setState({
          active_contests: response.data.active_contests,
          resolvedApi: true
        });
      } else if (response.data && response.data.error) {
        this.setState({
          active_contests: response.data.active_contests,
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

  showLoader = () => {
    return <div className="loading" ref="loader">Loading Questions...</div>
  }

  questionRenderer = () => {
    const {active_contests = []} = this.state;
    // const user_id = typeof(window) === 'undefined' ? '' : window.history.state.user_id;
    if (active_contests.length === 0) {
      return (
        <div className="loading">No Active Contest available for you!</div>
      );
    }
    const user_id = this.props.location.search && this.props.location.search.split('=') ? this.props.location.search.split('=')[1] : '';
    return (
      <React.Fragment>
        {
          active_contests.map((contest, index) => {
            const id = contest.contest_id;
            const title = contest.contest_title;
            return (
              <div key={id} className="contestCard">
                <span className="fq ico18 ">{title}</span>
                <Link to={'/questions/?uid=' + user_id + '&id=' + id} state={{ contest_id: id, title, user_id }} className="fss hand challengeBtn expand transAll hoverShadow tdNone white">
                  <span className="dflex alignCenter">Solve Challenge <IoMdCodeWorking className="ml10"/></span>
                </Link>
              </div>
            );
          })
        }
      </React.Fragment>
    );
  }

  render() {
    console.log('this', this);
    const {resolvedApi, isStaff} = this.state;
    return (
      <Wrapper>
        <HeadingLayout>
          <div>
           <div className="contest">
            <div className="fb fq ico30 mt30 mb75">Active Contests</div>
              {!resolvedApi ? this.showLoader() : this.questionRenderer()}
           </div>
          </div>
        </HeadingLayout>
      </Wrapper>
    )
  }
}

export default Home;
