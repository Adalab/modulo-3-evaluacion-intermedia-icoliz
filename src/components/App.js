import { useEffect, useState } from 'react';
import '../styles/App.scss';

function App() {
  // Set data and call to API
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      'https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json'
    )
      .then((response) => response.json())
      .then((dataAPI) => {
        setData(dataAPI.results);
      });
  }, []);

  // State variables
  const [studentName, setStudentName] = useState('');
  const [counselor, setCounselor] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [selected, setSelected] = useState('all');
  const [search, setSearch] = useState('');

  // Handlers
  const handleChangeName = (ev) => {
    setStudentName(ev.currentTarget.value);
  };
  const handleChangeCounselor = (ev) => {
    setCounselor(ev.currentTarget.value);
  };
  const handleChangeSpeciality = (ev) => {
    setSpeciality(ev.currentTarget.value);
  };

  const handleAddAdalaber = (ev) => {
    ev.preventDefault();

    setData([
      ...data,
      {
        id: data.length,
        name: studentName,
        counselor: counselor,
        promo: 'O',
        speciality: speciality,
        social_networks: [{}],
        teams: [{}],
      },
    ]);
    setStudentName('');
    setCounselor('');
    setSpeciality('');
  };

  const handleChangeSelect = (ev) => {
    setSelected(ev.currentTarget.value);
  };

  const handleInputSearch = (ev) => {
    setSearch(ev.currentTarget.value);
  };

  // Render HTML

  const renderStudents = data
    .filter((student) => {
      if (search !== '') {
        return student.name.toLowerCase().includes(search.toLowerCase());
      } else {
        return student;
      }
    })

    .filter((student) => {
      if (selected === 'all') {
        return student;
      } else if (selected === 'yanelis') {
        return student.counselor === 'Yanelis';
      } else if (selected === 'dayana') {
        return student.counselor === 'Dayana';
      } else if (selected === 'ivan') {
        return student.counselor === 'Iván';
      }
    })
    .map((student) => {
      const rrss = student.social_networks.map((rrss) => ({
        name: rrss.name,
        url: rrss.url,
      }));
      const socialName = rrss.map((eachSocial) => eachSocial.name);
      const socialUrl = rrss.map((eachSocial) => eachSocial.url);

      const socialIcon = socialName.map((name, index) => {
        if (name === 'Twitter') {
          return <i key={index} className="fab fa-twitter"></i>;
        } else if (name === 'GitHub') {
          return <i key={index} className="fab fa-github"></i>;
        } else if (name === 'LinkedIn') {
          return <i key={index} className="fab fa-linkedin-in"></i>;
        } else {
          return null;
        }
      });

      return (
        <tr key={student.id} className="tbody__row">
          <td className="tbody__row--column">{student.name}</td>
          <td className="tbody__row--column">{student.counselor}</td>
          <td className="tbody__row--column">{student.speciality}</td>
          <td className="tbody__row--column">
            <a href={`${socialUrl}`} target="_blank">
              {socialIcon}
            </a>
          </td>
        </tr>
      );
    });

  return (
    <>
      <header className="header">
        <h1 className="header__title">Adalabers</h1>
        <form className="header__container">
          <input
            className="header__input"
            type="text"
            placeholder="Busca por alumna..."
            value={search}
            onChange={handleInputSearch}
          />
          <select
            className="header__select"
            name="filter-students"
            id="filter-students"
            value={selected}
            onChange={handleChangeSelect}
          >
            <option value="all">Cualquiera</option>
            <option value="yanelis">Yanelis</option>
            <option value="dayana">Dayana</option>
            <option value="ivan">Iván</option>
          </select>
        </form>
      </header>
      <main>
        <section className="students-section">
          <table cellSpacing={1} className="table">
            <thead className="thead">
              <tr className="thead__row">
                <th className="thead__row--column">Nombre</th>
                <th className="thead__row--column">Tutora</th>
                <th className="thead__row--column">Especialidad</th>
                <th className="thead__row--column">Redes Sociales</th>
              </tr>
            </thead>
            <tbody className="tbody">{renderStudents}</tbody>
          </table>
        </section>
        <section className="register-section">
          <form className="form" onSubmit={(ev) => ev.preventDefault()}>
            <h2 className="form__title">Añadir una Adalaber</h2>
            <div className="form-container">
              <label className="form__label" htmlFor="name">
                Nombre:
              </label>
              <input
                className="form__input"
                type="text"
                id="name"
                placeholder="Ej: Mari Carmen"
                value={studentName}
                onChange={handleChangeName}
              />
            </div>
            <div className="form-container">
              <label className="form__label" htmlFor="counselor">
                Tutora:
              </label>
              <input
                className="form__input"
                type="text"
                id="counselor"
                placeholder="Yanelis, Dayana o Iván"
                value={counselor}
                onChange={handleChangeCounselor}
              />
            </div>
            <div className="form-container">
              <label className="form__label" htmlFor="speciality">
                Especialidad:
              </label>
              <input
                className="form__input"
                type="text"
                id="speciality"
                placeholder="Javascript, React, Node JS..."
                value={speciality}
                onChange={handleChangeSpeciality}
              />
            </div>
            <button className="form__button" onClick={handleAddAdalaber}>
              Añadir una nueva Adalaber
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
