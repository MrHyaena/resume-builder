import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

import "./App.css";

import { jsPDF } from "jspdf";

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

const workObject = {
  id: 0,
  company: "Foxdeli",
  position: "Sales manager",
  workStart: "2018",
  workEnd: "2023",
  workDescription:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe totam ad possimus! Modi ipsum deleniti sapiente ullam eveniet perspiciatis, neque fugit blanditiis unde amet culpa quam eaque nobis illum? Voluptatem!",
};

// Application being put together

export default function App() {
  function download() {
    let element = document.getElementById("cv");

    let opt = {
      margin: 0,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    let pdf = html2pdf().set(opt).from(element.innerHTML).outputImg();
    pdf.then(() => {
      setTimeout(() => {
        pdf.save();
      }, 5000);
    });

    html2pdf(pdf, opt);
  }

  const [personalInfo, setPersonalInfo] = useState(infoObject);

  const [eduId, setEduId] = useState(1);
  const [education, setEducation] = useState([educObject]);

  const [work, setWork] = useState([workObject]);
  const [workId, setWorkId] = useState(1);

  const [open, setOpen] = useState(0);

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

  function addWork() {
    const company = document.getElementById("company");
    const position = document.getElementById("position");
    const workStart = document.getElementById("workStart");
    const workEnd = document.getElementById("workEnd");
    const workDescription = document.getElementById("workDescription");

    setEducation([
      ...education,
      {
        id: workId,
        company: company.value,
        position: position.value,
        workStart: workStart.value,
        workEnd: workEnd.value,
        workDescription: workDescription.value,
      },
    ]);

    setWorkId(eduId + 1);
    company.value = "";
    position.value = "";
    workStart.value = "";
    workEnd.value = "";
    workDescription.value = "";

    return;
  }

  function deleteEducation(id) {
    const index = education.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newArray = [
        ...education.slice(0, index),
        ...education.slice(index + 1),
      ];
      setEducation(newArray);
    }

    return;
  }

  function deleteWork(id) {
    const index = work.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newArray = [...work.slice(0, index), ...work.slice(index + 1)];
      setWork(newArray);
    }

    return;
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
          open={open}
          setOpen={setOpen}
        />

        <EducationControls
          addEducation={addEducation}
          open={open}
          setOpen={setOpen}
        />
        <div className="itemsControl">
          <EducationDivs
            education={education}
            deleteEducation={deleteEducation}
          />
        </div>

        <WorkControls addWork={addWork} open={open} setOpen={setOpen} />
        <div className="itemsControl">
          <WorkDivs work={work} deleteWork={deleteWork} />
        </div>
      </div>
      <div className="board">
        <button onClick={download}>Download</button>
        <div id="cv">
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
            <h3 className="cvSectionHeading">Education</h3>
            <CvEducation education={education} />
          </div>
          <div className="education">
            <h3 className="cvSectionHeading">Work Experience</h3>
            <CvWork work={work} />
          </div>
        </div>
      </div>
    </>
  );
}

// Controls

function PersonalInfoControls({
  setName,
  setSurname,
  setEmail,
  setPhone,
  setAdressone,
  setAdresstwo,
  open,
  setOpen,
}) {
  if (open !== 1) {
    return (
      <>
        <div className="headerSection">
          <h2 className="controlHead">Personal information</h2>
          <button
            id="infoBtn"
            onClick={() => {
              setOpen(1);
            }}
          >
            Open
          </button>
        </div>
      </>
    );
  } else if (open === 1) {
    return (
      <>
        <div className="headerSection">
          <h2 className="controlHead">Personal information</h2>
          <button
            id="infoBtn"
            onClick={() => {
              setOpen("");
            }}
          >
            Close
          </button>
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
}

function EducationControls({ addEducation, open, setOpen }) {
  if (open !== 2) {
    return (
      <>
        <div className="headerSection">
          <h2 className="controlHead">Education</h2>
          <button
            id="infoBtn"
            onClick={() => {
              setOpen(2);
            }}
          >
            Open
          </button>
        </div>
      </>
    );
  } else if (open == 2) {
    return (
      <>
        <div className="headerSection">
          <h2 className="controlHead">Education</h2>
          <button
            id="eduBtn"
            onClick={() => {
              setOpen("");
            }}
          >
            Close
          </button>
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
}

function EducationDivs({ education, deleteEducation }) {
  const educationarray = education.map((item, index) => {
    return (
      <div key={index} className="educationItemControls">
        <h4>{item.school}</h4>

        <button
          className="educationDelete"
          onClick={() => {
            deleteEducation(item.id);
          }}
        >
          ❌
        </button>
      </div>
    );
  });

  return <>{educationarray}</>;
}

function WorkControls({ addWork, open, setOpen }) {
  if (open !== 3) {
    return (
      <>
        <div className="headerSection">
          <h2 className="controlHead">Work experience</h2>
          <button
            id="infoBtn"
            onClick={() => {
              setOpen(3);
            }}
          >
            Open
          </button>
        </div>
      </>
    );
  } else if (open == 3) {
    return (
      <>
        <div className="controlsSection">
          <h2 className="controlHead">Work eperience</h2>
          <button
            id="eduBtn"
            onClick={() => {
              setOpen("");
            }}
          >
            Close
          </button>
          <label>
            Company Name
            <input id="company"></input>
          </label>
          <label>
            Position
            <input id="position"></input>
          </label>
          <label>
            Description
            <textarea id="workDescription"></textarea>
          </label>
          <label>
            Starting Year
            <input id="workStart"></input>
          </label>
          <label>
            Ending Year
            <input id="workEnd"></input>
          </label>

          <button onClick={addWork}>Add</button>
        </div>
      </>
    );
  }
}

function WorkDivs({ work, deleteWork }) {
  const workarray = work.map((item, index) => {
    return (
      <div key={"w" + index} className="educationItemControls">
        <h4>{item.company}</h4>

        <button
          className="educationDelete"
          onClick={() => {
            deleteWork(item.id);
          }}
        >
          ❌
        </button>
      </div>
    );
  });

  return <>{workarray}</>;
}

// CV Generation

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
    console.log(education);
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

function CvWork({ work }) {
  const workarray = work.map((item, index) => {
    return (
      <div key={"wcv" + index} className="educationItem">
        <h5>{item.workStart + "-" + item.workEnd}</h5>
        <h2>{item.company}</h2>
        <h3>{item.position}</h3>
        <p>{item.workDescription}</p>
      </div>
    );
  });

  return <>{workarray}</>;
}
