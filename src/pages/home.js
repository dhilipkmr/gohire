import React from "react"
import { Link } from "gatsby"
import Wrapper from '../components/Wrapper';
import HeadingLayout from '../components/HeadingLayout';

const Home = () => (
  <Wrapper>
    <HeadingLayout>
      <div>
       <div className="card contest">
        <div className="fb fq ico30">Active Contests</div>
        <div className="noActive">Oops! No Active Contest!😞</div>
       </div>
      </div>
    </HeadingLayout>
  </Wrapper>
)

export default Home
