import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';
const mcq = [ 
  {
    q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    a: ['Lorem ipsum1', 'Lorem ipsum2', 'Lorem ipsum3', 'Lorem ipsum4'],
    isMCQ: true
  },
  {
    q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 3eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    a: ['Lorem ipsum1', 'Lorem ipsum2', 'Lorem ipsum3', 'Lorem ipsum4'],
    isMCQ: true
  },
  {
    q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    a: ['Lorem ipsum1', 'Lorem ipsum2', 'Lorem ipsum3', 'Lorem ipsum4'],
    isMCQ: true
  },
  {
    q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    a: ['Lorem ipsum1', 'Lorem ipsum2', 'Lorem ipsum3', 'Lorem ipsum4'],
    isMCQ: true
  },
  {
    q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    isMCQ: false
  }
]
class Questions extends React.Component {
  mcQuestionRenderer = () => {
    return (
      <React.Fragment>
        {
          mcq.map((val, index) => {
            const isMCQ = val.isMCQ;
            return (
              <div key={index} className="mcqCard">
                <form className="fq ico18 mb10 fb">{(index + 1) + '. ' + val.q}</form>
                {isMCQ ?
                  <>
                    {
                      val.a.map((option, index) => {
                        const keyVal = val.q + option;
                        return (
                          <div key={keyVal}>
                            <input id={keyVal} type="radio" name="gender" value={option}/>
                            <span>&nbsp;</span>
                            <span>&nbsp;</span>
                            <label className="padL10 fq" htmlFor={keyVal}>{option}</label>
                          </div>
                        );
                      })
                    }
                  </> :
                  <Link to="/editor/" className="fss hand challengeBtn expand transAll hoverShadow tdNone white">
                    <span className="">Solve In Editor</span>
                  </Link>
                }
              </div>
            );
          })
        }
      </React.Fragment>
    );
  }

  render() {
    const name = this.props.location.search && this.props.location.search.split('=') ? this.props.location.search.split('=')[1] : '';
    return (
      <Wrapper>
        <HeadingLayout>
          <div>
           <div className="contest">
            <div className="fb fq ico30 mt30 mb75">{`Go hack Challenge SDE ${name}`}</div>
              {this.mcQuestionRenderer()}
           </div>
          </div>
        </HeadingLayout>
      </Wrapper>
    )
  }
}

export default Questions;
