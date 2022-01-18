import { useEffect, useState } from 'react';
// import callToApi from '../services/api';
// import ls from '../services/localStorage';
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
        id: '487132947328',
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
      return (
        <tr key={student.id}>
          <td className="table__row--column">{student.name}</td>
          <td className="table__row--column">{student.counselor}</td>
          <td className="table__row--column">{student.speciality}</td>
        </tr>
      );
    });

  return (
    <div>
      <header>
        <h1>Adalabers</h1>
        <input
          type="text"
          placeholder="Busca por alumna..."
          value={search}
          onChange={handleInputSearch}
        />
        <select
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
      </header>
      <main>
        <section>
          <table>
            <thead>
              <tr>
                <th className="table__row--column">Nombre</th>
                <th className="table__row--column">Tutora</th>
                <th className="table__row--column">Especialidad</th>
              </tr>
            </thead>
            <tbody>{renderStudents}</tbody>
          </table>
        </section>
        <section>
          <form onSubmit={(ev) => ev.preventDefault()}>
            <h2>Añadir una Adalaber</h2>
            <label className="label" htmlFor="name">
              Nombre:
              <input
                type="text"
                id="name"
                value={studentName}
                onChange={handleChangeName}
              />
            </label>
            <label className="label" htmlFor="counselor">
              Tutora:
              <input
                type="text"
                id="counselor"
                value={counselor}
                onChange={handleChangeCounselor}
              />
            </label>
            <label className="label" htmlFor="speciality">
              Especialidad:
              <input
                type="text"
                id="speciality"
                value={speciality}
                onChange={handleChangeSpeciality}
              />
            </label>
            <button onClick={handleAddAdalaber}>
              Añadir una nueva Adalaber
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
