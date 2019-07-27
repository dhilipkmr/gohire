import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';
import {IoMdCodeWorking} from "react-icons/io";
import axios from 'axios';
import { MdCode } from "react-icons/md";

const Users = [{
    name: 'Dhilip',
    id: 1,
    company: 'goibibo',
    yoe: '3'
  },
  {
    name: 'Shashank',
    id: 2,
    company: 'goibibo',
    yoe: '4'
  },
  {
    name: 'Naga',
    id: 3,
    company: 'goibibo',
    yoe: '1'
  },
  {
    name: 'Biswa',
    id: 4,
    company: 'goibibo',
    yoe: '1'
  },
  {
    name: 'Deepak',
    id: 5,
    company: 'goibibo',
    yoe: '2'
  }];
class Home extends React.Component {
  state = {
    resolvedApi: false,
    active_contests: [],
    search: ''
  }

  componentDidMount() {
    this.getContests();
  }

  getContests = () => {
    const headers = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}, withCredentials: true};
    const uid = this.props.location.search && this.props.location.search.split('=') ? this.props.location.search.split('=')[1] : '';
    const URL = 'http://360aa7b1.ngrok.io/contests/get_contests/?user_id=' + uid;
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
        <div className="fb fq ico30 mt30 mb75">Active Contests</div>
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

  renderAdminFLow = () => {
    let filteredUsers = Users.filter((val) => {
      return val.name.toLowerCase().indexOf(this.state.search) > -1;
    });
    if (this.state.filter === 'asc') {
      filteredUsers = filteredUsers.sort((a, b) => a.yoe - b.yoe);
    } else if (this.state.filter === 'desc') {
      filteredUsers = filteredUsers.sort((a, b) => b.yoe - a.yoe);
    }
    const details_user = [{ key: 'Name', val: 'Deepak'}, { key: 'Age', val: '22'}, { key: 'Current CTC', val: '1 Crore'}, { key: 'Linkedin', val: 'htps://www.linkedin.com/in/deepak'}, { key: 'Current Company', val: 'Goibibo'}, { key: 'Experience', val: 3}, { key: 'Contact', val: 9750568258}];
    return (
      <div className="mb200">
         <div className="fb fq ico30 mt30 mb75">User Details</div>
        <div className="mt30">
          <input type="text" style={{marginLeft: '202px'}} placeholder="Search by Name" className="inpRound iiii" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })}/>
        </div>
      <table>
        <tbody>
          <tr>
            <th className="fb">Name</th>
            <th className="fb">Company</th>
            <th className="dflex alignCenter">Years of Experience<MdCode className="rotate90" onClick={()=>this.setState({search: '', filter: (this.state.filter === 'desc' ? 'asc' : 'desc')})}/></th>
          </tr>
          {filteredUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td className="fb hand" onClick={()=> {this.refs.filler.classList.toggle('dn'); window.scrollTo(0,750)}}>{user.name}</td>
                <td>{user.company}</td>
                <td>{user.yoe}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: '160px'}} className="dn" ref="filler">
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Details</th>
            </tr>
            {details_user.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="fb">{user.key}</td>
                  <td>{user.val}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div class="card" style={{ marginTop: '30px', borderRadius: '5px', padding: '40px'}}>
          <div className="fb">Feedback Round 1</div>
          <div>Performed excellently in Data structures and Algorithm.</div>
        </div>
        </div>
      </div>
    );
  }

  render() {
    let {resolvedApi} = this.state;
    // const isStaff = (typeof(window) !== 'undefined' && window.history.state ) ? window.history.state.isStaff : false;
    const uid = this.props.location.search && this.props.location.search.split('=') ? this.props.location.search.split('=')[1] : '';
    let isStaff = uid == 24;
    return (
      <Wrapper>
        <HeadingLayout>
          <div>
           <div className="contest">
              {!resolvedApi ? this.showLoader() : null}
              {(resolvedApi && !isStaff) ? this.questionRenderer() : null}
              {(resolvedApi && isStaff) ? this.renderAdminFLow() : null}
           </div>
          </div>
        </HeadingLayout>
      </Wrapper>
    )
  }
}

export default Home;
