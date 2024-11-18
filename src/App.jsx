import { useState } from "react";
import "./App.css";

// Data for testing

const infoObject = {
  name: "Martin",
  surname: "Dolezal",
  email: "martin.dolezal@gmail.com",
  phone: "602606331",
  adressOne: "Svata Mari 131",
  adressTwo: "385 01",
  paragraph:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque illo voluptate perspiciatis esse fugit beatae, suscipit facilis possimus cum adipisci corporis, sint consectetur aliquid maiores rerum sunt debitis ipsum quae.",
};

// Application being put together

export default function App() {
  const [personalInfo, setPersonalInfo] = useState(infoObject);

  function setName(e) {
    return setPersonalInfo({ ...personalInfo, name: e.target.value });
  }

  function setSurname(e) {
    return setPersonalInfo({ ...personalInfo, surname: e.target.value });
  }

  function setEmail(e) {
    return setPersonalInfo({ ...personalInfo, email: e.target.value });
  }

  function setPhone(e) {
    return setPersonalInfo({ ...personalInfo, phone: e.target.value });
  }

  function setAdressone(e) {
    return setPersonalInfo({ ...personalInfo, adressOne: e.target.value });
  }

  function setAdresstwo(e) {
    return setPersonalInfo({ ...personalInfo, adressTwo: e.target.value });
  }

  return (
    <>
      <div className="controls">
        <h1 className="controlHead">Make your CV!</h1>
        <PersonalInfoControls
          setName={setName}
          setSurname={setSurname}
          setEmail={setEmail}
          setPhone={setPhone}
          setAdressone={setAdressone}
          setAdresstwo={setAdresstwo}
        />
      </div>
      <div className="board">
        <div className="cv">
          <div className="cvHeader">
            <CvInfo
              name={personalInfo.name + " " + personalInfo.surname}
              email={personalInfo.email}
              phone={personalInfo.phone}
              contactAdress={
                personalInfo.adressOne + ", " + personalInfo.adressTwo
              }
              paragraph={personalInfo.paragraph}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Header information + controls

function PersonalInfoControls({
  setName,
  setSurname,
  setEmail,
  setPhone,
  setAdressone,
  setAdresstwo,
}) {
  return (
    <>
      <div className="personalInfoControls">
        <label>
          Your name
          <input onChange={setName}></input>
        </label>
        <label>
          Your surname
          <input onChange={setSurname}></input>
        </label>
        <label>
          Email
          <input onChange={setEmail}></input>
        </label>
        <label>
          Phone
          <input onChange={setPhone}></input>
        </label>
        <label>
          Adress line
          <input onChange={setAdressone}></input>
        </label>
        <label>
          Adress line 2<input onChange={setAdresstwo}></input>
        </label>
      </div>
    </>
  );
}

function CvInfo({ name, phone, email, contactAdress, paragraph }) {
  return (
    <>
      <div className="photo"></div>
      <div className="info">
        <h1 className="fullName">{name}</h1>
        <h4>Phone: {phone}</h4>
        <h4>Email: {email}</h4>
        <h4>Contact adress: {contactAdress}</h4>
        <p>{paragraph}</p>
      </div>
    </>
  );
}
