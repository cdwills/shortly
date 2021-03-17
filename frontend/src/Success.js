export default function Success({ doItAgain, shortLink }) {
  return (
    <div className="form-container">
      <h2>Success!</h2>
      <div className="success-message">
        Checkout your new Shortly short link!
      </div>
        <div className="shortLink">

        <a href={shortLink} rel="noreferrer" target="_blank">{shortLink}</a>
          </div>
      <div className="do-it-again">
        <button onClick={doItAgain}>Do it again!</button>
      </div>
    </div>
  )
}
