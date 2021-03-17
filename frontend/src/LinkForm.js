import { useState } from 'react'

import Success from './Success'
import { saveLink } from './api'

const backendUrl = process.env.REACT_APP_BACKEND_URL || window.location.href
const formatShortLink = hash => `${backendUrl}${hash}`

export default function LinkForm(){
  const [url, setUrl] = useState("")
  const [fullShortLink, setFullShortLink] = useState("")
  const [error, setError] = useState("")
  const [isDisabled, setDisabled] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    const postData = {
      link: { url }
    }

    try {
      const { data } = await saveLink(`${backendUrl}api/links`, postData)
      setFullShortLink(formatShortLink(data.hash))
    } catch(e){
      setError(e.errors.url[0])
    }
  }

  const doItAgain = () => {
    setFullShortLink("")
    setUrl("")
    setError("")
  }

  if (fullShortLink) {
    return (
      <Success shortLink={fullShortLink} doItAgain={doItAgain} />
    )
  }

  const validateAndSet = e => {
    setUrl(e.target.value)
    if (!/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e.target.value)){
    // if (!/^(http|https?):\/\/+(www\.)?[a-z0-9\-.]{3,}\.[a-z]{2}$/.test(e.target.value)){
      setDisabled(true)
      setError("Invalid Url")
    } else {
      setDisabled(false)
      setError('')
    }
  }

  const inputClass = `link-input ${error && 'red-outline'}`

  return (
    <div className="form-container">
      <h2>SHORTLY</h2>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="url">Url</label>
            <input
              id="url"
              name="url"
              className={inputClass}
              type="text"
              value={url}
              onChange={validateAndSet}
              placeholder="http://..."
              required
            />
            <div className="space">
            {error && <span role="alert" className="error">{error}</span>}
            </div>
          </div>
            <div className="space">
            <input className="submit" type="submit" value="SUBMIT" disabled={isDisabled} />
              </div>
      </form>
    </div>
  );
}
