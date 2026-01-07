import { useState } from 'react'
import './App.css'
import data from './data.json'

function App() {
  const [filters, setFilters] = useState([])

  const filteredJobs = data.filter((job) => {
    if (filters.length === 0) return true

    const jobTags = [
      job.role,
      job.level,
      ...job.languages,
      ...job.tools
    ]
    
    return filters.every((filter) => jobTags.includes(filter))
  })

  return (
    <>
      <header className='bg-green-400'>
        <img src="assets/images/bg-header-desktop.svg" alt="" className='width-100 point-event-none hide-in-mob' />
        <img src="assets/images/bg-header-mobile.svg" alt="" className='width-100 height-100 point-event-none hide-in-des' />
      </header>

      <main className='d-flex align-i-center just-c-center flex-column gap-1-5r'>
        <div className={'bg-w d-flex align-i-center just-c-sb width-100 pad-1r bor-rad-5' + (filters.length === 0 ? ' d-none' : '')}>
          <div className='bg-w d-flex gap-1r flex-wrap-mob'>

            {filters.map((filter) => {
              return (
                <div key={filter} className='d-flex align-i-center gap-05r bg-green-50 bor-rad-5 pad-l-05r'>
                  <p className='font-w-700 color-green-400'>{filter}</p>
                  <div onClick={() => setFilters(prevFilters => prevFilters.filter((f) => f !== filter))} className='bg-green-400 d-flex align-i-center just-c-center pad-05r cursor-p tr-a-03s-ea remove-tag'>
                    <img src="assets/images/icon-remove.svg" alt="" />
                  </div>
                </div>
              )
            })}
          </div>
          <p onClick={() => setFilters([])} className='color-green-400 font-w-700 cursor-p tr-a-03s-ea clear-all'>Clear</p>
        </div>

        {filteredJobs.map((job) => {
          return (
            <div key={job.id} className={'bg-w pad-1r bor-rad-10 d-flex align-i-center just-c-sb gap-1r width-100 box-shadow-card flex-column-mob align-i-stretch-mob' + (job.featured ? " bor-l-5-s-green-400" : "")}>
              <div className='d-flex align-i-center gap-2r flex-column-mob align-i-stretch-mob'>
                <div>
                  <img src={"assets/" + job.logo} alt={job.company + " Logo"} className='logo' />
                </div>

                <div className='d-flex flex-column gap-05r'>
                  <p className='d-flex align-i-center gap-1r'>
                    <span className='color-green-400 font-w-700'>{job.company}</span>
                    <span className={'color-w font-w-500 font-s-0-8r pad-new-featured bor-rad-20' + (job.new === true ? " bg-green-400" : " d-none")}>{job.new === true ? "NEW!" : ""}</span>
                    <span className={'color-w bg-green-900 font-w-500 font-s-0-8r pad-new-featured bor-rad-20' + (job.featured ? " bg-green-900" : " d-none")}>{job.featured === true ? "FEATURED" : ""}</span>
                  </p>
                  <h3 className='tr-a-03s-ea cursor-p position'>{job.position}</h3>
                  <div className='d-flex align-i-center gap-1-5r'>
                    <p>
                      <span className='color-gray-400'>{job.postedAt}</span>
                    </p>
                    <ul className='d-flex gap-1-5r'>
                      <li className='color-gray-400'>{job.contract}</li>
                      <li className='color-gray-400'>{job.location}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className='line hide-in-des'></div>

              <div>
                <ul className='d-flex gap-1-5r list-style-none flex-wrap-mob'>
                  <li onClick={() => setFilters(prev => [...prev, job.role])} className='color-green-400 font-w-700 bg-green-50 pad-05r bor-rad-5 cursor-p tr-a-03s-ea role'>{job.role}</li>
                  <li onClick={() => setFilters(prev => [...prev, job.level])} className='color-green-400 font-w-700 bg-green-50 pad-05r bor-rad-5 cursor-p tr-a-03s-ea level'>{job.level}</li>

                  {job.languages.map((language) => {
                    return (
                      <li key={language} onClick={() => setFilters(prev => [...prev, language])} className='color-green-400 font-w-700 bg-green-50 pad-05r bor-rad-5 cursor-p tr-a-03s-ea language'>{language}</li>
                    )
                  })}

                  {job.tools.map((tool) => {
                    return (
                      <li key={tool} onClick={() => setFilters(prev => [...prev, tool])} className='color-green-400 font-w-700 bg-green-50 pad-05r bor-rad-5 cursor-p tr-a-03s-ea tool'>{tool}</li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App
