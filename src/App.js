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
        <li class="list-group-item eachHit">
          <div className="row justify-content-between">
            <a className="btn eachHit-btn" onClick={() => this.getAlbums(hit.strArtist)}>{hit.strArtist}</a>
            <span className="eachHit-genre">{hit.strGenre}</span>
          </div>
        </li>
      )
    })

    let albums = this.state.albums.map(album => {
      return (
        <li class="list-group-item eachHit">
          <div className="row justify-content-between">
            <span className="eachHit-album">{album.strAlbum}</span>
            <span className="eachHit-genre">{album.intYearReleased}</span>
          </div>
        </li>
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
        <div className="container results">
          <div className="row justify-content-center">
            <div className="col-6">
              <ul class="list-group">
                {hits == [] ? null : hits}
              </ul>
            </div>
            <div className="col-6">{albums == [] ? null : albums}</div>
          </div>
        </div>      
      </div>
    )
  }
  
}

export default App;
