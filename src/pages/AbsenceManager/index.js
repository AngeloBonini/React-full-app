import React, { useEffect, useState } from 'react';
import download from 'downloadjs';
import api from '../../services/api';
// import './styles.css';
import styled from 'styled-components';


const StyledApp = styled.div`
button {
    cursor: pointer;
    font-weight: bold;
  }
  
  .absences {
    padding: 25px;
    height: 100%;
  }
  
  .absences__options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 25px 0px;
  }
  
  .absences__filters {
    display: flex;
    flex-direction: row;
  }
  
  .absences__filters input {
    width: 160px;
    height: 39px;
    background: #F2F2F2;
    border-radius: 5px;
    border: 1px solid #F2F2F2;
    padding: 10px;
    margin-right: 15px;
    color: #4F4F4F;
  }
  
  .absences__filters button.search {
    background-color: #FF9419;
    border: 1px solid #F2F2F2;
    width: 80px;
    height: 39px;
    color: white;
    border-radius: 5px;
  }
  
  .absences__filters button {
    width: 100px;
    height: 39px;
    font-weight: bold;
    border: 1px solid #F2F2F2;
  }
  
  .absences__filters button.inactive {
    background-color: #F2F2F2;
    color: #4F4F4F;
  }
  
  .absences__filters button.active {
    background-color: #FF9419;
    color: white;
  }
  
  .absences__filters button.left {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  
  .absences__filters button.right {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  
  .absences__export {
    align-items: flex-end;
  }
  
  .absences__export button {
    background-color: #1928ff;
    border: 1px solid #F2F2F2;
    width: 180px;
    height: 39px;
    color: white;
    border-radius: 5px;
  }
  
  .absences__table-container {
    overflow: auto;
    height: calc(100vh - 300px);
  }
  
  .absences__table {
    width: 100%;
    border-collapse: collapse;
    position: relative;
  }
  
  .absences__table tr {
    display: flex;
    justify-content: space-between;
  }
  
  .absences__table th {
    background: #1928ff;
    color: white;
    height: 51px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .absences__table span {
    margin: auto 0;
  }
  
  td {
    width: 100%;
    border: 0.5px solid #dddddd;
    text-align: center;
    padding: 8px;
    background-color: #F2F2F2;
  }
  
  .divider {
    border-left: 2px solid #000;
    margin: 5px 25px;
    height: 30px;
  }
`;
export default function AbsenceManager() {
  const [absences, setAbsences] = useState([]);
 
  useEffect(() => {
    getAbsences();
  }, []);

  async function getAbsences() {
  
    const response = await api.get(`/absences`);
    setAbsences(response.data.absences);
  }


  async function handleExport() {
    const res = await api.get('/');
    download(res.data, 'absences.ics');
  }

  return (
      <StyledApp>
    <div className="absences">
      <h1>Absence Calendar</h1>
        <div className="absences__export">
          <button onClick={ () => handleExport() }>Export Calendar</button>
        </div>
      </div>
      <div className="absences__table-container">
        { 
          <table className="absences__table">
            <tbody>
              <tr>
                <th><span>Member</span></th>
                <th><span>Type</span></th>
                <th><span>Member Note</span></th>
                <th><span>Start Date</span></th>
                <th><span>End Date</span></th>
              </tr>
              {absences.map((absence) => (
                <tr key={ absence.id }>
                  <td><span>{ absence.userName }</span></td>
                  <td><span>{ absence.message }</span></td>
                  <td><span>{ absence.memberNote }</span></td>
                  <td><span>{ absence.startDate }</span></td>
                  <td><span>{ absence.endDate }</span></td>
                </tr>
              ))}
            </tbody>
          </table>
     }
      </div>
    </StyledApp>
  );
}
