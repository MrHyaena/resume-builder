import { useState } from "react";
import "./App.css";

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

export default function App() {
  const [personalInfo, setPersonalInfo] = useState(infoObject);

  return (
    <>
      <div className="controls">
        <h1 className="controlHead">Make your CV!</h1>
        <PersonalInfoControls />
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

function PersonalInfoControls() {
  return (
    <>
      <div className="personalInfoControls">
        <label>
          Your name
          <input
            value={personalInfo.name}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, name: e.target.value })
            }
          ></input>
        </label>
        <label>
          Your surname
          <input></input>
        </label>
        <label>
          Email
          <input></input>
        </label>
        <label>
          Phone
          <input></input>
        </label>
        <label>
          Adress line
          <input></input>
        </label>
        <label>
          Adress line 2<input></input>
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
