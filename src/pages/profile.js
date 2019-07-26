import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';

class Profile extends React.Component {

  render() {
    return (
      <Wrapper>
        <HeadingLayout>
          <div>
           <div className="contest">
            <div className="fb fq ico30 mt30 mb75">User Details</div>
           </div>
          </div>
        </HeadingLayout>
      </Wrapper>
    )
  }
}

export default Profile;
