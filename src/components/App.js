// import { useEffect, useState } from 'react';
import dataAPI from '../data/data.json';
// import callToApi from '../services/api';
// import ls from '../services/localStorage';
// import '../styles/App.scss';

function App() {
  const renderStudents = dataAPI.results.map((student) => {
    return (
      <tr key={student.id}>
        <td>{student.name}</td>
        <td>{student.counselor}</td>
        <td>{student.speciality}</td>
      </tr>
    );
  });

  return (
    <div>
      <header>
        <h1>Adalabers</h1>
      </header>
      <main>
        <section>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tutora</th>
                <th>Especialidad</th>
              </tr>
            </thead>
            <tbody>{renderStudents}</tbody>
          </table>
        </section>
        <section>
          <h2>Añadir una Adalaber</h2>
          <label htmlFor="name">
            Nombre
            <input type="text" id="name" />
          </label>
          <label htmlFor="counselor">
            Tutora:
            <input type="text" id="counselor" />
          </label>
          <label htmlFor="speciality">
            Especialidad:
            <input type="text" id="speciality" />
          </label>
        </section>
      </main>
    </div>
  );
}

export default App;
