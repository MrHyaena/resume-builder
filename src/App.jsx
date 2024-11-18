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

const educObject = {
  id: 0,
  school: "Vysoká škola ekonomická v Praze",
  program: "Finance",
  yearStart: "2018",
  yearEnd: "2023",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe totam ad possimus! Modi ipsum deleniti sapiente ullam eveniet perspiciatis, neque fugit blanditiis unde amet culpa quam eaque nobis illum? Voluptatem!",
};

// Application being put together

export default function App() {
  const [eduId, setEduId] = useState(1);
  const [personalInfo, setPersonalInfo] = useState(infoObject);
  const [education, setEducation] = useState([educObject]);

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

  function addEducation() {
    const school = document.getElementById("school");
    const program = document.getElementById("program");
    const yearStart = document.getElementById("eduStart");
    const yearEnd = document.getElementById("eduEnd");
    const description = document.getElementById("description");

    setEducation([
      ...education,
      {
        id: eduId,
        school: school.value,
        program: program.value,
        yearStart: yearStart.value,
        yearEnd: yearEnd.value,
        description: description.value,
      },
    ]);

    setEduId(eduId + 1);
    school.value = "";
    program.value = "";
    yearStart.value = "";
    yearEnd.value = "";
    description.value = "";

    return;
  }

  function deleteEducation() {}

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
        <h2 className="controlHead">Education</h2>
        <EducationControls addEducation={addEducation} />
        <div className="itemsControl">
          <EducationControlsDivs education={education} />
        </div>
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
          <div className="education">
            <CvEducation education={education} />
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
      <div className="controlsSection">
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

function EducationControls({ addEducation }) {
  return (
    <>
      <div className="controlsSection">
        <label>
          School Name
          <input id="school"></input>
        </label>
        <label>
          Program
          <input id="program"></input>
        </label>
        <label>
          Description
          <textarea id="description"></textarea>
        </label>
        <label>
          Starting Year
          <input id="eduStart"></input>
        </label>
        <label>
          Ending Year
          <input id="eduEnd"></input>
        </label>

        <button onClick={addEducation}>Add</button>
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

function CvEducation({ education }) {
  const educationarray = education.map((item, index) => {
    console.log(item);
    return (
      <div key={index} className="educationItem">
        <h5>{item.yearStart + "-" + item.yearEnd}</h5>
        <h2>{item.school}</h2>
        <h3>{item.program}</h3>
        <p>{item.description}</p>
      </div>
    );
  });

  return <>{educationarray}</>;
}

function EducationControlsDivs({ education }) {
  const educationarray = education.map((item, index) => {
    return (
      <div key={index} className="educationItemControls">
        <h4>{item.school}</h4>

        <button className="educationDelete">❌</button>
      </div>
    );
  });

  return <>{educationarray}</>;
}
