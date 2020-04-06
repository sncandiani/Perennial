import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const PersonalPlantModal = (props) => {
    const [modalPlant, setModalPlant] = useState({});
    const [isLoading, setIsLoading] = useState(false);
      useEffect(() => {
        setModalPlant(props.editPlant);
      }, [props.editPlant]);

    const handleFieldChange = e => {
        const stateToChange = { ...modalPlant };
        stateToChange[e.target.id] = e.target.value;
        setModalPlant(stateToChange);
      };

    const updatePlant = e => {
    e.preventDefault();
    setIsLoading(true);
    API.updatePersonalPlant(modalPlant)
    .then(() => {
      props.closeModal()
      setIsLoading(false)
    });
  };
    
return (
    <>
    <div style={{display: `${props.showModal ? "block" : "none"}`}}id="plantModal" className="modal">
        <div className="modal-content">
          <span onClick={props.closeModal} className="close">
            &times;
          </span>
          {/* Start of modal edit detail form */}
          <form className="specialForm">
            <fieldset className="specialFieldset">
              <h1 className="formTitle">Customize Personal Plant</h1>
              <div className="formContent">
                <label htmlFor="name">Nickname:</label> <span></span>
                <input
                  type="text"
                  required
                  onChange={handleFieldChange}
                  id="nickname"
                  value={modalPlant.nickname}
                />
              </div>
              <div className="formContent">
              <label htmlFor="imageUrl">Image Url:</label> <span></span>
              <input
                  type="text"
                  required
                  onChange={handleFieldChange}
                  id="imageUrl"
                  value={modalPlant.imageUrl}
                />
            </div>

              <button
                className="submitButton"
                type="submit"
                disabled={isLoading}
                onClick={updatePlant}
              >
                Submit
              </button>
            </fieldset>
          </form>
          {/* End of modal edit detail form*/}
        </div>
      </div>
    </>
)
}

export default PersonalPlantModal