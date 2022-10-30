import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YouTubeSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';
import _ from 'lodash';

const API_KEY = "AIzaSyBQPCtPjXvnGDmb3ufRjxK911Fbt0geGlo";

class App extends Component {

    constructor(props){
        super(props);

        this.state = { videos: [], selectedVideo: null, term : 'surfboards' };

        this.videoSearch(this.state.term);
    }

    videoSearch(term) {
        YouTubeSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ videos : videos,
                            selectedVideo : videos[0]});
        });
    }

    render(){

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div> 
                <SearchBar onSearchTermChange = {term => this.videoSearch(term)} /> 
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList onVideoSelect={(selectedVideo) => {
                        this.setState({selectedVideo : selectedVideo.video})
                        }
                    }
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));