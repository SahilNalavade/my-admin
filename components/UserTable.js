import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

const UserTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTriggerReason, setFilterTriggerReason] = useState('');
  const [filterRiskLevel, setFilterRiskLevel] = useState('');
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredData, setFilteredData] = useState(data);
  const [triggerReasons, setTriggerReasons] = useState([]);
  const [riskLevels, setRiskLevels] = useState([]);

  useEffect(() => {
  
    const uniqueTriggerReasons = [
      ...new Set(data.map((user) => user.trigger_reason)),
    ];
    setTriggerReasons(uniqueTriggerReasons);

    const uniqueRiskLevels = [...new Set(data.map((user) => user.risk_level))];
    setRiskLevels(uniqueRiskLevels);
  }, [data]);

  const getSortIcon = (criteria, defaultOrder) => {
    const currentSortOrder =
      sortCriteria === criteria ? sortOrder : defaultOrder;

    return currentSortOrder === 'asc' ? '▲' : '▼';
  };

  const sortByCriteria = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };
  
  const customRiskOrder = ['High', 'Medium', 'Low'];

  useEffect(() => {
 
    const filtered = data.filter(
      (user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) &&
        (filterTriggerReason
          ? user.trigger_reason === filterTriggerReason
          : true) &&
        (filterRiskLevel ? user.risk_level === filterRiskLevel : true)
    );

    if (sortCriteria === 'risk_level') {
      filtered.sort((a, b) => {
        const aValue = customRiskOrder.indexOf(a['risk_level']);
        const bValue = customRiskOrder.indexOf(b['risk_level']);
  
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }
    else if (sortCriteria) {
      filtered.sort((a, b) => {
        const aValue = a[sortCriteria];
        const bValue = b[sortCriteria];

   
        if (typeof aValue === 'string' || typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' || typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

   
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    }


    setFilteredData(filtered);
  }, [searchTerm, filterTriggerReason, filterRiskLevel, sortCriteria, sortOrder, data]);

  return (
    <div>

<div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      {searchTerm === '' && (
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '60%',
           
            width: '20px',
            height: '20px',
            backgroundImage: 'url("/search.png")', // Replace with the path to your placeholder image
            backgroundSize: 'cover',
          }}
        />
      )}
    </div>

   
      <select
        value={filterTriggerReason}
        onChange={(e) => setFilterTriggerReason(e.target.value)}
        className={styles.selectInput}
      >
        <option value="">Trigger Reason</option>
        {triggerReasons.map((reason, index) => (
          <option key={index} value={reason}>
            {reason}
          </option>
        ))}
      </select>


      <select
        value={filterRiskLevel}
        onChange={(e) => setFilterRiskLevel(e.target.value)}
       
        className={styles.selectInput2}
      >
        <option value="">Risk Level</option>
        {riskLevels.map((level, index) => (
          <option key={index} value={level}>
            {level}
          </option>
        ))}
      </select>

 

  <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>User</th>
              <th className={styles.tableHeader}></th>
              <th
                className={styles.tableHeader}
                onClick={() => sortByCriteria('risk_level')}
              >
                Risk Level{' '}
                {getSortIcon('risk_level', 'asc')}
              </th>
              <th
                className={styles.tableHeader}
               
              >
                Trigger Reason{' '}
                
              </th>
              <th className={styles.tableHeader}>In Queue For</th>
              <th
                className={styles.tableHeader}
                onClick={() => sortByCriteria('date_added_on')}
              >
                Date Added On{' '}
                {getSortIcon('date_added_on', 'asc')}
              </th>
              <th className={styles.tableHeader}>Previously Reviewed</th>
            </tr>
          </thead>
  <tbody className={styles.tableBody}>
    {filteredData.map((user, index) => (
      <tr key={index} className={styles.tableRow}>
        <td className={styles.tableDataCell} style={{ textAlign: 'left', paddingLeft: '20px' }}>
          <div>
            <strong>{user.name}</strong>
            <p> {user.email}</p>
          </div>
          
        </td>
        <td className={styles.tableDataCell}>
      <a href="your_link_destination">
        <img src="/link.png" alt="Link" width={20} height={20} />
      </a>
    
</td>
        <td className={styles.tableDataCell} style={{ alignItems: 'center'}}>
          <div style={{ display: 'flex', alignItems: 'center',fontWeight:'bold'  }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                marginRight: '8px',
                marginLeft: '10px',
                backgroundColor: getRiskLevelColor(user.risk_level),
                
              }}
            ></div>
            <span style={{ color: getRiskLevelColor(user.risk_level)}}>{user.risk_level}</span>
          </div>
        </td>
        <td style={{ textAlign: 'center', borderBottom: '1px solid #E4E4E4', fontWeight:'bold'  }}>{user.trigger_reason}</td>
        <td style={{ textAlign: 'center', borderBottom: '1px solid #E4E4E4', fontWeight:'bold' }}>{user.in_queue_for}</td>
        <td style={{ textAlign: 'center', borderBottom: '1px solid #E4E4E4' }}>{user.date_added_on}</td>
        <td className={styles.tableDataCell} style={{ paddingLeft: '25px'}}>
        {user.previously_reviewed === 'Yes' ? (
          <>
            <p style={{fontWeight: 'bold' }}> Yes</p>
            <p>{user.previously_reviewed_date}</p>
          </>
        ) : (
          <p style={{fontWeight: 'bold'}}> No</p>
        )}
      </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
    </div>
  );
};

const getRiskLevelColor = (riskLevel) => {
  switch (riskLevel) {
    case 'Medium':
      return '#88670F'; 
    case 'High':
      return '#7D2424'; 
    case 'Low':
      return '#006540';
    default:
      return 'black';
  }
};


export default UserTable;


