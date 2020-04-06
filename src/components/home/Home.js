import React, {useState, useEffect} from "react"
import firebase from "firebase"
import API from "../../modules/ApiManager"
import { UncontrolledCarousel } from 'reactstrap';
const Home = (props) => {
//     const [plantCarousel, setPlantCarousel] = useState([1,3,4]);

//   const randomizeCarousel = () => {
//     API.getRandomId().then(setPlantCarousel);
//   };

//   useEffect(() => {
//     randomizeCarousel();
//   }, []);
const items = [
    {
      src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhomeherbgardens.files.wordpress.com%2F2013%2F07%2Fhome-herb-garden-thyme1.jpg&f=1&nofb=1',
      altText: 'Slide 1',
      caption: "",
      header: `Welcome to Perennial, ${props.firebaseUser.displayName}!`,
      key: '1'
    },
    {
      src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbethwalshphotography.files.wordpress.com%2F2016%2F05%2Fdows-lake-wide-open-orange-tulips-2016-00004.jpg&f=1&nofb=1',
      altText: 'Slide 2',
      caption: "",
      header: 'Keep track of your personal gardens',
      key: '2'
    },
    {
      src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.sustainablemarketfarming.com%2Fwp-content%2Fuploads%2F2013%2F06%2Fsweet-potato-field.jpg&f=1&nofb=1',
      altText: 'Slide 3',
      caption: "",
      header: 'Contribute plants to a virtual community garden',
      key: '3'
    }
  ];

  
    return ( 
    <>
            <UncontrolledCarousel items={items} />
    </>
    )

}

export default Home