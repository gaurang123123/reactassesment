import logo from './logo.svg';
import './App.css';
import Data from './db.json';
import { useState } from 'react';

function App() {
  const [search,setSearch] = useState('')
  const [click,setclick] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const recordperpage = 10;
  const lastIndex = currentPage*recordperpage;
  const firstIndex = lastIndex - recordperpage;
  const records = Data.slice(firstIndex,lastIndex);
  const npage = Math.ceil(Data.length / recordperpage)
  const numbers = [...Array(npage +1).keys()].slice(1);
  const nextpage = () =>{
     if(currentPage !== npage)
     {

       setCurrentPage(currentPage +1)
     }
  }
  const prevpage = () =>{
    if(currentPage !== 1)
    {

      setCurrentPage(currentPage -1)
    }
  }
  const changepage = (id) =>{
    // console.log(id);
       setCurrentPage(id)
  }
  const handleclick = () =>{
    setSearch()
  }
  return (
    <>
    <div>
      <row>
      
          <input className='butt' type='text'placeholder='Search contacts' onChange={(e) => setSearch(e.target.value)}></input>
    
        <button className='butt' onClick={() => handleclick}>Filter</button>
      <button className='butt'>Download</button>
      </row>
    </div>
     <div>
      <table className="table">
        <thead>
          <th><input type="checkbox"></input></th>
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Tags</th>
          <th>Source</th>
        </thead>
        <tbody>
            {
             records.filter((item) =>{
              return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search) || item.phone.includes(search)
             }).map((d,i) =>{
              return (
                <tr key={i}>
                <td><input type="checkbox"></input></td>
                <td>{d.name}</td>
                <td>{d.phone}</td>
                <td>{d.tags ? 'Demo reminder' : 'No data'}</td>
                <td>API</td>
              </tr>
              )
               
              })
            }
          </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a href='#' className='page-link' onClick={prevpage}>Prev</a>
          </li>
          {
          
              numbers.map((n,i) =>{
                return (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                  <a href='#' className='page-link' onClick={() =>changepage(n)}>{n}</a>
                </li>
                )
               
              })
          
           
          }
          <li className='page-item'>
            <a href='#' className='page-link' onClick={nextpage}>Next</a>
          </li>
        </ul>
      </nav>
    </div>
    </>
   
  );

}

export default App;
