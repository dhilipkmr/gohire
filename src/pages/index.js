import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import LoginCard from '../components/Home/LoginCard';
import Wrapper from '../components/Wrapper';


const IndexPage = () => (
  // <Layout>
  //   <SEO title="Home" />
  //   <h1>Hi people</h1>
  //   <p>Welcome to your our Hiring Website</p>
  //   <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
  //     <Image />
  //   </div>
  //   <Link to="/page-2/">Go to page 2</Link>
  // </Layout>
  <Wrapper>
    <div>
      <LoginCard/>
    </div>
  </Wrapper>
)

export default IndexPage
