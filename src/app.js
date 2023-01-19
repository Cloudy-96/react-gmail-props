import { useState } from 'react'

import Emails from './Emails.js'
import initialEmails from './data/emails'

import Header from './Header.js'
// import LeftMenu from './LeftMenu.js'

import './styles/app.css'

function App() {

  const [currentTab, setCurrentTab] = useState('inbox')

  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)

  const getReadEmails = emails => emails.filter(email => !email.read)

  const getStarredEmails = emails => emails.filter(email => email.starred)

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)
  
  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  let filteredEmails = emails

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)


  return (
    <div className="app">
      <Header />

      {/* <LeftMenu unreadEmails={unreadEmails} starredEmails={starredEmails} setCurrentTab={setCurrentTab} setHideRead={setHideRead}/>  */}
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={e => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>   

      <Emails filteredEmails={filteredEmails} toggleRead={toggleRead} toggleStar={toggleStar}/>
    </div>
  )
}

export default App
