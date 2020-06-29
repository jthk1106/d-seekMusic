import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      musicianSeeked: '',
      isSearchSubmitted: false,
      musicianFound: [],
      albums: []
    }
  }

  seekMusician = () => {
    fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${this.state.musicianSeeked}`)
      .then(res => res.json())
      .then(res2 => {
        if(res2.artists !== null) {
          this.setState({musicianFound: [...res2.artists]})
        } else {
          this.setState({musicianFound: [{strArtist: 'not found'}]})
        }
      })
      .then(this.setState({isSearchSubmitted: true}))
      .catch(err => console.log(err))
  }

  getAlbums = (selected) => {
    fetch(`https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${selected}`)
      .then(res => res.json())
      .then(res2 => {
        if(res2.album !== null) {
          this.setState({albums: [...res2.album]})
        } else {
          this.setState({albums: [{strAlbum: 'none', intYearReleased: 'none'}]})
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    let hits = this.state.musicianFound.map(hit => {
      return (
        <div className="col-6">
            <div className="card results-card-artist">
                <h5 className="card-header">
                  <a className="btn btn-warning" onClick={() => this.getAlbums(hit.strArtist)}>{hit.strArtist}</a>
                </h5>
                <div className="card-body" style={{backgroundColor: 'black', color: 'white'}}>
                  <h5 className="card-title">{hit.strGenre}</h5>
                </div>
            </div>
        </div>
      )
    })

    let albums = this.state.albums.map(album => {
      return (
        <div className="col-4">
            <div className="card results-card">
              <div className="card-body">
                <h3 className="card-title">{album.strAlbum}</h3>
                <h5 className="card-title">{album.intYearReleased}</h5>
              </div>
            </div>
        </div>
      )
    })

    return (
      <div className="App">
        <div className="container-fluid info-section">
            <div className="row main-header">
                <div className="col main-header-text">seek music</div>
            </div>
        </div>
        <div className="container">
            <div className="card text-center search">
                <div className="card-body">
                    <h5 className="card-title search-header">seek your musician</h5>
                    <p className="card-text search-text">(then seek another one after, and so on)</p>
                    <input className="form-control" id="search-input" type="text" onChange={(e) => this.setState({musicianSeeked: e.target.value})} placeholder="the coolest musician is..."/><br/>
                    <a href="#" className="btn btn-dark search-btn" onClick={this.seekMusician}>seek now</a>
                </div>
            </div>
        </div>
        {!this.state.isSearchSubmitted ? null : <h1>'{this.state.musicianSeeked}'</h1>}
        <div className="container" id="results">
          <div className="row justify-content-center">
            {hits == [] ? null : hits}
            {albums == [] ? null : albums}
          </div>
        </div>      
      </div>
    )
  }
  
}

export default App;
