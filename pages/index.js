import { gql, GraphQLClient } from "graphql-request"
import Link from "next/Link"
import Image from "next/Image"

import NavBar from "../components/NavBar"
import Section from "../components/Section"

import disneyLogo from "../public/disney-button.png"
import marvelLogo from "../public/marvel-button.png"
import natgeoLogo from "../public/natgeo-button.png"
import pixarLogo from "../public/pixar-button.png"
import starwarsLogo from "../public/star-wars-button.png"

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN,
    },
  })

  const videosQuery = gql`
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

  const accountQuery = gql`
    query {
      account(where: { id: "cktls58ko1i700b58pmocsgci" }) {
        username
        avatar {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(videosQuery)
  const videos = data.videos

  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account

  return {
    props: {
      videos,
      account,
    },
  }
}

const Home = ({ videos, account }) => {
  const randomVideo = videos => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos = (videos, genre) => {
    return videos.filter(video => video.tags.includes(genre))
  }

  const useSeenVideos = videos => {
    return videos.filter(video => video.seen === false || video.seen === null)
  }

  return (
    <>
      <NavBar account={account} />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>
        <div className="video-feed">
          <Link href="#disney">
            <div className="franchise" id="disney">
              <Image src={disneyLogo} />
            </div>
          </Link>
          <Link href="#pixar">
            <div className="franchise" id="pixar">
              <Image src={pixarLogo} />
            </div>
          </Link>
          <Link href="#star-war">
            <div className="franchise" id="star-war">
              <Image src={starwarsLogo} />
            </div>
          </Link>
          <Link href="#nat-geo">
            <div className="franchise" id="nat-geo">
              <Image src={natgeoLogo} />
            </div>
          </Link>
          <Link href="#marvel">
            <div className="franchise" id="marvel">
              <Image src={marvelLogo} />
            </div>
          </Link>
        </div>
        <div>
          <Section
            genre={"Recommended for you"}
            videos={useSeenVideos(videos)}
          />
          <Section genre={"Family"} videos={filterVideos(videos, "family")} />
          <Section genre={"Drama"} videos={filterVideos(videos, "drama")} />
          <Section
            genre={"Thriller"}
            videos={filterVideos(videos, "thriller")}
          />
          <Section genre={"Cute"} videos={filterVideos(videos, "cute")} />
          <Section genre={"Music"} videos={filterVideos(videos, "music")} />
          <Section genre={"Animals"} videos={filterVideos(videos, "animals")} />
          <Section id={"disney"} genre={"Disney"} videos={filterVideos(videos, "disney")} />
          <Section
            id={"star-wars"}
            genre={"Star Wars"}
            videos={filterVideos(videos, "star-wars")}
          />
          <Section
            id={"pixar"}
            genre={"Pixar"}
            videos={filterVideos(videos, "pixar")}
          />
          <Section
            id={"marvel"}
            genre={"Marvel"}
            videos={filterVideos(videos, "marvel")}
          />
        </div>
      </div>
    </>
  )
}

export default Home
