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
      src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F213727%2Fpexels-photo-213727.jpeg%3Fcs%3Dsrgb%26dl%3Dnature-branches-plant-213727.jpg%26fm%3Djpg&f=1&nofb=1',
      altText: 'Slide 1',
      caption: "",
      header: `Welcome, ${props.firebaseUser.displayName}!`,
      key: '1'
    },
    {
      src: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fminimalismlab.com%2Fwp-content%2Fuploads%2F2017%2F12%2Fsarah-dorweiler-357715.jpg&f=1&nofb=1',
      altText: 'Slide 2',
      caption: "",
      header: 'Keep track of your personal gardens',
      key: '2'
    },
    {
      src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftreadingmyownpath.com%2Fwp-content%2Fuploads%2F2016%2F09%2FTreading-My-Own-Path-Minimalism.jpg&f=1&nofb=1',
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