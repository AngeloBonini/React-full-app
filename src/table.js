import React, { useEffect, useState } from 'react';
import download from 'downloadjs';
import api from './services/api';
import styled from 'styled-components';


const StyledApp = styled.div`
button {
    cursor: pointer;
    font-weight: light;
  }
  
  .title {
    padding: 25px;
    height: 100%;
  }
  
  .absences_download {
    align-items: flex-end;
  }
  
  .absences_download button {
    background-color: #1928ff;
    border: 1px solid #F2F2F2;
    width: 180px;
    height: 39px;
    color: white;
    border-radius: 5px;
  }
  
  .table-container {
    overflow: auto;
    height: calc(100vh - 300px);
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    position: relative;
    overflow-x:auto;
  }
  
  .table tr {
    display: flex;
    justify-content: space-between;
  }
  
  .table th {
    background: #1928ff;
    color: white;
    height: 51px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .table span {
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


  async function downloadIcs() {
    const res = await api.get('/');
    download(res.data, 'calendar.ics');
  }

  return (
      <StyledApp>
    <div className="title">
      <h1>Absence Calendar</h1>
        <div className="absences_download">
          <button onClick={ () => downloadIcs() }>Download Calendar</button>
        </div>
      </div>
      <div className="table-container">
        { 
          <table className="table">
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
