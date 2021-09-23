import { gql, GraphQLClient } from "graphql-request"
import NavBar from "../components/NavBar"

import Section from "../components/Section"

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN,
    },
  })

  const videosquery = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(videosquery)

  const videos = data.videos

  console.log(data)
  return {
    props: {
      videos,
    },
  }
}

const Home = ({ videos }) => {
  const randomVideo = videos => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const useSeenVideos = (videos) => {
    return videos.filter(video => video.seen === false || video.seen === null)
  }

  return (
    <>
      <NavBar/>
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>
        <div className="video-feed">
          <Section genre={"Recommended for you"} videos={useSeenVideos(videos)} />
          <Section genre={"Family"} videos={filterVideos(videos, 'family')} />
          <Section genre={"Drama"} videos={filterVideos(videos, 'drama')} />
          <Section genre={"Thriller"} videos={filterVideos(videos, 'thriller')}  />
          <Section genre={"Cute"} videos={filterVideos(videos, 'cute')}  />
          <Section genre={"Music"} videos={filterVideos(videos, 'music')}  />
          <Section genre={"Animals"} videos={filterVideos(videos, 'animals')}  />
          <Section genre={"Disney"} videos={filterVideos(videos, 'disney')}  />
          <Section genre={"Star Wars"} videos={filterVideos(videos, 'star-wars')}  />
        </div>
      </div>
    </>
  )
}

export default Home
