import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';

class Home extends React.Component {

  questionRenderer = () => {
    return (
      <React.Fragment>
        {
          ['', ''].map((val, index) => {
            const id = index + 1;
            return (
              <div key={id} className="contestCard">
                <span className="fq ico18 ">{'Go hack Challenge SDE  ' + id}</span>
                <Link to={'/questions/' + (`?id=${id}`)} className="fss hand challengeBtn expand transAll hoverShadow tdNone white">
                  <span className="">Solve Challenge</span>
                </Link>
              </div>
            );
          })
        }
      </React.Fragment>
    );
    if (0) {
      return  <div className="noActive">Oops! No Active Contest!😞</div>;
    }
  }

  render() {
    return (
      <Wrapper>
        <HeadingLayout>
          <div>
           <div className="contest">
            <div className="fb fq ico30 mt30 mb75">Active Contests</div>
              {this.questionRenderer()}
           </div>
          </div>
        </HeadingLayout>
      </Wrapper>
    )
  }
}

export default Home;
