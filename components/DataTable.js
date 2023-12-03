import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedRole, setEditedRole] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const pageSize = 10;

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (id, name, email, role) => {
    setEditingUserId(id);
    setEditedName(name);
    setEditedEmail(email);
    setEditedRole(role);
    setIsEditMode(true);
    setSelectedRole(role); // Set the selected role when entering edit mode
  };

  const handleSave = (id) => {
    setIsEditMode(false);
  
    // Find the user in the array and update the data
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, name: editedName, email: editedEmail, role: selectedRole }
        : user
    );
    setUsers(updatedUsers);
  
    // Reset the editing state
    setEditingUserId(null);
    setEditedName('');
    setEditedEmail('');
    setEditedRole('');
    setSelectedRole(''); // Reset selected role
  };
  

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === pageSize ? [] : [...paginatedUsers]);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleDeleteSelected = () => {
    setUsers(users.filter((user) => !selectedRows.includes(user)));
    setSelectedRows([]);
  };

  return (

 

<div>
  <div style={{ position: 'relative', display: 'inline-block' }}>
<input
        type="text"
        placeholder="Enter Value.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      
      {searchTerm === '' && (
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '10px',
           
            width: '20px',
            height: '20px',
            backgroundImage: 'url("/search.png")', // Replace with the path to your placeholder image
            backgroundSize: 'cover',
          }}
        />
      )}
      </div>

      <div >
        <button onClick={handleDeleteSelected} className={styles.addButton} />
    
      </div>
 
<div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader} >
              <input
              
                type="checkbox"
                checked={selectedRows.length === pageSize}
                onChange={handleSelectAll}
              />
            </th>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>Role</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {paginatedUsers.map((user) => (
          <tr key={user.id} className={`${styles.tableRow} ${selectedRows.includes(user) ? styles.selectedRow : ''}`}>
              <td>
                <input
                style={{marginLeft:'22px' }}
               
                  type="checkbox"
                  checked={selectedRows.includes(user)}
                  onChange={() => {
                    const newSelectedRows = selectedRows.includes(user)
                      ? selectedRows.filter((selectedUser) => selectedUser !== user)
                      : [...selectedRows, user];
                    setSelectedRows(newSelectedRows);
                  }}
                />
              </td>
              <td>
              {editingUserId === user.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className={styles.editInput} // Add your custom class for styling
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editingUserId === user.id ? (
                <input
                  type="text"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className={styles.editInput} // Add your custom class for styling
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {editingUserId === user.id ? (
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className={styles.editSelect} // Add your custom class for styling
                >
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
              ) : (
                user.role
              )}
            </td>
              <td>
                {editingUserId === user.id ? (
                  <button className={styles.saveButton} onClick={() => handleSave(user.id)}>
             
                  </button>
                ) : (
                  <>
                    <button className={styles.editButton} onClick={() => handleEdit(user.id, user.name, user.email, user.role)}>
         
                    </button>
                    <button className={styles.deleteButton} onClick={() => handleDelete(user.id)}>
                    
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="pagination" style={{ display: 'flex', justifyContent: 'space-between' ,marginTop:'10px'}}>
  {/* The following div will be hidden in mobile view */}
  <div className={`${styles.paginationInfo} ${styles.hideMobile}`} style={{color:'#777777'}}>
    {selectedRows.length} of {filteredUsers.length} row(s) selected
  </div>

  <div style={{ display: 'flex', alignItems: 'center' }} className='hideMobile'>
    <div className={`${styles.hideMobile}`}>
      Page {currentPage} of {totalPages}
    </div>
    <button
      disabled={currentPage === 1}
      onClick={() => handlePageChange(1)}
      className={styles.first}
    >
      GG
    </button>
    <button
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
      className={styles.previous}
    >
      GG
    </button>
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        disabled={currentPage === index + 1}
        className={styles.pagitationb}
      >
        {index + 1}
      </button>
    ))}
    <button
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
      className={styles.next}
    >
      GG
    </button>
    <button
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(totalPages)}
      className={styles.last}
    >
      GG
    </button>
  </div>
</div>





      
    </div>
  );
};

export default App;
